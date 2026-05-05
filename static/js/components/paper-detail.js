/**
 * Paper detail panel — slide-in overlay with 4 tabs.
 * Integrates metadata, MD content viewer, notes, and AI summary.
 */

import { api } from "../api.js";
import { router } from "../router.js";
import { store } from "../state.js";
import { escapeHtml, formatDate, showToast, cleanSubtitle } from "../utils.js";

export class PaperDetail {
  constructor() {
    this.overlay = document.getElementById("detail-overlay");
    this.paper = null;
    this._chatHistory = [];
    this._bindOverlayClick();
  }

  async open(paperId, initialTab) {
    this.initialTab = initialTab || null;
    this.overlay.classList.remove("hidden");
    this.overlay.innerHTML = _detailSkeleton();
    requestAnimationFrame(() => this.overlay.classList.add("open"));

    try {
      this.paper = await api.papers.get(paperId);
      this._render();
    } catch (e) {
      this.overlay.innerHTML = `<div class="empty-state"><h3>加载失败</h3><p>${e.message}</p></div>`;
    }
  }

  close() {
    this.overlay.classList.remove("open");
    setTimeout(() => this.overlay.classList.add("hidden"), 250);
    router.navigate("#/papers");
  }

  _bindOverlayClick() {
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });
  }

  _render() {
    const p = this.paper;
    this.overlay.innerHTML = `
      <div class="detail-header">
        <div>
          <h2>${escapeHtml(p.title)}</h2>
          ${(p.title_cn && p.title_cn !== p.title) ? `<div style="font-size:0.9rem;color:var(--accent);margin-top:2px;">${escapeHtml(cleanSubtitle(p.title, p.title_cn))}</div>` : ''}
          <div style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;">${escapeHtml(p.folder_name)}</div>
        </div>
        <button class="detail-close" id="detail-close-btn">&times;</button>
      </div>
      <div class="detail-tabs">
        <div class="detail-tab active" data-tab="metadata">元数据</div>
        <div class="detail-tab" data-tab="ai">AI分析</div>
        <div class="detail-tab" data-tab="notes">笔记</div>
        <div class="detail-tab" data-tab="chat">对话</div>
      </div>
      <div class="detail-body" id="detail-body"></div>
    `;

    document.getElementById("detail-close-btn").addEventListener("click", () => this.close());

    this.overlay.querySelectorAll(".detail-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.overlay.querySelectorAll(".detail-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this._loadTab(tab.dataset.tab);
      });
    });

    const startTab = this.initialTab || "metadata";
    this.overlay.querySelectorAll(".detail-tab").forEach(t => t.classList.remove("active"));
    const activeTab = this.overlay.querySelector(`.detail-tab[data-tab="${startTab}"]`);
    if (activeTab) {
      activeTab.classList.add("active");
      this._loadTab(startTab);
    } else {
      this._loadTab("metadata");
    }
    this.initialTab = null;
  }

  async _loadTab(tabName) {
    clearInterval(this._placeholderTimer);
    const body = document.getElementById("detail-body");
    body.innerHTML = _tabSkeleton();

    switch (tabName) {
      case "metadata": await this._renderMetadata(body); break;
      case "notes":    await this._renderNotes(body); break;
      case "ai":       await this._renderAI(body); break;
      case "chat":     await this._renderChat(body); break;
    }
  }

  // ── Metadata Tab ─────────────────────────────────────────────────────
  async _renderMetadata(body) {
    const p = this.paper;
    let meta = null;
    try { meta = await api.papers.metadata(p.id); } catch (e) { /* no metadata */ }

    const hasBasicInfo = meta && (meta.title_cn || meta.title_en || meta.authors || meta.year || meta.venue || meta.keywords || meta.doi);
    const hasContent = meta && (meta.abstract_text || meta.innovation || meta.architecture || meta.strengths || meta.weaknesses || meta.future_work);

    let html = "";

    // ── Section: Basic Info Card ──────────────────────────────────────
    if (hasBasicInfo) {
      html += `
        <div class="meta-section-header">📊 基本信息</div>
        <table class="meta-table">
          ${meta.title_cn ? `<tr><td>标题</td><td><strong>${escapeHtml(meta.title_cn)}</strong></td></tr>` : ''}
          ${meta.title_en ? `<tr><td>英文</td><td>${escapeHtml(meta.title_en)}</td></tr>` : ''}
          ${meta.authors ? `<tr><td>作者</td><td>${escapeHtml(meta.authors)}</td></tr>` : ''}
          ${meta.institution ? `<tr><td>机构</td><td>${escapeHtml(meta.institution)}</td></tr>` : ''}
          ${meta.year ? `<tr><td>年份</td><td>${escapeHtml(String(meta.year))}</td></tr>` : ''}
          ${meta.venue ? `<tr><td>期刊/会议</td><td>${escapeHtml(meta.venue)}</td></tr>` : ''}
          ${meta.field ? `<tr><td>领域</td><td>${escapeHtml(meta.field)}</td></tr>` : ''}
          ${meta.keywords ? `<tr><td>关键词</td><td>${escapeHtml(meta.keywords)}</td></tr>` : ''}
          ${meta.doi ? `<tr><td>DOI</td><td><a href="https://doi.org/${escapeHtml(meta.doi)}" target="_blank" class="meta-doi-link">${escapeHtml(meta.doi)}</a></td></tr>` : ''}
          ${meta.page_count ? `<tr><td>页数</td><td>${meta.page_count}</td></tr>` : ''}
        </table>
      `;
    }

    // ── Section: Status & Tags ────────────────────────────────────────
    const tags = store.get("tags") || [];
    const paperTags = p.tag_names || [];
    html += `
      <div class="meta-section-header">🏷️ 标签 & 状态</div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
        <select id="status-select" class="filter-chip" style="min-width:90px;">
          <option value="unread" ${p.reading_status === 'unread' ? 'selected' : ''}>🔵 未读</option>
          <option value="reading" ${p.reading_status === 'reading' ? 'selected' : ''}>🟠 阅读中</option>
          <option value="read" ${p.reading_status === 'read' ? 'selected' : ''}>🟢 已读</option>
        </select>
        <div class="tag-editor" id="tag-editor" style="margin-top:0;">
          ${paperTags.map(t => `<span class="tag-chip accent">${escapeHtml(t)} <span class="remove" data-tag="${escapeHtml(t)}">&times;</span></span>`).join("")}
          <select class="add-tag-select" id="add-tag-select">
            <option value="">+ 添加标签</option>
            ${tags.filter(t => !paperTags.includes(t.name)).map(t => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join("")}
          </select>
        </div>
      </div>
    `;

    // ── Section: Content (Markdown rendered, collapsible) ─────────────
    const contentFields = [
      ["abstract_text", "🎯 核心目标"],
      ["innovation", "💡 主要创新"],
      ["architecture", "🏗️ 系统架构"],
      ["strengths", "✅ 优点"],
      ["weaknesses", "⚠️ 缺点"],
      ["future_work", "🔮 未来方向"],
    ];
    if (hasContent) {
      html += `<div class="meta-section-header">📝 内容摘要</div>`;
      contentFields.forEach(([field, label], i) => {
        if (meta[field]) {
          html += `
            <details class="meta-content-details" ${i === 0 ? 'open' : ''}>
              <summary class="meta-content-summary">${label}</summary>
              <div class="md-content" style="padding:8px 0 8px 8px;">${renderMarkdown(meta[field])}</div>
            </details>
          `;
        }
      });
    }

    // ── Section: Empty state ──────────────────────────────────────────
    if (!hasBasicInfo && !hasContent) {
      html += `
        <div class="empty-state" style="padding:32px 16px;">
          <div class="empty-icon">📋</div>
          <h3>暂无元数据</h3>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:12px;">${p.has_paper_analysis ? 'paper-analysis 目录存在，但缺少 00-论文信息.md' : '该论文还没有 paper-analysis 目录'}</p>
          ${!p.has_paper_analysis ? '<button class="btn btn-primary btn-sm" id="btn-goto-ai">🤖 前往 AI 分析 Tab 生成</button>' : ''}
        </div>
      `;
    }

    // ── Section: Actions ──────────────────────────────────────────────
    html += `
      <div class="meta-section-header" style="margin-top:20px;">📂 操作</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" id="btn-open-pdf">📄 打开 PDF</button>
        ${p.has_chinese ? '<button class="btn btn-ghost btn-sm" id="btn-open-cn">🇨🇳 中文版</button>' : ''}
        <button class="btn btn-ghost btn-sm" id="btn-open-folder">📁 打开文件夹</button>
      </div>
      <div id="paper-references-section" style="margin-top:16px;">
        <div style="padding:8px;text-align:center;">${['wide','med','short'].map(w => `<div class="skeleton-line ${w}" style="margin:4px auto;"></div>`).join("")}</div>
      </div>
      <div id="related-papers-section" style="margin-top:16px;">
        <div style="padding:8px;text-align:center;">${['wide','med','short'].map(w => `<div class="skeleton-line ${w}" style="margin:4px auto;"></div>`).join("")}</div>
      </div>
    `;

    body.innerHTML = html;

    // Load references and related papers asynchronously
    this._loadReferences(p.id);
    this._loadRelated(p.id);

    // Status change
    document.getElementById("status-select").addEventListener("change", async (e) => {
      try {
        await api.papers.update(p.id, { reading_status: e.target.value });
        this.paper.reading_status = e.target.value;
        showToast("状态已更新", "success");
      } catch (err) { showToast(err.message, "error"); }
    });

    // "Go to AI tab" button in empty state
    document.getElementById("btn-goto-ai")?.addEventListener("click", () => {
      this.overlay.querySelectorAll(".detail-tab").forEach(t => t.classList.remove("active"));
      this.overlay.querySelector('.detail-tab[data-tab="ai"]')?.classList.add("active");
      this._loadTab("ai");
    });

    // Tag management
    this._bindTagEditor(p);

    // File open actions
    document.getElementById("btn-open-pdf")?.addEventListener("click", () => this._openFile(p.pdf_path));
    document.getElementById("btn-open-cn")?.addEventListener("click", () => this._openFile(p.chinese_pdf_path));
    document.getElementById("btn-open-folder")?.addEventListener("click", () => this._openFile(p.folder_path));
  }

  _bindTagEditor(paper) {
    document.getElementById("tag-editor")?.addEventListener("click", async (e) => {
      if (e.target.classList.contains("remove")) {
        const tagName = e.target.dataset.tag;
        const tags = store.get("tags");
        const tag = tags.find(t => t.name === tagName);
        if (!tag) return;
        try {
          await api.tags.removeFromPaper(paper.id, tag.id);
          // Local update: remove tag from paper
          paper.tag_names = paper.tag_names.filter(t => t !== tagName);
          paper.tag_ids = paper.tag_ids.filter(id => id !== tag.id);
          // Re-render just the tag chips
          this._refreshTagEditor(paper);
          showToast(`已移除标签: ${tagName}`, "info");
        } catch (err) { showToast(err.message, "error"); }
      }
    });

    document.getElementById("add-tag-select")?.addEventListener("change", async (e) => {
      const tagId = parseInt(e.target.value);
      if (!tagId) return;
      const tags = store.get("tags");
      const tag = tags.find(t => t.id === tagId);
      if (!tag) return;
      try {
        await api.tags.addToPaper(paper.id, tagId);
        // Local update: add tag to paper
        if (!paper.tag_ids.includes(tagId)) paper.tag_ids.push(tagId);
        if (!paper.tag_names.includes(tag.name)) paper.tag_names.push(tag.name);
        // Re-render just the tag chips
        this._refreshTagEditor(paper);
        showToast(`标签已添加: ${tag.name}`, "success");
      } catch (err) { showToast(err.message, "error"); }
    });
  }

  _refreshTagEditor(paper) {
    const container = document.getElementById("tag-editor");
    if (!container) return;
    const tags = store.get("tags") || [];
    const paperTags = paper.tag_names || [];

    container.innerHTML = paperTags.map(t =>
      `<span class="tag-chip accent">${t} <span class="remove" data-tag="${t}">&times;</span></span>`
    ).join("") + `
      <select class="add-tag-select" id="add-tag-select">
        <option value="">+ 添加标签</option>
        ${tags.filter(t => !paperTags.includes(t.name)).map(t => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join("")}
      </select>
    `;
    // Re-bind the change event
    document.getElementById("add-tag-select")?.addEventListener("change", async (e) => {
      const tagId = parseInt(e.target.value);
      if (!tagId) return;
      const tag = tags.find(t => t.id === tagId);
      if (!tag) return;
      try {
        await api.tags.addToPaper(paper.id, tagId);
        if (!paper.tag_ids.includes(tagId)) paper.tag_ids.push(tagId);
        if (!paper.tag_names.includes(tag.name)) paper.tag_names.push(tag.name);
        this._refreshTagEditor(paper);
        showToast(`标签已添加: ${tag.name}`, "success");
      } catch (err) { showToast(err.message, "error"); }
    });
  }

  async _loadReferences(paperId) {
    try {
      const refs = await api.papers.references(paperId);
      const section = document.getElementById("paper-references-section");
      if (!section) return;
      if (refs.length === 0) {
        section.innerHTML = '<div style="font-size:0.82rem;color:var(--text-muted);">未提取到参考文献</div>';
        return;
      }
      const displayRefs = refs.slice(0, 15);
      const hasMore = refs.length > 15;
      section.innerHTML = `
        <h4 style="font-size:0.85rem;color:var(--text-dim);margin:12px 0 8px;">📚 参考文献 (${refs.length} 条)</h4>
        <div class="ref-list" style="max-height:360px;overflow-y:auto;font-size:0.78rem;color:var(--text-dim);line-height:1.55;">
          ${displayRefs.map((r, i) => `
            <div class="ref-item" style="padding:5px 0;border-bottom:1px solid var(--border);">
              <span style="color:var(--text-muted);font-weight:600;margin-right:6px;">[${i + 1}]</span>
              ${escapeHtml(r.ref_text.length > 300 ? r.ref_text.slice(0, 300) + '…' : r.ref_text)}
            </div>
          `).join("")}
          ${hasMore ? `<div style="padding:8px;text-align:center;color:var(--text-muted);font-size:0.75rem;">… 还有 ${refs.length - 15} 条参考文献未显示</div>` : ''}
        </div>
      `;
    } catch (e) {
      // silently fail — references are non-critical
    }
  }

  async _loadRelated(paperId) {
    try {
      const related = await api.papers.related(paperId);
      const section = document.getElementById("related-papers-section");
      if (!section) return;
      if (related.length === 0) {
        section.innerHTML = '<div style="font-size:0.82rem;color:var(--text-muted);">暂无相关论文</div>';
        return;
      }
      section.innerHTML = `
        <h4 style="font-size:0.85rem;color:var(--text-dim);margin:12px 0 8px;">🔗 相关论文</h4>
        ${related.map(r => `
          <div class="related-paper-item" data-paper-id="${r.id}" style="
            padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius);
            margin-bottom:6px;cursor:pointer;transition:all 0.2s;
          " onmouseenter="this.style.borderColor='var(--accent)';this.style.background='var(--bg-hover)'" onmouseleave="this.style.borderColor='var(--border)';this.style.background=''">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
              <div style="flex:1;min-width:0;">
                <div style="font-size:0.85rem;font-weight:500;line-height:1.3;">${escapeHtml(r.title)}</div>
                ${r.title_cn ? `<div style="font-size:0.78rem;color:var(--accent);margin-top:2px;">${escapeHtml(r.title_cn)}</div>` : ''}
                <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;display:flex;gap:10px;flex-wrap:wrap;">
                  ${r.year ? `<span>📅 ${r.year}</span>` : ''}
                  ${r.venue ? `<span>📰 ${escapeHtml(r.venue.length > 35 ? r.venue.slice(0,35)+'…' : r.venue)}</span>` : ''}
                </div>
                <div style="font-size:0.72rem;color:var(--text-dim);margin-top:4px;">
                  ${(r.tag_names || []).map(t => `<span class="tag-chip accent" style="font-size:0.66rem;">${escapeHtml(t)}</span>`).join(" ")}
                </div>
              </div>
              ${r.similarity ? `
                <div style="flex-shrink:0;text-align:center;min-width:42px;">
                  <div style="font-size:1.1rem;font-weight:700;color:var(--accent);">${Math.round(r.similarity * 100)}%</div>
                  <div style="font-size:0.6rem;color:var(--text-muted);">相似度</div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join("")}
      `;
      section.querySelectorAll(".related-paper-item").forEach(item => {
        item.addEventListener("click", () => {
          const id = parseInt(item.dataset.paperId);
          this.open(id);
        });
      });
    } catch (e) {
      // silently fail — related papers are non-critical
    }
  }

  async _openFile(path) {
    try {
      await fetch(`/api/v1/papers/open-file`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
    } catch (e) {
      showToast("无法打开文件", "error");
    }
  }

  // ── Chat Tab ──────────────────────────────────────────────────────
  async _renderChat(body) {
    const p = this.paper;

    // Restore persisted history for this paper
    this._chatHistory = this._loadChatHistory(p.id);

    const suggestions = [
      "这篇论文的核心创新是什么？",
      "论文提出的方案有哪些优缺点？",
      "论文中的系统架构是怎样的？",
      "这篇论文与其他相关工作有什么区别？",
    ];

    const placeholders = [
      "输入你的问题...（Enter 发送，Shift+Enter 换行）",
      "试着问：这篇论文用了什么技术方案？",
      "试着问：论文的安全性假设是什么？",
      "试着问：实验部分有哪些不足？",
      "试着问：论文中数学公式的含义是什么？",
    ];

    body.innerHTML = `
      <div class="chat-container">
        <div class="chat-top-bar" id="chat-top-bar" ${this._chatHistory.length ? '' : 'style="display:none"'}>
          <span id="chat-msg-count">${this._chatHistory.length} 条消息</span>
          <button class="chat-clear-btn" id="btn-chat-clear" title="清空对话">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>
            清空
          </button>
        </div>
        <div class="chat-messages" id="chat-messages">
          ${this._chatHistory.length === 0 ? `
            <div class="chat-welcome">
              <div class="chat-welcome-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="var(--accent)" stroke-width="1.5" opacity="0.3"/>
                  <circle cx="24" cy="24" r="16" stroke="var(--accent)" stroke-width="1" opacity="0.2"/>
                  <circle cx="24" cy="24" r="10" fill="var(--accent)" opacity="0.12"/>
                  <text x="24" y="29" text-anchor="middle" font-size="16" fill="var(--accent)">C</text>
                </svg>
              </div>
              <h3>与论文对话</h3>
              <p>基于论文全文内容，向 Claude 提问任何问题</p>
            </div>
          ` : ''}
        </div>
        ${this._chatHistory.length === 0 ? `
          <div class="chat-suggestions" id="chat-suggestions">
            ${suggestions.map((s, i) => `
              <button class="chat-suggestion-chip" data-question="${escapeHtml(s)}" style="animation-delay:${0.05 * i}s">
                ${escapeHtml(s)}
              </button>
            `).join("")}
          </div>
        ` : ''}
        <div class="chat-input-area">
          <textarea
            id="chat-input"
            class="chat-textarea"
            placeholder="${placeholders[0]}"
            rows="1"
          ></textarea>
          <button class="btn btn-primary chat-send-btn" id="btn-chat-send" title="发送 (Enter)">
            <span class="chat-send-icon">&#10148;</span>
          </button>
        </div>
        <div class="chat-terminal-link">
          <span class="chat-terminal-hint">偏好使用终端？</span>
          <a href="#" id="btn-terminal-chat" class="chat-terminal-action">点击在终端中打开 Claude Code</a>
        </div>
      </div>
    `;

    // Restore rendered bubbles from history
    if (this._chatHistory.length > 0) {
      const messages = document.getElementById("chat-messages");
      this._chatHistory.forEach(msg => {
        this._addChatBubble(msg.role, msg.content, msg.time);
      });
    }

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("btn-chat-send");

    sendBtn?.addEventListener("click", () => this._sendChatMessage(p));

    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this._sendChatMessage(p);
      }
    });

    input?.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 120) + "px";
    });

    body.querySelectorAll(".chat-suggestion-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const q = chip.dataset.question;
        if (input && q) {
          input.value = q;
          this._sendChatMessage(p);
        }
      });
    });

    // Placeholder rotation
    this._startPlaceholderRotation(input, placeholders);

    // Clear conversation button
    document.getElementById("btn-chat-clear")?.addEventListener("click", () => {
      this._clearChat(p.id);
      const messages = document.getElementById("chat-messages");
      if (messages) {
        messages.innerHTML = `
          <div class="chat-welcome">
            <div class="chat-welcome-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="var(--accent)" stroke-width="1.5" opacity="0.3"/>
                <circle cx="24" cy="24" r="16" stroke="var(--accent)" stroke-width="1" opacity="0.2"/>
                <circle cx="24" cy="24" r="10" fill="var(--accent)" opacity="0.12"/>
                <text x="24" y="29" text-anchor="middle" font-size="16" fill="var(--accent)">C</text>
              </svg>
            </div>
            <h3>与论文对话</h3>
            <p>对话已清空，开始新的讨论吧</p>
          </div>
        `;
      }
      const topBar = document.getElementById("chat-top-bar");
      if (topBar) topBar.style.display = "none";
      // Re-show suggestions
      const oldSuggestions = document.getElementById("chat-suggestions");
      if (!oldSuggestions) {
        const newSuggestions = document.createElement("div");
        newSuggestions.className = "chat-suggestions";
        newSuggestions.id = "chat-suggestions";
        newSuggestions.innerHTML = suggestions.map((s, i) => `
          <button class="chat-suggestion-chip" data-question="${escapeHtml(s)}" style="animation-delay:${0.05 * i}s">
            ${escapeHtml(s)}
          </button>
        `).join("");
        const container = document.querySelector(".chat-container");
        const inputArea = document.querySelector(".chat-input-area");
        if (container && inputArea) {
          container.insertBefore(newSuggestions, inputArea);
          newSuggestions.querySelectorAll(".chat-suggestion-chip").forEach(chip => {
            chip.addEventListener("click", () => {
              const q = chip.dataset.question;
              if (input && q) {
                input.value = q;
                this._sendChatMessage(p);
              }
            });
          });
        }
      }
      showToast("对话已清空", "info");
    });

    // Terminal launch
    document.getElementById("btn-terminal-chat")?.addEventListener("click", async (e) => {
      e.preventDefault();
      const link = document.getElementById("btn-terminal-chat");
      link.textContent = "正在启动终端...";
      try {
        await api.ai.chat(p.id);
        showToast("Claude Code 终端已在新窗口中打开", "success");
        link.textContent = "重新在终端中打开";
      } catch (err) {
        showToast(err.message, "error");
        link.textContent = "点击在终端中打开 Claude Code";
      }
    });
  }

  _startPlaceholderRotation(input, placeholders) {
    if (!input) return;
    let idx = 0;
    this._placeholderTimer = setInterval(() => {
      idx = (idx + 1) % placeholders.length;
      input.placeholder = placeholders[idx];
    }, 4000);
  }

  async _sendChatMessage(paper) {
    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("btn-chat-send");
    const question = input.value.trim();
    if (!question) return;

    input.value = "";
    input.style.height = "auto";
    input.disabled = true;
    sendBtn.disabled = true;
    clearInterval(this._placeholderTimer);

    // Hide suggestions and welcome
    const suggestionsEl = document.getElementById("chat-suggestions");
    if (suggestionsEl) suggestionsEl.remove();
    const welcome = document.querySelector(".chat-welcome");
    if (welcome) welcome.remove();

    // Show top bar
    const topBar = document.getElementById("chat-top-bar");
    if (topBar) topBar.style.display = "";

    // Add user bubble
    this._addChatBubble("user", question);
    this._chatHistory.push({ role: "user", content: question, time: Date.now() });
    this._saveChatHistory(paper.id);

    // Bouncing dots loading indicator
    const messages = document.getElementById("chat-messages");
    const loadingEl = document.createElement("div");
    loadingEl.className = "chat-loading";
    loadingEl.id = "chat-loading";
    loadingEl.innerHTML = `
      <div class="chat-bubble assistant">
        <div class="chat-avatar assistant-avatar">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="var(--chat-claude)" opacity="0.15"/>
            <path d="M24 8l2.5 10.5L36 14l-6.5 8.5L38 26H10l8.5-3.5L12 14l9.5 4.5z" fill="var(--chat-claude)" opacity="0.7"/>
          </svg>
        </div>
        <div class="chat-bubble-body">
          <div class="chat-bubble-label claude-label">Claude</div>
          <div class="chat-bubble-content">
            <div class="chat-typing-dots">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    messages.appendChild(loadingEl);
    this._scrollChatBottom();

    try {
      const res = await api.ai.chatSend(paper.id, question, this._chatHistory);
      loadingEl.remove();
      this._addChatBubble("assistant", res.reply);
      this._chatHistory.push({ role: "assistant", content: res.reply, time: Date.now() });
      this._saveChatHistory(paper.id);
    } catch (err) {
      loadingEl.remove();
      const errorEl = document.createElement("div");
      errorEl.className = "chat-bubble assistant chat-error";
      errorEl.innerHTML = `
        <div class="chat-avatar assistant-avatar">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="var(--danger)" opacity="0.12"/>
            <text x="24" y="31" text-anchor="middle" font-size="18" font-weight="700" fill="var(--danger)">!</text>
          </svg>
        </div>
        <div class="chat-bubble-body">
          <div class="chat-bubble-label claude-label">Claude</div>
          <div class="chat-bubble-content">
            <span style="font-weight:600;">出错了</span>
            <p style="margin:4px 0 0;font-size:0.82rem;">${escapeHtml(err.message)}</p>
          </div>
        </div>
      `;
      messages.appendChild(errorEl);
      this._scrollChatBottom();
      this._chatHistory.pop();
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
      // Resume placeholder rotation
      const placeholders = [
        "输入你的问题...（Enter 发送，Shift+Enter 换行）",
        "试着问：这篇论文用了什么技术方案？",
        "试着问：论文的安全性假设是什么？",
        "试着问：实验部分有哪些不足？",
        "试着问：论文中数学公式的含义是什么？",
      ];
      this._startPlaceholderRotation(input, placeholders);
      // Update message count
      const countEl = document.getElementById("chat-msg-count");
      if (countEl) countEl.textContent = `${this._chatHistory.length} 条消息`;
    }
  }

  _addChatBubble(role, content, timestamp) {
    const messages = document.getElementById("chat-messages");
    if (!messages) return;

    const time = timestamp || Date.now();
    const timeStr = this._formatTime(time);
    const isLastAsst = role === "assistant" && this._chatHistory.length > 0
      && this._chatHistory[this._chatHistory.length - 1]?.role === "assistant";

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${role}`;

    if (role === "user") {
      bubble.innerHTML = `
        <div class="chat-bubble-body user-body">
          <div class="chat-bubble-label user-label">你</div>
          <div class="chat-bubble-content">
            <div class="chat-bubble-text">${escapeHtml(content)}</div>
          </div>
          <div class="chat-bubble-time">${timeStr}</div>
        </div>
        <div class="chat-avatar user-avatar">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="var(--accent)" opacity="0.15"/>
            <circle cx="24" cy="17" r="7" fill="var(--accent)" opacity="0.5"/>
            <ellipse cx="24" cy="38" rx="13" ry="9" fill="var(--accent)" opacity="0.4"/>
          </svg>
        </div>
      `;
    } else {
      bubble.innerHTML = `
        <div class="chat-avatar assistant-avatar">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="var(--chat-claude)" opacity="0.15"/>
            <path d="M24 8l2.5 10.5L36 14l-6.5 8.5L38 26H10l8.5-3.5L12 14l9.5 4.5z" fill="var(--chat-claude)" opacity="0.7"/>
          </svg>
        </div>
        <div class="chat-bubble-body">
          <div class="chat-bubble-label claude-label">Claude</div>
          <div class="chat-bubble-content md-content">${renderMarkdown(content)}</div>
          <div class="chat-bubble-meta">
            <span class="chat-bubble-time">${timeStr}</span>
            <div class="chat-bubble-actions">
              <button class="chat-action-btn" data-action="copy" title="复制回复">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
              <button class="chat-action-btn" data-action="regenerate" title="重新生成">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;

      // Highlight code blocks
      this._highlightCode(bubble);

      // Copy button handler
      bubble.querySelector('[data-action="copy"]')?.addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        navigator.clipboard.writeText(content).then(() => {
          btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
          setTimeout(() => {
            btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
          }, 1500);
        }).catch(() => showToast("复制失败", "error"));
      });

      // Regenerate handler
      bubble.querySelector('[data-action="regenerate"]')?.addEventListener("click", (e) => {
        e.stopPropagation();
        this._regenerateLast();
      });
    }

    messages.appendChild(bubble);
    this._scrollChatBottom();
  }

  _highlightCode(container) {
    container.querySelectorAll("pre code").forEach(block => {
      let html = block.innerHTML;
      // Keywords (common across languages)
      html = html.replace(/\b(function|const|let|var|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|static|public|private|protected|extends|implements|interface|type|enum|namespace|using|include|define|require|module|def|lambda|yield|raise|except|finally|with|and|or|not|in|is|None|True|False|self|print|range|len|int|str|float|bool|list|dict|set|tuple)\b/g,
        '<span class="code-kw">$1</span>');
      // Strings
      html = html.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="code-str">$&</span>');
      // Comments
      html = html.replace(/(\/\/.*$|#.*$)/gm, '<span class="code-cmt">$1</span>');
      // Numbers
      html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-num">$1</span>');
      block.innerHTML = html;
    });
  }

  _formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    if (isToday) return `${hh}:${mm}`;
    return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${hh}:${mm}`;
  }

  _scrollChatBottom() {
    const messages = document.getElementById("chat-messages");
    if (messages) {
      requestAnimationFrame(() => {
        messages.scrollTop = messages.scrollHeight;
      });
    }
  }

  // ── Chat persistence ────────────────────────────────────────────────
  _storageKey(paperId) {
    return `paper-chat-${paperId}`;
  }

  _saveChatHistory(paperId) {
    try {
      localStorage.setItem(
        this._storageKey(paperId),
        JSON.stringify(this._chatHistory.slice(-60)) // Keep max 60 messages
      );
    } catch (e) { /* quota exceeded or unavailable */ }
  }

  _loadChatHistory(paperId) {
    try {
      const raw = localStorage.getItem(this._storageKey(paperId));
      if (raw) return JSON.parse(raw);
    } catch (e) { /* corrupt or unavailable */ }
    return [];
  }

  _clearChat(paperId) {
    this._chatHistory = [];
    try { localStorage.removeItem(this._storageKey(paperId)); } catch (e) { /* */ }
  }

  async _regenerateLast() {
    // Remove last assistant message and re-send last user question
    const lastUser = [...this._chatHistory].reverse().find(m => m.role === "user");
    if (!lastUser) return;
    // Remove everything after the last user message (assistant + any errors)
    const lastUserIdx = this._chatHistory.lastIndexOf(lastUser);
    this._chatHistory = this._chatHistory.slice(0, lastUserIdx + 1);

    // Remove existing assistant bubbles (including the one we clicked regenerate on)
    const messages = document.getElementById("chat-messages");
    const asstBubbles = messages.querySelectorAll(".chat-bubble.assistant");
    asstBubbles.forEach(b => b.remove());
    messages.querySelectorAll(".chat-loading").forEach(l => l.remove());

    // Get the paper reference
    const input = document.getElementById("chat-input");
    // Re-send
    const paper = this.paper;
    if (!paper) return;

    // Add loading
    const loadingEl = document.createElement("div");
    loadingEl.className = "chat-loading";
    loadingEl.id = "chat-loading";
    loadingEl.innerHTML = `
      <div class="chat-bubble assistant">
        <div class="chat-avatar assistant-avatar">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="var(--chat-claude)" opacity="0.15"/>
            <path d="M24 8l2.5 10.5L36 14l-6.5 8.5L38 26H10l8.5-3.5L12 14l9.5 4.5z" fill="var(--chat-claude)" opacity="0.7"/>
          </svg>
        </div>
        <div class="chat-bubble-body">
          <div class="chat-bubble-label claude-label">Claude</div>
          <div class="chat-bubble-content">
            <div class="chat-typing-dots">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    messages.appendChild(loadingEl);
    this._scrollChatBottom();

    try {
      const res = await api.ai.chatSend(paper.id, lastUser.content, this._chatHistory);
      loadingEl.remove();
      this._addChatBubble("assistant", res.reply);
      this._chatHistory.push({ role: "assistant", content: res.reply, time: Date.now() });
      this._saveChatHistory(paper.id);
    } catch (err) {
      loadingEl.remove();
      const errorEl = document.createElement("div");
      errorEl.className = "chat-bubble assistant chat-error";
      errorEl.innerHTML = `
        <div class="chat-avatar assistant-avatar">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="var(--danger)" opacity="0.12"/>
            <text x="24" y="31" text-anchor="middle" font-size="18" font-weight="700" fill="var(--danger)">!</text>
          </svg>
        </div>
        <div class="chat-bubble-body">
          <div class="chat-bubble-label claude-label">Claude</div>
          <div class="chat-bubble-content">
            <span style="font-weight:600;">重新生成失败</span>
            <p style="margin:4px 0 0;font-size:0.82rem;">${escapeHtml(err.message)}</p>
          </div>
        </div>
      `;
      messages.appendChild(errorEl);
    }

    const countEl = document.getElementById("chat-msg-count");
    if (countEl) countEl.textContent = `${this._chatHistory.length} 条消息`;
  }

  // ── Notes Tab ──────────────────────────────────────────────────────
  async _renderNotes(body) {
    const p = this.paper;
    let notes = [];
    try { notes = await api.notes.list(p.id); } catch (e) { /* no notes */ }

    body.innerHTML = `
      <div id="notes-list">
        ${notes.length === 0 ? '<div class="empty-state"><h3>暂无笔记</h3></div>' : ''}
        ${notes.map(n => `
          <div class="note-card" data-note-id="${n.id}">
            <div class="note-type ${n.note_type === 'ai_summary' ? 'ai' : ''}">${n.note_type === 'ai_summary' ? 'AI分析' : '用户笔记'}</div>
            <div class="note-content">${escapeHtml(n.content)}</div>
            <div class="note-time">${formatDate(n.updated_at || n.created_at)}</div>
            <div class="note-actions">
              ${n.note_type === 'user' ? `<button class="note-action-btn edit" data-action="edit">编辑</button>` : ''}
              <button class="note-action-btn" data-action="delete">删除</button>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="note-editor">
        <textarea id="note-textarea" placeholder="写下你的笔记..."></textarea>
        <div class="note-actions-row">
          <button class="btn btn-primary btn-sm" id="btn-save-note">保存笔记</button>
        </div>
      </div>
    `;

    // Save new note
    document.getElementById("btn-save-note").addEventListener("click", async () => {
      const textarea = document.getElementById("note-textarea");
      const content = textarea.value.trim();
      if (!content) return;
      try {
        await api.notes.create(p.id, content);
        showToast("笔记已保存", "success");
        this._loadTab("notes");
      } catch (err) { showToast(err.message, "error"); }
    });

    // Note actions
    body.querySelectorAll(".note-action-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const noteId = parseInt(btn.closest(".note-card").dataset.noteId);
        if (btn.dataset.action === "delete") {
          if (!confirm("确认删除这条笔记？")) return;
          try {
            await api.notes.delete(noteId);
            showToast("笔记已删除", "info");
            this._loadTab("notes");
          } catch (err) { showToast(err.message, "error"); }
        } else if (btn.dataset.action === "edit") {
          const card = btn.closest(".note-card");
          const currentContent = card.querySelector(".note-content").textContent;
          const newContent = prompt("编辑笔记:", currentContent);
          if (newContent && newContent.trim() && newContent !== currentContent) {
            try {
              await api.notes.update(noteId, newContent.trim());
              showToast("笔记已更新", "success");
              this._loadTab("notes");
            } catch (err) { showToast(err.message, "error"); }
          }
        }
      });
    });
  }

  async _pollAnalyzeStatus(paperId, statusDiv, btn) {
    const maxPolls = 450;  // 15 minutes at 2s intervals
    let polls = 0;
    while (polls < maxPolls) {
      await new Promise(r => setTimeout(r, 2000));
      polls++;
      try {
        const job = await api.ai.analyzeStatus(paperId);
        if (job.status === "done") {
          showToast(`分析完成！生成 ${job.result.files_generated} 个文件`, "success");
          this.paper = await api.papers.get(paperId);
          this._loadTab("ai");
          return;
        }
        if (job.status === "error") {
          statusDiv.innerHTML = `
            <div class="ai-error">
              <span>⚠️ 分析失败</span>
              <p>${job.error}</p>
            </div>
          `;
          showToast(job.error, "error");
          btn.disabled = false;
          btn.textContent = "🚀 重新生成";
          return;
        }
        // Still running — update elapsed time
        const mins = Math.floor(polls * 2 / 60);
        const secs = (polls * 2) % 60;
        statusDiv.innerHTML = `
          <div class="ai-generating">
            <span class="ai-spinner"></span>
            <span>正在分析中... 已耗时 ${mins}分${secs}秒（刷新页面不会中断）</span>
          </div>
        `;
      } catch (e) {
        // Polling failed, keep trying
      }
    }
    statusDiv.innerHTML = `
      <div class="ai-error">
        <span>⚠️ 分析超时</span>
        <p>已等待 15 分钟仍未完成，请检查后台进程。</p>
      </div>
    `;
    btn.disabled = false;
    btn.textContent = "🚀 重新生成";
  }

  // ── AI Tab ──────────────────────────────────────────────────────────
  async _renderAI(body) {
    const p = this.paper;

    let analysisFiles = [];

    if (p.has_paper_analysis) {
      try { analysisFiles = await api.papers.analysisFiles(p.id); } catch (e) {}
    }

    // ── Section 1: Paper Analysis Files ──────────────────────────
    let analysisHtml = "";
    if (p.has_paper_analysis) {
      if (analysisFiles.length > 0) {
        const fileLabels = {
          "00-论文信息.md": "基本信息",
          "01-核心研究目标.md": "核心研究目标",
          "02-研究背景与痛点.md": "研究背景",
          "03-系统架构.md": "系统架构",
          "04-核心技术原理.md": "核心技术原理",
          "05-实验评估.md": "实验评估",
          "06-优缺点分析.md": "优缺点分析",
          "07-未来研究方向.md": "未来研究方向",
        };
        analysisHtml = `
          <div class="ai-section-header">📊 论文分析报告</div>
          ${analysisFiles.map((f, i) => {
            const label = fileLabels[f.filename] || f.filename.replace(/\.md$/, "");
            const icon = ["📋","🎯","🔍","🏗️","⚙️","📈","⚖️","🔮"][i] || "📄";
            return `
              <details class="analysis-section" ${analysisFiles.length <= 2 ? 'open' : ''}>
                <summary class="analysis-summary">${icon} ${label}</summary>
                <div class="md-content">${renderMarkdown(f.content)}</div>
              </details>
            `;
          }).join("")}
        `;
      } else {
        analysisHtml = `
          <div class="ai-section-header">📊 论文分析报告</div>
          <div class="ai-hint">paper-analysis 目录存在但无 .md 文件</div>
        `;
      }
    }

    // ── Section 2: Full Analysis (academic-paper-analyzer) ────────
    let fullAnalysisHtml = "";
    if (!p.has_paper_analysis) {
      // Check if a job is already running
      let jobRunning = false;
      try {
        const job = await api.ai.analyzeStatus(p.id);
        if (job.status === "running") {
          jobRunning = true;
          fullAnalysisHtml = `
            <div class="ai-section-header" style="margin-top:0;">🔬 完整分析报告</div>
            <div class="ai-guide">
              <div class="ai-guide-title">⏳ 分析正在进行中</div>
              <div id="analyzer-status" style="margin-top:8px;">
                <div class="ai-generating">
                  <span class="ai-spinner"></span>
                  <span>正在分析中...（刷新页面不会中断）</span>
                </div>
              </div>
            </div>
          `;
        }
      } catch (e) { /* ignore */ }

      if (jobRunning) {
        // Start polling after render
        setTimeout(() => {
          const statusDiv = document.getElementById("analyzer-status");
          const btn = document.getElementById("btn-run-analyzer");
          if (statusDiv) this._pollAnalyzeStatus(p.id, statusDiv, btn);
        }, 100);
      }

      if (!jobRunning) {
        fullAnalysisHtml = `
          <div class="ai-section-header" style="margin-top:0;">🔬 完整分析报告</div>
          <div class="ai-guide">
            <div class="ai-guide-title">调用 Claude Code 的 /academic-paper-analyzer 技能</div>
            <div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:12px;">
              自动读取 PDF，生成包含 7 个分析文件的 <code>paper-analysis/</code> 报告目录。预计耗时 2-5 分钟。
            </div>
            <button class="btn btn-primary" id="btn-run-analyzer">🚀 生成完整分析报告</button>
            <div id="analyzer-status" style="margin-top:12px;"></div>
          </div>
        `;
      }
    }

    body.innerHTML = analysisHtml + fullAnalysisHtml;

    // ── Bind: Full Analysis button ──────────────────────────────
    document.getElementById("btn-run-analyzer")?.addEventListener("click", async () => {
      const statusDiv = document.getElementById("analyzer-status");
      const btn = document.getElementById("btn-run-analyzer");
      btn.disabled = true;
      btn.textContent = "⏳ 正在分析中...";
      statusDiv.innerHTML = `
        <div class="ai-generating">
          <span class="ai-spinner"></span>
          <span>Claude Code 正在读取 PDF 并生成分析报告...</span>
        </div>
      `;

      try {
        // Start the analysis (returns immediately, runs in background)
        await api.ai.analyze(p.id);
        // Poll for completion every 2 seconds
        await this._pollAnalyzeStatus(p.id, statusDiv, btn);
      } catch (err) {
        statusDiv.innerHTML = `
          <div class="ai-error">
            <span>⚠️ 启动失败</span>
            <p>${err.message}</p>
          </div>
        `;
        btn.disabled = false;
        btn.textContent = "🚀 生成完整分析报告";
      }
    });

  }
}


