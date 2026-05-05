# Personal Library / 个人图书馆

<p align="center">
  <strong>🤖 AI 驱动的学术论文管理系统 | AI-Powered Academic Paper Management System</strong>
</p>

---

[中文版](#chinese) | [English Version](#english)

---

<a id="chinese"></a>
## 📖 中文版

### 项目简介

个人图书馆是一个自托管的学术论文管理系统，专为研究者设计，用于收集、整理、阅读、检索、翻译和 AI 分析学术 PDF 论文。它既是一个 Web 应用，也是一个 [Obsidian](https://obsidian.md) 知识库，让你可以在浏览器和 Obsidian 中无缝切换。

**适用领域**：区块链、车联网（VANETs）、网络安全、密码学等计算机科学研究方向。

### 核心特性

- **📚 PDF 库管理** — 递归扫描论文目录，自动索引到 SQLite 数据库，支持批量操作（状态更新、标签管理、论文删除）
- **🔍 全文检索** — 基于 SQLite FTS5 的全文搜索引擎，支持关键词高亮和片段摘要
- **📝 PDF → Markdown** — 使用 PyMuPDF 自动提取 PDF 文本内容并生成 Markdown 文件，可直接在 Obsidian 中阅读和编辑
- **🌐 论文翻译** — 通过 Google Translate 将英文论文逐页翻译为中文，并生成支持 CJK 字体的双语 PDF
- **🤖 AI 论文分析** — 调用 Claude Code 对论文进行结构化深度分析，生成 7 个维度的分析报告：核心目标、技术背景、系统架构、技术深潜、实验评估、优缺点分析、未来工作
- **💬 AI 对话** — 支持与论文进行交互式 AI 对话（终端模式）或通过 API 发送问题（非交互模式）
- **🔗 文献耦合图谱** — 自动提取论文引用，计算 Jaccard 相似度，基于 D3.js 构建论文关联关系可视化图
- **🏷️ 标签系统** — 完整的标签 CRUD，支持颜色标记，多对多论文关联
- **📊 数据看板** — 论文统计仪表盘：阅读状态分布、年份分布、期刊/会议分布、关键词频率、标签分布
- **📖 阅读管理** — 追踪论文阅读状态（未读/阅读中/已读），支持个人笔记
- **🎨 主题切换** — 支持浅色/深色主题，跟随系统或手动切换
- **⌨️ 键盘快捷键** — Vim 风格快捷键导航（g+p、g+t、/、Esc、Space 等）
- **📂 文件打开器** — 一键调用系统默认应用打开 PDF/Markdown 文件

### 技术栈

| 层级 | 技术 |
|------|------|
| **后端框架** | Python 3.12+ / FastAPI / Uvicorn |
| **数据库** | SQLite (WAL 模式) + FTS5 全文索引 |
| **数据校验** | Pydantic v2 |
| **PDF 处理** | PyMuPDF (fitz) — 文本提取、格式转换 |
| **PDF 生成** | ReportLab — 生成翻译后的中文 PDF |
| **机器翻译** | deep-translator (Google Translate 后端) |
| **AI 引擎** | Claude Code + DeepSeek API (Anthropic 兼容接口) |
| **前端** | 原生 JavaScript (ES Modules) + SPA 路由 + D3.js v7 |
| **知识管理** | Obsidian 兼容的 Markdown 知识库 |

### 项目结构

```
personal-lib/
├── web_server.py              # FastAPI 应用入口
├── database.py                # SQLite 数据库 schema 与连接管理
├── models.py                  # Pydantic 请求/响应模型
├── library_core.py            # 核心 PDF 操作（扫描、MD 转换、翻译、重命名）
├── routes/                    # API 路由模块
│   ├── papers.py              # 论文 CRUD 与元数据
│   ├── search.py              # 全文检索
│   ├── tags.py                # 标签管理
│   ├── notes.py               # 笔记管理
│   ├── ai.py                  # AI 分析与对话
│   ├── scan.py                # 库扫描、统计、图谱
│   └── settings.py            # 应用设置
├── services/                  # 业务逻辑层
│   ├── indexer.py             # PDF 扫描与数据库索引
│   ├── metadata_extractor.py  # AI 分析结果元数据提取
│   └── reference_extractor.py # 参考文献提取与耦合图谱
├── static/                    # 前端（原生 JS SPA）
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── app.js             # 入口、路由、键盘快捷键
│       ├── api.js             # REST API 封装
│       ├── state.js           # 响应式状态管理
│       ├── router.js          # Hash SPA 路由
│       └── components/        # 页面组件
├── library/                   # 论文收藏目录（同时也是 Obsidian Vault）
├── scripts/                   # 工具脚本
│   ├── start.py               # 一键启动器
│   ├── setup_api.py           # API Key 配置向导
│   └── academic-paper-analyzer/  # Claude Code 论文分析 Skill
```

### 快速开始

#### 环境要求

- Python 3.12+
- [Claude Code](https://docs.anthropic.com/zh-CN/docs/claude-code/overview) CLI（AI 分析功能需要）
- Windows / macOS / Linux

#### 安装与启动

```bash
# 1. 克隆仓库
git clone <your-repo-url>
cd personal-lib

# 2. 一键启动（自动安装依赖并打开浏览器）
python scripts/start.py

# 或者手动启动
pip install -r requirements.txt
python web_server.py
```

启动后访问 `http://127.0.0.1:8000`。

#### 配置 AI 功能

```bash
# 运行 API 配置向导
python scripts/setup_api.py
```

支持两种 AI 后端：`claude_code`（推荐，功能完整）和 `api`（轻量模式）。

### 使用指南

1. **添加论文** — 将 PDF 放入 `library/` 目录，点击「扫描」按钮自动索引
2. **阅读论文** — 点击论文卡片查看详情，包含 Markdown 全文、AI 分析报告、个人笔记
3. **搜索** — 使用顶部搜索栏或按 `/` 键进行全文检索
4. **AI 分析** — 在论文详情页点击「AI 分析」，Claude Code 将生成结构化深度分析
5. **文献图谱** — 点击「图谱」查看论文间的引用关联关系
6. **Obsidian 集成** — 直接用 Obsidian 打开 `library/` 目录作为 Vault 使用

### 许可证

MIT License

---

<a id="english"></a>
## 📖 English Version

### Overview

Personal Library is a self-hosted academic paper management system designed for researchers to collect, organize, read, search, translate, and AI-analyze academic PDF papers. It doubles as both a web application and an [Obsidian](https://obsidian.md) vault, allowing seamless switching between browser-based reading and Obsidian-powered knowledge management.

**Target domains**: Blockchain, VANETs, network security, cryptography, and other computer science research areas.

### Key Features

- **📚 PDF Library Management** — Recursively scan paper directories, auto-index into SQLite, with batch operations (status updates, tag management, bulk delete)
- **🔍 Full-Text Search** — SQLite FTS5-powered search engine with keyword highlighting and snippet previews
- **📝 PDF → Markdown** — Auto-extract PDF text via PyMuPDF and generate Markdown files, readable and editable in Obsidian
- **🌐 Paper Translation** — Page-by-page English-to-Chinese translation via Google Translate, with bilingual CJK-enabled PDF generation
- **🤖 AI Paper Analysis** — Invokes Claude Code for structured deep analysis, generating 7-dimension reports: core objectives, background, architecture, technical deep-dive, experiments, pros/cons, and future work
- **💬 AI Chat** — Interactive AI discussion about papers (terminal mode) or question-answering via API (non-interactive mode)
- **🔗 Bibliographic Coupling Graph** — Auto-extract citations, compute Jaccard similarity, and visualize paper relationships with D3.js
- **🏷️ Tag System** — Full CRUD with color coding and many-to-many paper-tag associations
- **📊 Dashboard** — Statistics on reading status, publication year, venue, keyword frequency, and tag distribution
- **📖 Reading Tracking** — Track reading status (unread/reading/read) with personal notes
- **🎨 Theme Toggle** — Light/dark theme with system-aware detection and manual override
- **⌨️ Keyboard Shortcuts** — Vim-style navigation (g+p, g+t, /, Esc, Space, arrow keys)
- **📂 File Opener** — Open PDF/Markdown files with OS default application in one click

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.12+ / FastAPI / Uvicorn |
| **Database** | SQLite (WAL mode) + FTS5 full-text index |
| **Validation** | Pydantic v2 |
| **PDF Processing** | PyMuPDF (fitz) — text extraction & format conversion |
| **PDF Generation** | ReportLab — translated Chinese PDF generation |
| **Translation** | deep-translator (Google Translate backend) |
| **AI Engine** | Claude Code + DeepSeek API (Anthropic-compatible endpoint) |
| **Frontend** | Vanilla JavaScript (ES Modules) + SPA router + D3.js v7 |
| **Knowledge Base** | Obsidian-compatible Markdown vault |

### Project Structure

```
personal-lib/
├── web_server.py              # FastAPI application entry point
├── database.py                # SQLite schema & connection management
├── models.py                  # Pydantic request/response models
├── library_core.py            # Core PDF ops (scan, MD conversion, translation, rename)
├── routes/                    # API route modules
│   ├── papers.py              # Paper CRUD & metadata
│   ├── search.py              # Full-text search
│   ├── tags.py                # Tag management
│   ├── notes.py               # Note management
│   ├── ai.py                  # AI analysis & chat
│   ├── scan.py                # Library scan, stats, graph
│   └── settings.py            # App settings
├── services/                  # Business logic layer
│   ├── indexer.py             # PDF scanning & DB indexing
│   ├── metadata_extractor.py  # AI analysis metadata extraction
│   └── reference_extractor.py # Citation extraction & coupling graph
├── static/                    # Frontend (vanilla JS SPA)
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── app.js             # Entry point, routing, keyboard shortcuts
│       ├── api.js             # REST API client
│       ├── state.js           # Reactive state store
│       ├── router.js          # Hash-based SPA router
│       └── components/        # UI components
├── library/                   # Paper collection directory (also an Obsidian vault)
├── scripts/                   # Utilities
│   ├── start.py               # One-click launcher
│   ├── setup_api.py           # API key configuration wizard
│   └── academic-paper-analyzer/  # Claude Code analysis skill
```

### Quick Start

#### Prerequisites

- Python 3.12+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) CLI (required for AI analysis)
- Windows / macOS / Linux

#### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd personal-lib

# 2. One-click start (auto-installs dependencies and opens browser)
python scripts/start.py

# Or start manually
pip install -r requirements.txt
python web_server.py
```

Visit `http://127.0.0.1:8000` after startup.

#### Configure AI Features

```bash
# Run the API configuration wizard
python scripts/setup_api.py
```

Two AI backends are supported: `claude_code` (recommended, full-featured) and `api` (lightweight mode).

### Usage

1. **Add Papers** — Place PDFs in the `library/` directory and click "Scan" to auto-index
2. **Read Papers** — Click a paper card to view details, including full Markdown text, AI analysis reports, and personal notes
3. **Search** — Use the search bar or press `/` for full-text search
4. **AI Analysis** — Click "AI Analysis" on a paper detail page to generate structured deep analysis
5. **Graph View** — Click "Graph" to explore bibliographic coupling relationships between papers
6. **Obsidian Integration** — Open the `library/` directory directly in Obsidian as a vault

### License

MIT License
