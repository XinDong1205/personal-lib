"""
图书馆 - Core functions for PDF management.
Refactored from pdf_to_md.py, pdf_to_chinese.py, and rename_to_chinese.py.
"""

import logging
import os
import re
import time
import fitz  # PyMuPDF
from dataclasses import dataclass

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Windows long-path helper
# ---------------------------------------------------------------------------
def _longpath(path: str) -> str:
    if os.name == "nt" and not path.startswith("\\\\?\\"):
        return "\\\\?\\" + path
    return path


# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------
@dataclass
class PdfDocument:
    path: str
    name: str
    folder: str
    folder_path: str
    has_md: bool = False
    has_chinese: bool = False
    folder_is_chinese: bool = False
    md_path: str = ""
    chinese_pdf_path: str = ""


def _contains_chinese(text: str) -> bool:
    return bool(re.search(r"[一-鿿]", text))


# ---------------------------------------------------------------------------
# Scan
# ---------------------------------------------------------------------------
def scan_pdfs(root_dir: str) -> list[PdfDocument]:
    """Recursively find all PDFs and build PdfDocument list with status info."""
    results = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        for f in filenames:
            if not f.lower().endswith(".pdf"):
                continue
            if f.endswith("_中文.pdf"):
                continue

            pdf_path = os.path.join(dirpath, f)
            folder = os.path.basename(dirpath)
            name = os.path.splitext(f)[0]

            # Status checks
            md_path = os.path.splitext(pdf_path)[0] + ".md"
            has_md = os.path.exists(_longpath(md_path))

            chinese_pdf = os.path.join(dirpath, f"{name}_中文.pdf")
            has_chinese = os.path.exists(_longpath(chinese_pdf))

            folder_cn = _contains_chinese(folder)

            results.append(PdfDocument(
                path=pdf_path,
                name=name,
                folder=folder,
                folder_path=dirpath,
                has_md=has_md,
                has_chinese=has_chinese,
                folder_is_chinese=folder_cn,
                md_path=md_path,
                chinese_pdf_path=chinese_pdf,
            ))

    results.sort(key=lambda d: (d.folder_is_chinese, d.folder, d.name))
    return results


# ---------------------------------------------------------------------------
# Function 1: PDF → Markdown
# ---------------------------------------------------------------------------
def convert_to_markdown(doc: PdfDocument) -> bool:
    """Convert a single PDF to Markdown. Returns True on success."""
    md_path = doc.md_path or os.path.splitext(doc.path)[0] + ".md"

    if os.path.exists(_longpath(md_path)):
        logger.info("跳过（已存在）: %s", md_path)
        return True

    try:
        with fitz.open(_longpath(doc.path)) as pdf_doc:
            parts = []
            for page_num, page in enumerate(pdf_doc, start=1):
                text = page.get_text("text")
                parts.append(f"\n\n# Page {page_num}\n")
                parts.append(text)

        with open(_longpath(md_path), "w", encoding="utf-8") as f:
            f.write("\n".join(parts))

        logger.info("转换完成: %s", md_path)
        return True
    except Exception as e:
        logger.error("转换失败: %s, 原因: %s", doc.path, e)
        return False


# ---------------------------------------------------------------------------
# Function 2: PDF → Chinese PDF (translation)
# ---------------------------------------------------------------------------
# Translation chunk size
CHUNK_SIZE = 4000
API_DELAY = 1.5
MAX_RETRIES = 3

# Will be lazy-imported when needed
_translator = None


def _get_translator():
    global _translator
    if _translator is None:
        from deep_translator import GoogleTranslator
        _translator = GoogleTranslator(source="auto", target="zh-CN")
    return _translator


def _translate_text(text: str) -> str:
    translator = _get_translator()
    for attempt in range(MAX_RETRIES):
        try:
            result = translator.translate(text)
            if result:
                return result
        except Exception as e:
            logger.warning("  重试 %d/%d: %s", attempt + 1, MAX_RETRIES, e)
            time.sleep(2 ** attempt)
    logger.error("  [ERROR] 翻译失败，保留原文")
    return text


def _split_paragraphs(text: str) -> list[str]:
    return [p.strip() for p in text.split("\n\n") if p.strip()]


def _chunk_text(text: str, max_chars: int) -> list[str]:
    if len(text) <= max_chars:
        return [text]
    chunks = []
    sentences = text.replace("\n", " ").split(". ")
    current = ""
    for sent in sentences:
        candidate = current + (". " if current else "") + sent
        if len(candidate) > max_chars and current:
            chunks.append(current.strip())
            current = sent
        else:
            current = candidate
    if current.strip():
        chunks.append(current.strip())
    return chunks


def _register_cjk_font(font_path: str) -> bool:
    if not os.path.exists(font_path):
        return False
    try:
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        pdfmetrics.registerFont(TTFont("NotoSansCJK", font_path))
        return True
    except Exception:
        return False


def _find_font() -> str:
    """Search for the CJK font in common locations."""
    candidates = [
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "NotoSansCJKsc-Regular.otf"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "NotoSansCJKsc-Regular.ttf"),
        # PyInstaller bundle path
        os.path.join(getattr(os, "_MEIPASS", ""), "NotoSansCJKsc-Regular.otf"),
    ]
    for c in candidates:
        if c and os.path.exists(c):
            return c
    return candidates[0]


