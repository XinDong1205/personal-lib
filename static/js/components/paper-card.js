/**
 * Paper card component for grid view — with quick-action hover buttons.
 */

import { router } from "../router.js";
import { api } from "../api.js";
import { store } from "../state.js";
import { statusLabel, statusCSS } from "./paper-list.js";
import { escapeHtml, showToast, cleanSubtitle } from "../utils.js";

export function renderPaperCard(paper) {
  const card = document.createElement("div");
  card.className = "paper-card";
  card.dataset.paperId = paper.id;

  const statusCls = statusCSS(paper.reading_status);

  card.innerHTML = `
    <div class="card-title">${escapeHtml(paper.title)}</div>
    ${(paper.title_cn && paper.title_cn !== paper.title) ? `<div class="card-subtitle">${escapeHtml(cleanSubtitle(paper.title, paper.title_cn))}</div>` : ''}
    <div class="card-folder">${escapeHtml(paper.folder_name)}</div>
    ${(paper.authors || paper.year || paper.venue) ? `
      <div class="card-attrs">
        ${paper.authors ? `<span title="作者">${escapeHtml(paper.authors)}</span>` : ''}
        ${paper.venue ? `<span title="期刊/会议">${escapeHtml(paper.venue)}</span>` : ''}
        ${paper.year ? `<span>${paper.year}</span>` : ''}
      </div>
    ` : ''}
    <div class="card-meta">
      <span class="status-badge ${statusCls}" data-action="cycle-status" title="点击切换阅读状态">
        <span class="status-dot"></span> ${escapeHtml(statusLabel(paper.reading_status))}
      </span>
    </div>
    <div class="card-chips">
      ${(paper.tag_names || []).map(t => `<span class="tag-chip accent">${escapeHtml(t)}</span>`).join("")}
    </div>
    <div class="indicator-icons">
      <span class="indicator-badge ${paper.has_md ? 'active' : ''}" data-action="open-md" title="${paper.has_md ? '打开 MD 文件' : '暂无 MD 文件'}">
        <span class="indicator-dot"></span>MD
      </span>
      <span class="indicator-badge ${paper.has_paper_analysis ? 'active' : ''}" data-action="open-analysis" title="${paper.has_paper_analysis ? '查看分析报告' : '暂无分析报告'}">
        <span class="indicator-dot"></span>分析
      </span>
    </div>
    <div class="card-actions">
      <button class="card-action-btn" data-action="open" title="打开详情">📖</button>
      <button class="card-action-btn" data-action="pdf" title="打开 PDF">📄</button>
    </div>
    <div class="card-progress">
      <div class="card-progress-bar ${statusCls}" style="width:${paper.reading_status === 'read' ? '100%' : paper.reading_status === 'reading' ? '50%' : '0%'}"></div>
    </div>
  `;

  // Quick actions
  card.querySelector("[data-action='cycle-status']")?.addEventListener("click", async (e) => {
    e.stopPropagation();
    const next = { unread: "reading", reading: "read", read: "unread" };
    const newStatus = next[paper.reading_status] || "unread";
    try {
      await api.papers.update(paper.id, { reading_status: newStatus });
      paper.reading_status = newStatus;
      const badge = card.querySelector(".status-badge");
      badge.className = `status-badge ${statusCSS(newStatus)}`;
      badge.querySelector("span").textContent = ` ${statusLabel(newStatus)}`;
      // Update progress bar
      const bar = card.querySelector(".card-progress-bar");
      if (bar) {
        bar.className = `card-progress-bar ${statusCSS(newStatus)}`;
        bar.style.width = newStatus === 'read' ? '100%' : newStatus === 'reading' ? '50%' : '0%';
      }
      showToast(`状态 → ${statusLabel(newStatus)}`, "success");
    } catch (err) { showToast(err.message, "error"); }
  });

  card.querySelector("[data-action='open']")?.addEventListener("click", (e) => {
    e.stopPropagation();
    router.navigate(`#/papers/${paper.id}`);
  });

  card.querySelector("[data-action='pdf']")?.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      await fetch("/api/v1/papers/open-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: paper.pdf_path }),
      });
    } catch (err) { showToast("无法打开 PDF", "error"); }
  });

  // Indicator badge: open MD file
  card.querySelector("[data-action='open-md']")?.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!paper.has_md) return;
    try {
      await fetch("/api/v1/papers/open-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: paper.md_path }),
      });
    } catch (err) { showToast("无法打开 MD 文件", "error"); }
  });

  // Indicator badge: open paper detail → AI tab
  card.querySelector("[data-action='open-analysis']")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!paper.has_paper_analysis) return;
    router.navigate(`#/papers/${paper.id}?tab=ai`);
  });

  return card;
}
