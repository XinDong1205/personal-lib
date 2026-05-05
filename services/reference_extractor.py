"""
Extract references from paper MD content and store normalized signatures.
"""

import re
from database import get_db

# Patterns to detect reference section start
_REF_HEADINGS = re.compile(
    r"(?:^|\n)#{1,4}\s*(?:References?|Bibliography|REFERENCES|参考文献|引用文献)\s*\n"
    r"|(?:^|\n)(?:REFERENCES|References?)\n",
    re.MULTILINE,
)

# Patterns for reference entry separators: [1], 1., (1), etc.
_REF_SEP = re.compile(r"\n\s*(?=\[\d+\]|\d+\.\s|[（(]\d+[)）])")

# Normalize: keep only alphanumeric chars, lowercase
_NORM = re.compile(r"[^a-z0-9一-鿿]", re.IGNORECASE)


def extract_and_save(paper_id: int, content: str) -> int:
    """
    Extract references from paper full-text MD content.
    Returns the number of references extracted.
    """
    ref_texts = _extract_references(content)
    if not ref_texts:
        return 0

    with get_db() as db:
        # Clear existing references for this paper
        db.execute("DELETE FROM paper_references WHERE paper_id = ?", (paper_id,))

        for ref_text in ref_texts:
            norm = _normalize(ref_text)
            if len(norm) < 15:
                continue  # Too short to be a meaningful reference
            db.execute(
                "INSERT OR IGNORE INTO paper_references (paper_id, ref_text, ref_norm) VALUES (?, ?, ?)",
                (paper_id, ref_text[:500], norm),
            )

    return len(ref_texts)


def _extract_references(content: str) -> list[str]:
    """Find the reference section and split into individual entries."""
    m = _REF_HEADINGS.search(content)
    if not m:
        return []

    ref_start = m.end()
    ref_section = content[ref_start:]

    # Cut off at next major heading or appendix
    next_heading = re.search(r"\n#{1,3}\s+[A-Z一-鿿]", ref_section)
    if next_heading:
        ref_section = ref_section[:next_heading.start()]

    ref_section = ref_section.strip()
    if len(ref_section) < 50:
        return []

    # Try to split by reference numbering
    entries = _REF_SEP.split(ref_section)
    # Strip reference number prefix (e.g. "[1]", "1.", "(1)") and filter
    _STRIP_NUM = re.compile(r"^\s*[\[(（]?\d+[\])）]?\.?\s+")
    cleaned = []
    for e in entries:
        e = _STRIP_NUM.sub("", e.strip(), count=1)
        if len(e) > 20:
            cleaned.append(e)
    return cleaned


def _normalize(text: str) -> str:
    """Normalize reference text for comparison: lowercase, strip non-alphanumeric."""
    result = _NORM.sub("", text).lower()
    # Collapse whitespace
    result = re.sub(r"\s+", " ", result).strip()
    return result


def _norm_overlap(norm_a: str, norm_b: str) -> float:
    """
    Compute Jaccard-like similarity between two normalized reference strings.
    Uses character trigrams for robustness against formatting differences.
    """
    def trigrams(s):
        return {s[i:i+3] for i in range(len(s) - 2)}

    ta = trigrams(norm_a)
    tb = trigrams(norm_b)
    if not ta or not tb:
        return 0.0
    intersection = len(ta & tb)
    union = len(ta | tb)
    return intersection / union if union > 0 else 0.0


def compute_graph_edges() -> tuple[list[dict], list[dict], list[dict]]:
    """
    Compute paper nodes and edges based on bibliographic coupling (shared references).
    Returns (nodes, edges, stats) where stats has per-paper ref counts.
    """
    with get_db() as db:
        # Get all references grouped by paper
        rows = db.execute("""
            SELECT pr.paper_id, pr.ref_norm
            FROM paper_references pr
            ORDER BY pr.paper_id
        """).fetchall()

        paper_refs = {}
        for r in rows:
            paper_refs.setdefault(r["paper_id"], set()).add(r["ref_norm"])

        # Get paper info for nodes (including metadata)
        paper_rows = db.execute(
            """SELECT p.id, p.title, pm.title_cn, p.reading_status,
                      pm.year, pm.venue, pm.authors
               FROM papers p
               LEFT JOIN paper_metadata pm ON p.id = pm.paper_id"""
        ).fetchall()

        # Get tags per paper for tooltips / detail panel
        tag_rows = db.execute(
            """SELECT pt.paper_id, t.name
               FROM paper_tags pt JOIN tags t ON pt.tag_id = t.id
               ORDER BY t.name"""
        ).fetchall()
        paper_tags: dict[int, list[str]] = {}
        for tr in tag_rows:
            paper_tags.setdefault(tr["paper_id"], []).append(tr["name"])

        nodes = []
        for pr in paper_rows:
            pid = pr["id"]
            ref_count = len(paper_refs.get(pid, set()))
            nodes.append({
                "id": pid,
                "title": pr["title"],
                "title_cn": pr["title_cn"],
                "reading_status": pr["reading_status"],
                "tag_count": len(paper_tags.get(pid, [])),
                "tags": paper_tags.get(pid, []),
                "ref_count": ref_count,
                "year": pr["year"],
                "venue": pr["venue"],
                "authors": pr["authors"],
            })

        # Compute pairwise Jaccard similarity on reference sets
        edges = []
        paper_ids = sorted(paper_refs.keys())
        for i_idx, i in enumerate(paper_ids):
            refs_i = paper_refs[i]
            for j_idx, j in enumerate(paper_ids):
                if j <= i:
                    continue
                refs_j = paper_refs[j]

                intersection = len(refs_i & refs_j)
                union = len(refs_i | refs_j)
                if union == 0:
                    continue

                jaccard = intersection / union
                if jaccard >= 0.02:  # Minimum similarity threshold
                    edges.append({
                        "source": i,
                        "target": j,
                        "weight": round(jaccard * 100),
                    })

        edges.sort(key=lambda e: e["weight"], reverse=True)

    return nodes, edges


def extract_all():
    """Extract references for all papers that have MD content."""
    with get_db() as db:
        rows = db.execute(
            """SELECT p.id, pc.content
               FROM papers p
               JOIN paper_content pc ON p.id = pc.paper_id"""
        ).fetchall()

    total = 0
    for r in rows:
        count = extract_and_save(r["id"], r["content"])
        total += count
    return total