def translate_to_chinese(
    doc: PdfDocument,
    font_path: str | None = None,
) -> bool:
    """Translate a PDF to Chinese and generate a new PDF. Returns True on success."""
    if doc.has_chinese:
        logger.info("跳过（中文版已存在）: %s", doc.chinese_pdf_path)
        return True

    base = doc.name
    out_dir = doc.folder_path
    out_pdf = os.path.join(out_dir, f"{base}_中文.pdf")

    # Resolve font
    font = font_path or _find_font()
    logger.debug("字体路径: %s", font)
    font_ok = _register_cjk_font(font)
    if not font_ok:
        logger.warning("[WARN] 未找到中文字体，中文 PDF 将缺字")

    # Extract text
    logger.info("提取文本: %s", doc.path)
    pages = []
    with fitz.open(_longpath(doc.path)) as pdf_doc:
        for i, page in enumerate(pdf_doc):
            text = page.get_text("text")
            if text.strip():
                pages.append((i + 1, text.strip()))

    if not pages:
        logger.warning("[WARN] PDF 无可提取文本，可能是扫描件")
        return False

    total_pages = len(pages)
    logger.info("找到 %d 页文本，开始翻译...", total_pages)

    # Translate
    translated_pages = []
    for idx, (page_num, page_text) in enumerate(pages):
        paras = _split_paragraphs(page_text)
        translated_paras = []
        logger.debug("  第 %d 页 (%d 段)...", page_num, len(paras))

        for para in paras:
            if len(para) <= CHUNK_SIZE:
                translated = _translate_text(para)
                translated_paras.append(translated)
                time.sleep(0.3)
            else:
                sub_chunks = _chunk_text(para, CHUNK_SIZE)
                big_result = ""
                for sub in sub_chunks:
                    t = _translate_text(sub)
                    big_result += t
                    time.sleep(0.3)
                translated_paras.append(big_result)

        translated_pages.append((page_num, translated_paras))
        time.sleep(API_DELAY)

    # Build output PDF
    logger.info("生成中文 PDF...")
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

    doc_template = SimpleDocTemplate(
        out_pdf,
        pagesize=A4,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
    )

    styles = getSampleStyleSheet()
    if font_ok:
        body_style = ParagraphStyle(
            "ChineseBody", parent=styles["Normal"],
            fontName="NotoSansCJK", fontSize=11, leading=18, spaceAfter=6,
        )
        title_style = ParagraphStyle(
            "ChineseTitle", parent=styles["Title"],
            fontName="NotoSansCJK", fontSize=16, leading=24,
        )
    else:
        body_style = styles["Normal"]
        title_style = styles["Title"]

    story = [Paragraph(f"{base}（中文翻译）", title_style), Spacer(1, 0.3 * inch)]

    for page_num, paras in translated_pages:
        story.append(Paragraph(f"--- 第 {page_num} 页 ---", body_style))
        story.append(Spacer(1, 0.1 * inch))
        for para in paras:
            safe = para.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            story.append(Paragraph(safe, body_style))
            story.append(Spacer(1, 0.05 * inch))
        story.append(PageBreak())

    try:
        doc_template.build(story)
    except Exception as e:
        logger.error("PDF 生成失败: %s", e)
        return False

    logger.info("完成: %s", out_pdf)
    return True


