"""
Pydantic models for API request/response validation.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ── Paper ─────────────────────────────────────────────────────────────────

class PaperBase(BaseModel):
    reading_status: Optional[str] = None


class PaperUpdate(PaperBase):
    pass


class PaperResponse(BaseModel):
    id: int
    pdf_path: str
    folder_path: str
    folder_name: str
    title: str
    title_cn: Optional[str] = None
    authors: Optional[str] = None
    year: Optional[int] = None
    venue: Optional[str] = None
    has_md: bool = False
    has_chinese: bool = False
    folder_is_chinese: bool = False
    md_path: Optional[str] = None
    chinese_pdf_path: Optional[str] = None
    reading_status: str = 'unread'
    has_paper_analysis: bool = False
    tag_ids: list[int] = []
    tag_names: list[str] = []
    match_source: Optional[str] = None  # "title" | "content" | "both"
    snippet: Optional[str] = None
    similarity: Optional[float] = None  # Jaccard score for related papers
    created_at: str = ''
    updated_at: str = ''


class PaperListResponse(BaseModel):
    papers: list[PaperResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


# ── Paper Content ─────────────────────────────────────────────────────────

class PaperContentResponse(BaseModel):
    paper_id: int
    content: str
    word_count: int
    indexed_at: str


# ── Metadata ──────────────────────────────────────────────────────────────

class PaperMetadataResponse(BaseModel):
    id: Optional[int] = None
    paper_id: int
    title_en: Optional[str] = None
    title_cn: Optional[str] = None
    authors: Optional[str] = None
    institution: Optional[str] = None
    year: Optional[int] = None
    venue: Optional[str] = None
    field: Optional[str] = None
    keywords: Optional[str] = None
    doi: Optional[str] = None
    page_count: Optional[int] = None
    abstract_text: Optional[str] = None
    innovation: Optional[str] = None
    architecture: Optional[str] = None
    strengths: Optional[str] = None
    weaknesses: Optional[str] = None
    future_work: Optional[str] = None


# ── Tags ──────────────────────────────────────────────────────────────────

class TagCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    color: str = Field(default='#5e81ac')


class TagUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None


class TagResponse(BaseModel):
    id: int
    name: str
    color: str
    paper_count: int = 0
    created_at: str = ''


class PaperTagRequest(BaseModel):
    tag_id: int


# ── Notes ─────────────────────────────────────────────────────────────────

class NoteCreate(BaseModel):
    content: str = Field(..., min_length=1)


class NoteUpdate(BaseModel):
    content: str = Field(..., min_length=1)


class NoteResponse(BaseModel):
    id: int
    paper_id: int
    content: str
    note_type: str = 'user'
    created_at: str = ''
    updated_at: str = ''


# ── Scan ──────────────────────────────────────────────────────────────────

class ScanResponse(BaseModel):
    added: int
    updated: int
    removed: int
    total: int


class StatsResponse(BaseModel):
    total_papers: int
    unread: int
    reading: int
    read: int
    chinese_folders: int
    english_folders: int
    with_md: int
    with_chinese: int
    with_analysis: int
    total_tags: int
    total_notes: int


# ── Settings ──────────────────────────────────────────────────────────────

class SettingsUpdate(BaseModel):
    value: str


class SettingsResponse(BaseModel):
    key: str
    value: str


# ── Init ──────────────────────────────────────────────────────────────────

class InitResult(BaseModel):
    filename: str
    folder_name: str
    status: str  # "ok" | "skipped" | "error"
    message: str = ""


class InitResponse(BaseModel):
    processed: int
    results: list[InitResult]


# ── Paper Analysis Files ──────────────────────────────────────────────────

class AnalysisFileResponse(BaseModel):
    filename: str
    content: str


# ── Chat ────────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str = Field(..., pattern='^(user|assistant)$')
    content: str

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: list[ChatMessage] = []

class ChatResponse(BaseModel):
    reply: str


# ── Extended Stats ───────────────────────────────────────────────────────

class ExtendedStatsResponse(BaseModel):
    total_papers: int
    unread: int
    reading: int
    read: int
    with_md: int
    with_chinese: int
    with_analysis: int
    total_tags: int
    total_notes: int
    year_distribution: dict[int, int] = {}
    tag_distribution: list[dict] = []
    venue_distribution: list[dict] = []
    keyword_distribution: list[dict] = []
    recent_papers: list[dict] = []
    year_span: Optional[str] = None  # "2018-2024"
    unknown_year_count: int = 0

# ── Graph ─────────────────────────────────────────────────────────────────

class GraphNode(BaseModel):
    id: int
    title: str
    title_cn: Optional[str] = None
    reading_status: str
    tag_count: int
    tags: list[str] = []
    ref_count: int = 0
    year: Optional[int] = None
    venue: Optional[str] = None
    authors: Optional[str] = None

class GraphLink(BaseModel):
    source: int
    target: int
    weight: int

class GraphResponse(BaseModel):
    nodes: list[GraphNode]
    links: list[GraphLink]

# ── References ──────────────────────────────────────────────────────────────

class ReferenceResponse(BaseModel):
    id: int
    paper_id: int
    ref_text: str

# ── Batch Operations ──────────────────────────────────────────────────────

class BatchStatusRequest(BaseModel):
    paper_ids: list[int]
    reading_status: str = Field(..., pattern='^(unread|reading|read)$')

class BatchTagRequest(BaseModel):
    paper_ids: list[int]
    tag_id: int

class BatchDeleteRequest(BaseModel):
    paper_ids: list[int]


# ── Search ────────────────────────────────────────────────────────────────

class SearchResult(BaseModel):
    paper_id: int
    title: str
    folder_name: str
    snippet: str
    rank: float


class SearchResponse(BaseModel):
    results: list[SearchResult]
    total: int
    page: int
    per_page: int
    query: str
