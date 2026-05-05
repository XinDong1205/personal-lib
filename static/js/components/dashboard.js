/**
 * Research Dashboard — designed for academic researchers.
 * Shows research trajectory, topic landscape, venue coverage, reading progress.
 */

import { api } from "../api.js";
import { router } from "../router.js";
import { escapeHtml } from "../utils.js";

const STATUS_CSS = { unread: "status-unread", reading: "status-reading", read: "status-read" };
const STATUS_LABEL = { unread: "未读", reading: "阅读中", read: "已读" };

export class Dashboard {
  constructor() {
    this.el = document.getElementById("main-content");
  }

  async render() {
    this.el.innerHTML = _skeleton();
    let data;
    try {
      data = await api.statsExtended();
    } catch (e) {
      this.el.innerHTML = `<div class="empty-state"><h3>加载失败</h3><p>${e.message}</p></div>`;
      return;
    }

    const total = data.total_papers || 0;
    if (total === 0) {
      this.el.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><h3>暂无数据</h3><p>请先扫描论文库</p></div>`;
      return;
    }

    const readPct = total > 0 ? Math.round((data.read / total) * 100) : 0;
    const readingPct = total > 0 ? Math.round((data.reading / total) * 100) : 0;
    const unreadPct = 100 - readPct - readingPct;

    this.el.innerHTML = `
      <h2 style="font-family:Georgia,serif;margin:0 0 20px 0;">📊 研究仪表盘</h2>

      <!-- Hero stats -->
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-num">${total}</span>
          <span class="hero-label">篇论文${data.year_span ? `<span style="font-size:0.72rem;color:var(--text-muted);"> · ${data.year_span}</span>` : ''}</span>
        </div>
        <div class="hero-stat">
          <span class="hero-num accent">${readPct}%</span>
          <span class="hero-label">阅读完成率</span>
        </div>
        <div class="hero-stat">
          <span class="hero-num green">${data.with_analysis}</span>
          <span class="hero-label">深度分析</span>
        </div>
        <div class="hero-stat">
          <span class="hero-num blue">${data.total_notes}</span>
          <span class="hero-label">条笔记</span>
        </div>
      </div>

      <!-- Reading progress bar -->
      <div class="reading-progress-section">
        <div class="reading-progress-bar-wrap">
          <div class="reading-progress-bar">
            <div class="reading-progress-fill read" style="width:${readPct}%"></div>
            <div class="reading-progress-fill reading" style="width:${readingPct}%;left:${readPct}%"></div>
          </div>
        </div>
        <div class="reading-progress-labels">
          <span><span class="dot unread"></span>未读 ${data.unread}</span>
          <span><span class="dot reading"></span>阅读中 ${data.reading}</span>
          <span><span class="dot read"></span>已读 ${data.read}</span>
        </div>
      </div>

      <div class="dashboard-grid-2col">
        <!-- Research Timeline -->
        <div class="stat-card">
          <h3>📅 研究时间线</h3>
          ${_timelineCard(data.year_distribution, data.year_span, data.unknown_year_count || 0)}
        </div>

        <!-- Research Topics (Keywords) -->
        <div class="stat-card">
          <h3>🔬 研究主题</h3>
          ${_keywordsCard(data.keyword_distribution)}
        </div>
      </div>

      <div class="dashboard-grid-3col">
        <!-- Venues -->
        <div class="stat-card">
          <h3>📰 发表来源</h3>
          ${_venuesCard(data.venue_distribution)}
        </div>

        <!-- Coverage -->
        <div class="stat-card">
          <h3>📋 数据完整性</h3>
          ${_coverageCard(data, total)}
        </div>

        <!-- Recent activity -->
        <div class="stat-card">
          <h3>🕐 最近更新</h3>
          ${_recentCard(data.recent_papers)}
        </div>
      </div>
    `;

    // Bind click on recent papers
    this.el.querySelectorAll(".recent-item").forEach(item => {
      item.addEventListener("click", () => {
        router.navigate(`#/papers/${item.dataset.id}`);
      });
    });
  }
}

// ── Research Timeline (horizontal year markers) ──────────────────────────
function _timelineCard(yearDist, yearSpan, unknownCount) {
  const entries = Object.entries(yearDist || {}).sort((a, b) => a[0] - b[0]);
  if (entries.length === 0) {
    return `<p class="muted-text">暂无年份数据</p>
      ${unknownCount > 0 ? `<p class="hint-text" style="margin-top:6px;">${unknownCount} 篇论文缺少年份 — 运行 AI 分析自动提取元数据</p>` : ''}`;
  }

  const max = Math.max(1, ...entries.map(([, c]) => c));
  return `
    <div class="timeline">
      ${entries.map(([year, cnt]) => {
        const h = Math.max(20, Math.round((cnt / max) * 80));
        return `
          <div class="timeline-item">
            <div class="timeline-bar" style="height:${h}px;" title="${year}: ${cnt} 篇"></div>
            <span class="timeline-year">${year}</span>
            <span class="timeline-count">${cnt}</span>
          </div>
        `;
      }).join("")}
    </div>
    ${yearSpan ? `<div class="timeline-span" style="text-align:center;margin-top:8px;font-size:0.78rem;color:var(--text-muted);">时间跨度: ${yearSpan}</div>` : ''}
    ${unknownCount > 0 ? `<div class="timeline-unknown" style="text-align:center;margin-top:6px;font-size:0.72rem;color:var(--text-dim);">⚠️ ${unknownCount} 篇论文缺少年份数据 — 运行 AI 分析以补全</div>` : ''}
  `;
}

