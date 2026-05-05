/**
 * Paper Compare — side-by-side comparison of two selected papers.
 */

import { api } from "../api.js";
import { escapeHtml, showToast } from "../utils.js";
import { statusLabel, statusCSS } from "./paper-list.js";

export class Compare {
  constructor() {
    this._ensureOverlay();
  }

  _ensureOverlay() {
    let overlay = document.getElementById("compare-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "compare-overlay";
      overlay.className = "compare-overlay hidden";
      document.body.appendChild(overlay);
    }
    this.overlay = overlay;
  }

  async open(paperId1, paperId2) {
    this.overlay.classList.remove("hidden");
    this.overlay.innerHTML = _skeleton();
    requestAnimationFrame(() => this.overlay.classList.add("open"));

    try {
      const [p1, p2] = await Promise.all([
        api.papers.get(paperId1),
        api.papers.get(paperId2),
      ]);
      let meta1 = null, meta2 = null;
      try { meta1 = await api.papers.metadata(paperId1); } catch (e) {}
      try { meta2 = await api.papers.metadata(paperId2); } catch (e) {}
      this._render(p1, p2, meta1, meta2);
    } catch (e) {
      this.overlay.innerHTML = `<div class="compare-panel"><div class="empty-state"><h3>加载失败</h3><p>${e.message}</p></div></div>`;
    }
  }

  close() {
    this.overlay.classList.remove("open");
    setTimeout(() => this.overlay.classList.add("hidden"), 250);
  }

  _render(p1, p2, m1, m2) {
    this.overlay.innerHTML = `
      <div class="compare-panel">
        <div class="compare-header">
          <h3>📊 论文对比</h3>
          <button class="detail-close" id="compare-close-btn">&times;</button>
        </div>
        <div class="compare-grid">
          <div class="compare-col">${_colHTML(p1, m1, p2)}</div>
          <div class="compare-col">${_colHTML(p2, m2, p1)}</div>
        </div>
      </div>
    `;

    document.getElementById("compare-close-btn").addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });
  }
}

function _colHTML(paper, meta, other) {
  const sharedTags = (paper.tag_names || []).filter(t => (other.tag_names || []).includes(t));

  return `
    <div class="compare-title">${escapeHtml(paper.title)}</div>
    ${paper.title_cn ? `<div class="compare-subtitle">${escapeHtml(paper.title_cn)}</div>` : ''}
    <div class="compare-folder">📁 ${escapeHtml(paper.folder_name)}</div>

    <div class="compare-section">
      <div class="compare-section-title">状态</div>
      <span class="status-badge ${statusCSS(paper.reading_status)}">${statusLabel(paper.reading_status)}</span>
    </div>

    <div class="compare-section">
      <div class="compare-section-title">标签</div>
      <div class="compare-tags">
        ${(paper.tag_names || []).map(t => {
          const shared = sharedTags.includes(t);
          return `<span class="tag-chip accent${shared ? ' shared-tag' : ''}">${escapeHtml(t)}${shared ? ' 🔗' : ''}</span>`;
        }).join("") || '<span class="muted-text">无</span>'}
      </div>
    </div>

    <div class="compare-section">
      <div class="compare-section-title">基本信息</div>
      <table class="meta-table" style="font-size:0.82rem;">
        ${meta?.authors ? `<tr><td>作者</td><td>${escapeHtml(meta.authors)}</td></tr>` : ''}
        ${meta?.year ? `<tr><td>年份</td><td>${escapeHtml(String(meta.year))}</td></tr>` : ''}
        ${meta?.venue ? `<tr><td>期刊/会议</td><td>${escapeHtml(meta.venue)}</td></tr>` : ''}
        ${meta?.keywords ? `<tr><td>关键词</td><td>${escapeHtml(meta.keywords)}</td></tr>` : ''}
        ${!meta?.authors && !meta?.year && !meta?.venue && !meta?.keywords ? '<tr><td colspan="2" class="muted-text">暂无元数据</td></tr>' : ''}
      </table>
    </div>

    <div class="compare-section">
      <div class="compare-section-title">文件</div>
      <div class="compare-files">
        <span class="indicator-badge ${paper.has_md ? 'active' : ''}"><span class="indicator-dot"></span>MD</span>
        <span class="indicator-badge ${paper.has_chinese ? 'active' : ''}"><span class="indicator-dot"></span>中文</span>
        <span class="indicator-badge ${paper.has_paper_analysis ? 'active' : ''}"><span class="indicator-dot"></span>分析</span>
      </div>
    </div>
  `;
}

function _skeleton() {
  return `
    <div class="compare-panel">
      <div class="compare-header">
        <div class="skeleton-line med" style="width:120px;"></div>
      </div>
      <div class="compare-grid">
        <div class="compare-col">
          ${Array(5).fill('<div class="skeleton-line wide" style="margin-bottom:8px;"></div>').join("")}
        </div>
        <div class="compare-col">
          ${Array(5).fill('<div class="skeleton-line wide" style="margin-bottom:8px;"></div>').join("")}
        </div>
      </div>
    </div>
  `;
}