// ── Lightweight Markdown → HTML Renderer ───────────────────────────────

function _detailSkeleton() {
  return `
    <div style="padding:20px 24px;">
      <div class="skeleton-line title" style="width:70%;margin-bottom:12px;"></div>
      <div class="skeleton-line med" style="margin-bottom:4px;"></div>
      <div class="skeleton-line short" style="margin-bottom:20px;"></div>
    </div>
    <div style="padding:0 24px;">
      <div class="skeleton-line wide" style="margin-bottom:4px;"></div>
      <div class="skeleton-line wide" style="margin-bottom:4px;"></div>
      <div class="skeleton-line med" style="margin-bottom:4px;"></div>
      <div class="skeleton-line short"></div>
    </div>
  `;
}

function _tabSkeleton() {
  return Array(4).fill(`
    <div class="skeleton-line wide" style="margin-bottom:8px;"></div>
    <div class="skeleton-line med" style="margin-bottom:8px;"></div>
    <div class="skeleton-line short" style="margin-bottom:20px;"></div>
  `).join("");
}

function renderMarkdown(text) {
  if (!text) return "";

  // Extract and protect code blocks first
  const codeBlocks = [];
  let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`);
    return `\x00CODE${idx}\x00`;
  });

  // Extract inline code
  const inlineCodes = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(`<code>${escapeHtml(code)}</code>`);
    return `\x00ICODE${idx}\x00`;
  });

  // Split into blocks by double newlines
  const blocks = html.split(/\n\n+/).filter(b => b.trim());

  const rendered = blocks.map(block => {
    const lines = block.split("\n").filter(l => l.trim());

    if (lines.length === 0) return "";

    const firstLine = lines[0].trim();

    // Horizontal rule
    if (/^[-_*]{3,}$/.test(firstLine)) return "<hr>";

    // Heading
    const headingMatch = firstLine.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch && lines.length === 1) {
      const level = headingMatch[1].length;
      const content = processInline(headingMatch[2]);
      return `<h${level + 1}>${content}</h${level + 1}>`;
    }

    // Blockquote (lines start with >)
    if (lines.every(l => /^>\s?/.test(l.trim()))) {
      const content = lines.map(l => processInline(l.trim().replace(/^>\s?/, ""))).join("<br>");
      return `<blockquote>${content}</blockquote>`;
    }

    // Ordered list (lines start with 1. 2. etc.)
    if (lines.every(l => /^\d+\.\s+/.test(l.trim()))) {
      const items = lines.map(l => `<li>${processInline(l.trim().replace(/^\d+\.\s+/, ""))}</li>`).join("");
      return `<ol>${items}</ol>`;
    }

    // Unordered list (all lines start with - or *)
    if (lines.every(l => /^[\-\*]\s+/.test(l.trim()))) {
      const items = lines.map(l => `<li>${processInline(l.trim().replace(/^[\-\*]\s+/, ""))}</li>`).join("");
      return `<ul>${items}</ul>`;
    }

    // Table (contains | separators)
    if (firstLine.includes("|") && lines.length >= 2) {
      return renderTable(lines);
    }

    // Paragraph
    const content = lines.map(l => processInline(l.trim())).join("<br>");
    return `<p>${content}</p>`;
  });

  html = rendered.join("");

  // Restore code blocks
  html = html.replace(/\x00CODE(\d+)\x00/g, (_, i) => codeBlocks[parseInt(i)]);
  html = html.replace(/\x00ICODE(\d+)\x00/g, (_, i) => inlineCodes[parseInt(i)]);

  return html;
}

function processInline(text) {
  if (!text) return "";
  // Escape HTML first
  let html = escapeHtml(text);
  // Bold+italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  return html;
}

function renderTable(lines) {
  // Skip separator line (---|---)
  const dataLines = lines.filter(l => !/^[\|\s\-:]+$/.test(l));
  if (dataLines.length === 0) {
    // Just header + separator
    const headerCells = lines[0].split("|").filter(c => c.trim());
    const thHtml = headerCells.map(c => `<th>${processInline(c.trim())}</th>`).join("");
    return `<table><thead><tr>${thHtml}</tr></thead></table>`;
  }

  const headerCells = dataLines[0].split("|").filter(c => c.trim());
  const thHtml = headerCells.map(c => `<th>${processInline(c.trim())}</th>`).join("");
  const thead = `<thead><tr>${thHtml}</tr></thead>`;

  const bodyRows = dataLines.slice(1).map(row => {
    const cells = row.split("|").filter(c => c.trim());
    return `<tr>${cells.map(c => `<td>${processInline(c.trim())}</td>`).join("")}</tr>`;
  }).join("");
  const tbody = `<tbody>${bodyRows}</tbody>`;

  return `<table>${thead}${tbody}</table>`;
}