// ── Keywords frequency (tag-cloud style) ─────────────────────────────────
function _keywordsCard(keywords) {
  if (!keywords || keywords.length === 0) return '<p class="muted-text">暂无关键词数据（需运行 AI 分析提取元数据）</p>';

  const max = keywords[0].count;
  const min = keywords[keywords.length - 1].count;
  const range = max - min || 1;

  // Color map
  const colors = ["#3a5f8a", "#5e81ac", "#7b4b8a", "#b8731f", "#2d7a3a", "#a54a6f"];

  const chips = keywords.map((kw, i) => {
    const size = 0.75 + (kw.count - min) / range * 0.45; // 0.75rem to 1.2rem
    const color = colors[i % colors.length];
    const weight = kw.count >= max * 0.5 ? 600 : 400;
    return `<span class="kw-chip" style="font-size:${size.toFixed(2)}rem;color:${color};font-weight:${weight};" title="${kw.count} 篇">${escapeHtml(kw.name)}<sup>${kw.count}</sup></span>`;
  }).join("");

  return `<div class="kw-cloud">${chips}</div>`;
}

// ── Venue distribution ───────────────────────────────────────────────────
function _venuesCard(venues) {
  if (!venues || venues.length === 0) return '<p class="muted-text">暂无发表来源数据</p>';

  const max = Math.max(1, ...venues.map(v => v.count));
  const rows = venues.map((v, i) => {
    const pct = Math.round((v.count / max) * 100);
    const letter = v.name.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || v.name.slice(0, 2);
    return `
      <div class="venue-row">
        <span class="venue-avatar">${letter}</span>
        <span class="venue-name">${escapeHtml(v.name)}</span>
        <div class="venue-track"><div class="venue-fill" style="width:${pct}%;"></div></div>
        <span class="venue-count">${v.count}</span>
      </div>
    `;
  }).join("");

  return `<div class="venue-list">${rows}</div>`;
}

// ── Coverage ─────────────────────────────────────────────────────────────
function _coverageCard(data, total) {
  const items = [
    ["PDF 全文 (MD)", data.with_md, total, "var(--accent)", "论文正文可全文搜索"],
    ["中文译本", data.with_chinese, total, "var(--blue)", "有对应的中文翻译 PDF"],
    ["深度分析 (AI)", data.with_analysis, total, "var(--green)", "已完成 7 章节技术分析"],
  ];
  const rows = items.map(([label, cnt, t, color, tip]) => {
    const pct = t > 0 ? Math.round((cnt / t) * 100) : 0;
    const cls = pct === 100 ? "complete" : pct >= 50 ? "partial" : "low";
    return `
      <div class="integrity-row" title="${tip}">
        <div class="integrity-info">
          <span class="integrity-label">${label}</span>
          <span class="integrity-frac">${cnt}/${t}</span>
        </div>
        <div class="integrity-track">
          <div class="integrity-fill ${cls}" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="integrity-list">${rows}</div>
    <div style="margin-top:12px;display:flex;gap:16px;font-size:0.72rem;color:var(--text-dim);">
      <span>🏷️ ${data.total_tags} 个标签</span>
      <span>📝 ${data.total_notes} 条笔记</span>
    </div>
  `;
}

// ── Recent papers ────────────────────────────────────────────────────────
function _recentCard(recent) {
  if (!recent || recent.length === 0) return '<p class="muted-text">暂无</p>';

  const items = recent.map(p => `
    <div class="recent-item" data-id="${p.id}">
      <span class="status-badge ${STATUS_CSS[p.reading_status] || ''}">${STATUS_LABEL[p.reading_status] || p.reading_status}</span>
      <span class="recent-title">${escapeHtml(p.title.length > 28 ? p.title.slice(0, 28) + "…" : p.title)}</span>
    </div>
  `).join("");

  return `<div class="recent-list">${items}</div>`;
}

// ── Skeleton ─────────────────────────────────────────────────────────────
function _skeleton() {
  return `
    <div class="skeleton-line title" style="width:160px;margin-bottom:20px;"></div>
    <div style="display:flex;gap:16px;margin-bottom:20px;">
      ${Array(4).fill('<div class="stat-card" style="flex:1;height:70px;"><div class="skeleton-line med" style="width:60%;margin-bottom:8px;"></div><div class="skeleton-line short"></div></div>').join("")}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
      ${Array(2).fill('<div class="stat-card" style="height:220px;"></div>').join("")}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
      ${Array(3).fill('<div class="stat-card" style="height:200px;"></div>').join("")}
    </div>
  `;
}