# ---------------------------------------------------------------------------
# Function 3: Rename to Chinese
# ---------------------------------------------------------------------------
RENAME_MAP = {
    "Blockchain-Assisted_Message_Reporting_Scheme_With_Weighted_Threshold_Signature_for_Vehicular_Ad-Hoc_Networks":
        "基于区块链的车载自组网加权门限签名消息报告方案",
    "Blockchain-Based_Traffic_Accident_Handling_Protocol_Without_Third_Party_for_VANETs":
        "基于区块链的无第三方VANET交通事故处理协议",
    "A_Blockchain_Sharding-Based_Data_Sharing_Scheme_for_Internet_of_Vehicles":
        "基于区块链分片的车联网数据共享方案",
    "Blockchain-Assisted_Revocable_Cross-Domain_Authentication_for_Vehicular_Ad-Hoc_Networks":
        "区块链辅助的车载自组网可撤销跨域认证方案",
    "BAST_Blockchain-Assisted_Secure_and_Traceable_Data_Sharing_Scheme_for_Vehicular_Networks":
        "BAST-区块链辅助的车载网络安全可追溯数据共享方案",
    "A_Blockchain-Driven_Hierarchical_Authentication_and_Key_Agreement_Scheme_for_VANETs_With_Cloud-Edge_Collaboration":
        "区块链驱动的云边协同VANET分层认证与密钥协商方案",
    "The governance technology for blockchain systems a survey":
        "区块链系统治理技术综述",
    "Blockchain-Assisted_Flexible_Revocable_Anonymous_Authentication_in_Industrial_Internet_of_Things":
        "区块链辅助的工业物联网灵活可撤销匿名认证方案",
    "Blockchain-Based_Traffic_Accident_Handling_Protocol_Without_Third_Party_for_VANETs (1)":
        "基于区块链的无第三方VANET交通事故处理协议 (1)",
    "Blockchain-Based_Lightweight_Message_Authentication_for_Edge-Assisted_Cross-Domain_Industrial_Internet_of_Things":
        "基于区块链的边缘辅助跨域工业物联网轻量级消息认证",
    "Libras_A_Fair_Secure_Verifiable_and_Scalable_Outsourcing_Computation_Scheme_Based_on_Blockchain":
        "Libras-基于区块链的公平安全可验证可扩展外包计算方案",
    "BAP_A_Blockchain-Assisted_Privacy-Preserving_Authentication_Protocol_With_User-Controlled_Data_Linkability_for_VANETs":
        "BAP-区块链辅助的VANET用户可控数据可链接隐私保护认证协议",
    "DBCPA_Dual_Blockchain-Assisted_Conditional_Privacy-Preserving_Authentication_Framework_and_Protocol_for_Vehicular_Ad_Hoc_Networks":
        "DBCPA-双区块链辅助的车载自组网条件隐私保护认证框架与协议",
    "A_Threshold-Based_Full-Decentralized_Authentication_and_Key_Agreement_Scheme_for_VANETs_Powered_by_Consortium_Blockchain":
        "基于门限的联盟区块链驱动VANET全去中心化认证与密钥协商方案",
    "ATRC_An_Anonymous_Traceable_and_Revocable_Credential_System_Using_Blockchain_for_VANETs":
        "ATRC-基于区块链的VANET匿名可追溯可撤销凭证系统",
    "LPDB_Lightweight_Policy-Driven_Blockchain_With_Batch_Verification_for_Rail_Transit_Systems":
        "LPDB-面向轨道交通系统的轻量级策略驱动区块链批量验证方案",
    "EBCPA_Efficient_Blockchain-Based_Conditional_Privacy-Preserving_Authentication_for_VANETs":
        "EBCPA-基于区块链的高效VANET条件隐私保护认证方案",
    "Blockchain-Assisted_Privacy-Preserving_Traffic_Route_Management_Scheme_for_Fog-Based_Vehicular_Ad-Hoc_Networks":
        "区块链辅助的雾基车载自组网隐私保护交通路由管理方案",
    "An_Efficient_Blockchain-Based_Conditional_Privacy-Preserving_Authentication_Protocol_for_VANETs":
        "基于区块链的高效VANET条件隐私保护认证协议",
    "Provable_Secure_and_Lightweight_Blockchain-Based_V2I_Handover_Authentication_and_V2V_Broadcast_Protocol_for_VANETs":
        "可证明安全的轻量级区块链VANET-V2I切换认证与V2V广播协议",
    "BCPPA_A_Blockchain-Based_Conditional_Privacy-Preserving_Authentication_Protocol_for_Vehicular_Ad_Hoc_Networks":
        "BCPPA-基于区块链的车载自组网条件隐私保护认证协议",
}


def _rename_with_retry(src: str, dst: str, max_retries: int = 5) -> None:
    for attempt in range(1, max_retries + 1):
        try:
            os.rename(src, dst)
            return
        except PermissionError:
            if attempt < max_retries:
                wait = 1.0 * attempt
                logger.warning("  重试 %d/%d, 等待 %.0fs...", attempt, max_retries, wait)
                time.sleep(wait)
            else:
                raise


def rename_to_chinese(
    doc: PdfDocument,
    rename_map: dict | None = None,
) -> bool:
    """Rename an English-named folder and its files to Chinese. Returns True on success."""
    if rename_map is None:
        rename_map = RENAME_MAP

    if doc.folder_is_chinese:
        logger.info("跳过（已是中文）: %s", doc.folder)
        return True

    en_name = doc.folder
    cn_name = rename_map.get(en_name)
    if not cn_name:
        logger.info("跳过（无映射）: %s", en_name)
        return False

    src_dir = doc.folder_path
    dst_dir = os.path.join(os.path.dirname(src_dir), cn_name)

    if os.path.exists(dst_dir):
        logger.info("跳过（目标已存在）: %s", cn_name)
        return False

    # Rename files first
    pdf_src = os.path.join(src_dir, f"{en_name}.pdf")
    pdf_dst = os.path.join(src_dir, f"{cn_name}.pdf")
    md_src = os.path.join(src_dir, f"{en_name}.md")
    md_dst = os.path.join(src_dir, f"{cn_name}.md")

    try:
        if os.path.isfile(pdf_src):
            _rename_with_retry(pdf_src, pdf_dst)
            logger.info("  [pdf] -> %s.pdf", cn_name)
        if os.path.isfile(md_src):
            _rename_with_retry(md_src, md_dst)
            logger.info("  [md]  -> %s.md", cn_name)
        _rename_with_retry(src_dir, dst_dir)
        logger.info("文件夹已重命名: %s -> %s", en_name, cn_name)
        return True
    except Exception as e:
        logger.error("重命名失败: %s", e)
        return False
