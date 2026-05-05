/**
 * Paper Relationship Graph — D3.js force-directed graph.
 * Bibliographic coupling (shared references → Jaccard similarity) drives edges.
 *
 * Features: glow effects, hover ego-network highlight, rich tooltip,
 *           detail panel, search/filter, zoom controls, dark-mode aware.
 */

import { api } from "../api.js";
import { router } from "../router.js";
import { escapeHtml } from "../utils.js";

// ── Status colour maps ──────────────────────────────────────────────────────
const STATUS_COLOR = { unread: "#9ca3af", reading: "#e09328", read: "#4caf7c" };
const STATUS_LABEL = { unread: "未读", reading: "阅读中", read: "已读" };

export class Graph {
  constructor() {
    this.el = document.getElementById("main-content");
    this.simulation = null;
    this.nodeData = [];
    this.linkData = [];
    this.selectedNode = null;
  }

  // ── Entry ───────────────────────────────────────────────────────────────
  async render() {
    this.el.innerHTML = _skeleton();
    let data;
    try {
      data = await api.graph();
    } catch (e) {
      this.el.innerHTML = `<div class="empty-state"><h3>加载失败</h3><p>${e.message}</p></div>`;
      return;
    }

    if (!data.nodes || data.nodes.length === 0) {
      this.el.innerHTML = `<div class="empty-state"><div class="empty-icon">🕸️</div><h3>暂无数据</h3><p>没有可用的论文数据</p></div>`;
      return;
    }

    this.nodeData = data.nodes;
    this.linkData = data.links || [];

    this._renderForce(data);
  }

  // ── D3 Rendering ────────────────────────────────────────────────────────
  _renderForce(data) {
    const container = document.getElementById("graph-container");
    const W = container.clientWidth;
    const H = container.clientHeight;
    const isDark = document.documentElement.dataset.theme === "dark";
    const C = _themeColors(isDark);

    // --- SVG setup ---
    const svg = d3.select("#graph-container")
      .append("svg")
      .attr("width", W)
      .attr("height", H);

    // Defs: gradients, filters, background pattern
    _createDefs(svg, C);

    // Background dot-grid
    svg.append("rect")
      .attr("width", W).attr("height", H)
      .attr("fill", `url(#dotGrid)`);

    const g = svg.append("g");

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([0.25, 5])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    // --- Scales ---
    const maxRefs = Math.max(1, ...data.nodes.map(n => n.ref_count || n.tag_count || 1));
    const rScale = d3.scaleSqrt().domain([0, maxRefs]).range([6, 26]);

    // --- Simulation ---
    const sim = d3.forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collision", d3.forceCollide().radius(d => rScale(d.ref_count || d.tag_count || 1) + 10))
      .alphaDecay(0.04);

    if (this.linkData.length > 0) {
      sim.force("link", d3.forceLink(this.linkData)
        .id(d => d.id)
        .distance(d => Math.max(80, 200 - d.weight * 1.5)));
    }

    this.simulation = sim;

    // --- Links ---
    let linkG, linkEls;
    if (this.linkData.length > 0) {
      linkG = g.append("g").attr("class", "links");
      linkEls = linkG.selectAll("line")
        .data(this.linkData)
        .join("line")
        .attr("stroke", C.linkStroke)
        .attr("stroke-opacity", d => 0.08 + (d.weight / 100) * 0.45)
        .attr("stroke-width", d => 1 + (d.weight / 100) * 3.5)
        .attr("stroke-linecap", "round");
    }

    // --- Nodes ---
    const nodeG = g.append("g").attr("class", "nodes");

    const nodeGroup = nodeG.selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("class", "graph-node")
      .style("cursor", "pointer");

    // Outer glow ring (larger, transparent — visible on hover)
    nodeGroup.append("circle")
      .attr("class", "node-glow")
      .attr("r", d => rScale(d.ref_count || d.tag_count || 1) + 6)
      .attr("fill", "none")
      .attr("stroke", d => STATUS_COLOR[d.reading_status] || C.unread)
      .attr("stroke-width", 3)
      .attr("stroke-opacity", 0)
      .style("transition", "stroke-opacity 0.3s");

    // Main node circle with gradient fill
    nodeGroup.append("circle")
      .attr("class", "node-body")
      .attr("r", d => rScale(d.ref_count || d.tag_count || 1))
      .attr("fill", d => `url(#grad-${d.reading_status || 'unread'})`)
      .attr("stroke", d => STATUS_COLOR[d.reading_status] || C.unread)
      .attr("stroke-width", 2.2)
      .style("filter", "url(#nodeShadow)")
      .style("transition", "stroke-width 0.25s, filter 0.25s");

    // Label
    nodeGroup.append("text")
      .attr("class", "node-label")
      .text(d => d.title.length > 22 ? d.title.slice(0, 22) + "…" : d.title)
      .attr("text-anchor", "middle")
      .attr("dy", d => rScale(d.ref_count || d.tag_count || 1) + 14)
      .attr("font-size", "10.5px")
      .attr("fill", C.labelText)
      .attr("font-weight", "500")
      .style("pointer-events", "none")
      .style("text-shadow", isDark ? "0 1px 3px #000" : "0 1px 3px #fff");

    // Hover title (native, as fallback)
    nodeGroup.append("title")
      .text(d => `${d.title}\n${d.year || ""} · ${d.venue || ""}\n${d.ref_count || 0} 条参考文献`);

    // --- Interaction ---
    const self = this;
    const tooltip = document.getElementById("graph-tooltip");
    const detailPanel = document.getElementById("graph-detail-panel");

    nodeGroup
      .on("mouseenter", function(event, d) {
        d3.select(this).select(".node-glow").attr("stroke-opacity", 0.55);
        d3.select(this).select(".node-body")
          .attr("stroke-width", 3.5)
          .style("filter", "url(#nodeGlow)");

        // Highlight ego network
        const neighbors = new Set();
        if (self.linkData.length > 0) {
          self.linkData.forEach(l => {
            if (l.source.id === d.id || l.source === d.id) neighbors.add(l.target.id || l.target);
            if (l.target.id === d.id || l.target === d.id) neighbors.add(l.source.id || l.source);
          });
        }
        neighbors.add(d.id);

        nodeGroup.each(function(nd) {
          const isNeighbor = neighbors.has(nd.id);
          d3.select(this).select(".node-body")
            .transition().duration(250)
            .attr("opacity", isNeighbor ? 1 : 0.15);
          d3.select(this).select(".node-label")
            .transition().duration(250)
            .attr("opacity", isNeighbor ? 1 : 0.08);
        });

        if (linkEls) {
          linkEls.transition().duration(250)
            .attr("stroke-opacity", l => {
              const sId = l.source.id || l.source;
              const tId = l.target.id || l.target;
              return (sId === d.id || tId === d.id) ? 0.7 : 0.03;
            })
            .attr("stroke-width", l => {
              const sId = l.source.id || l.source;
              const tId = l.target.id || l.target;
              return (sId === d.id || tId === d.id) ? 3 + (l.weight / 100) * 4 : 0.5;
            });
        }

        // Tooltip
        _showTooltip(tooltip, d, event);
      })
      .on("mousemove", function(event, d) {
        _showTooltip(tooltip, d, event);
      })
      .on("mouseleave", function() {
        d3.select(this).select(".node-glow").attr("stroke-opacity", 0);
        d3.select(this).select(".node-body")
          .attr("stroke-width", 2.2)
          .style("filter", "url(#nodeShadow)");

        nodeGroup.each(function() {
          d3.select(this).select(".node-body")
            .transition().duration(300).attr("opacity", 1);
          d3.select(this).select(".node-label")
            .transition().duration(300).attr("opacity", 1);
        });

        if (linkEls) {
          linkEls.transition().duration(300)
            .attr("stroke-opacity", d => 0.08 + (d.weight / 100) * 0.45)
            .attr("stroke-width", d => 1 + (d.weight / 100) * 3.5);
        }

        _hideTooltip(tooltip);
      })
      .on("click", function(event, d) {
        event.stopPropagation();
        self._openDetail(d, detailPanel, C);
      });

    // Click background: close detail panel, deselect
    svg.on("click", () => {
      self._closeDetail(detailPanel);
    });

    // Drag
    nodeGroup.call(d3.drag()
      .on("start", (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on("end", (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null; d.fy = null;
      }));

    // --- Tick ---
    sim.on("tick", () => {
      if (linkEls) {
        linkEls
          .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      }
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // --- Controls ---
    this._setupSearch(data, nodeGroup, linkEls);
    this._setupZoomControls(svg, zoom, W, H);
    this._setupReset(sim, data, W, H, rScale);

    // Store refs for theme switching
    this._svg = svg;
    this._sim = sim;
    this._nodeG = nodeGroup;
    this._linkEls = linkEls;
    this._rScale = rScale;

    // Observe theme changes
    this._themeObserver = new MutationObserver(() => {
      // Re-render on theme change (simple approach: just refresh)
    });
    this._themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  // ── Detail Panel ─────────────────────────────────────────────────────────
  _openDetail(d, panel, C) {
    this.selectedNode = d;
    const tags = (d.tags || []).map(t =>
      `<span class="tag-chip">${escapeHtml(t)}</span>`
    ).join("") || '<span class="muted-text" style="font-size:0.75rem;">无标签</span>';

    panel.innerHTML = `
      <div class="gp-header">
        <button class="gp-close" title="关闭">×</button>
        <span class="status-badge status-${d.reading_status}">${STATUS_LABEL[d.reading_status] || d.reading_status}</span>
      </div>
      <h3 class="gp-title">${escapeHtml(d.title)}</h3>
      ${d.title_cn ? `<p class="gp-title-cn">${escapeHtml(d.title_cn)}</p>` : ""}
      <div class="gp-meta">
        ${d.authors ? `<div class="gp-row"><span class="gp-label">作者</span><span>${escapeHtml(d.authors.length > 60 ? d.authors.slice(0,60)+"…" : d.authors)}</span></div>` : ""}
        ${d.year ? `<div class="gp-row"><span class="gp-label">年份</span><span>${d.year}</span></div>` : ""}
        ${d.venue ? `<div class="gp-row"><span class="gp-label">来源</span><span>${escapeHtml(d.venue.length > 70 ? d.venue.slice(0,70)+"…" : d.venue)}</span></div>` : ""}
        <div class="gp-row"><span class="gp-label">参考文献</span><span>${d.ref_count || 0} 条</span></div>
        <div class="gp-row"><span class="gp-label">标签</span><span>${d.tag_count || 0} 个</span></div>
      </div>
      <div class="gp-tags">${tags}</div>
      <button class="gp-view-btn" id="gp-view-btn">📄 查看完整详情</button>
    `;

    panel.classList.add("open");

    // Bind close
    panel.querySelector(".gp-close").addEventListener("click", (e) => {
      e.stopPropagation();
      this._closeDetail(panel);
    });

    // Bind view button
    panel.querySelector("#gp-view-btn").addEventListener("click", () => {
      router.navigate(`#/papers/${d.id}`);
    });
  }

  _closeDetail(panel) {
    this.selectedNode = null;
    panel.classList.remove("open");
  }

  // ── Search ───────────────────────────────────────────────────────────────
  _setupSearch(data, nodeGroup, linkEls) {
    const input = document.getElementById("graph-search");
    if (!input) return;

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        // Reset all
        nodeGroup.selectAll(".node-body")
          .transition().duration(300).attr("opacity", 1);
        nodeGroup.selectAll(".node-label")
          .transition().duration(300).attr("opacity", 1);
        if (linkEls) {
          linkEls.transition().duration(300)
            .attr("stroke-opacity", d => 0.08 + (d.weight / 100) * 0.45)
            .attr("stroke-width", d => 1 + (d.weight / 100) * 3.5);
        }
        return;
      }

      const matches = new Set();
      data.nodes.forEach(n => {
        const haystack = (n.title + " " + (n.title_cn || "") + " " + (n.venue || "")).toLowerCase();
        if (haystack.includes(q)) matches.add(n.id);
      });

      nodeGroup.each(function(d) {
        const hit = matches.has(d.id);
        d3.select(this).select(".node-body")
          .transition().duration(250)
          .attr("opacity", hit ? 1 : 0.1);
        d3.select(this).select(".node-label")
          .transition().duration(250)
          .attr("opacity", hit ? 1 : 0.05);
      });

      if (linkEls) {
        linkEls.transition().duration(250)
          .attr("stroke-opacity", 0.02);
      }
    });
  }

  // ── Zoom Controls ────────────────────────────────────────────────────────
  _setupZoomControls(svg, zoom, W, H) {
    const container = document.getElementById("graph-container");

    // Zoom in
    document.getElementById("zoom-in")?.addEventListener("click", () => {
      svg.transition().duration(300).call(zoom.scaleBy, 1.4);
    });

    // Zoom out
    document.getElementById("zoom-out")?.addEventListener("click", () => {
      svg.transition().duration(300).call(zoom.scaleBy, 0.7);
    });

    // Fit to screen
    document.getElementById("zoom-fit")?.addEventListener("click", () => {
      svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    });
  }

  // ── Reset ────────────────────────────────────────────────────────────────
  _setupReset(sim, data, W, H, rScale) {
    document.getElementById("graph-reset")?.addEventListener("click", () => {
      // Release all pinned nodes
      data.nodes.forEach(d => { d.fx = null; d.fy = null; });
      sim.alpha(0.5).restart();
    });
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────
  destroy() {
    if (this.simulation) this.simulation.stop();
    if (this._svg) this._svg.remove();
    if (this._themeObserver) this._themeObserver.disconnect();
    const panel = document.getElementById("graph-detail-panel");
    if (panel) panel.classList.remove("open");
  }
}

// ── SVG Defs (gradients, filters, patterns) ────────────────────────────────
function _createDefs(svg, C) {
  const defs = svg.append("defs");

  // Node shadow filter
  const shadow = defs.append("filter").attr("id", "nodeShadow")
    .attr("x", "-30%").attr("y", "-30%").attr("width", "160%").attr("height", "160%");
  shadow.append("feDropShadow").attr("dx", 0).attr("dy", 2)
    .attr("stdDeviation", 2.5).attr("flood-color", C.shadowColor).attr("flood-opacity", 0.5);

  // Node glow filter (on hover)
  const glow = defs.append("filter").attr("id", "nodeGlow")
    .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
  glow.append("feDropShadow").attr("dx", 0).attr("dy", 0)
    .attr("stdDeviation", 6).attr("flood-color", C.glowColor).attr("flood-opacity", 0.7);

  // Radial gradients for each status
  ["unread", "reading", "read"].forEach(status => {
    const grad = defs.append("radialGradient")
      .attr("id", `grad-${status}`)
      .attr("cx", "35%").attr("cy", "35%").attr("r", "65%");
    const base = STATUS_COLOR[status];
    grad.append("stop").attr("offset", "0%").attr("stop-color", _lighten(base, 30));
    grad.append("stop").attr("offset", "100%").attr("stop-color", base);
  });

  // Background dot grid pattern
  const pat = defs.append("pattern")
    .attr("id", "dotGrid")
    .attr("width", 30).attr("height", 30)
    .attr("patternUnits", "userSpaceOnUse");
  pat.append("circle")
    .attr("cx", 15).attr("cy", 15).attr("r", 1.2)
    .attr("fill", C.gridDot);
}

// ── Tooltip ────────────────────────────────────────────────────────────────
function _showTooltip(el, d, event) {
  const tags = (d.tags || []).slice(0, 4).join(" · ") || "无标签";
  el.innerHTML = `
    <div class="gt-title">${escapeHtml(d.title.length > 50 ? d.title.slice(0,50)+"…" : d.title)}</div>
    <div class="gt-meta">
      ${d.year ? `<span>📅 ${d.year}</span>` : ""}
      ${d.venue ? `<span>📰 ${escapeHtml(d.venue.length > 40 ? d.venue.slice(0,40)+"…" : d.venue)}</span>` : ""}
    </div>
    <div class="gt-meta">
      <span>📚 ${d.ref_count || 0} 条参考文献</span>
      <span>🏷️ ${d.tag_count || 0} 个标签</span>
    </div>
    <div class="gt-tags">${tags}</div>
  `;
  el.classList.add("visible");

  // Position near cursor but within viewport
  const rect = el.getBoundingClientRect();
  let left = event.clientX + 16;
  let top = event.clientY - rect.height - 12;
  if (top < 10) top = event.clientY + 20;
  if (left + rect.width > window.innerWidth - 10) left = event.clientX - rect.width - 16;
  el.style.left = left + "px";
  el.style.top = top + "px";
}

function _hideTooltip(el) {
  el.classList.remove("visible");
}

// ── Theme-aware colours ────────────────────────────────────────────────────
function _themeColors(isDark) {
  return {
    linkStroke: isDark ? "#6d5c8a" : "#8b7aaa",
    labelText: isDark ? "#b0aca5" : "#666",
    shadowColor: isDark ? "#000" : "#000",
    glowColor: isDark ? "#fff" : "#000",
    gridDot: isDark ? "#3a3d42" : "#d4d4d4",
    unread: "#9ca3af",
  };
}

// ── Colour utility ─────────────────────────────────────────────────────────
function _lighten(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return `rgb(${R},${G},${B})`;
}

// ── Skeleton ───────────────────────────────────────────────────────────────
function _skeleton() {
  return `
    <div class="graph-top-bar">
      <h2 style="font-family:Georgia,serif;margin:0;">🕸️ 论文关联网络</h2>
      <div class="graph-legend">
        <span class="legend-item"><span class="legend-dot" style="background:#9ca3af;"></span> 未读</span>
        <span class="legend-item"><span class="legend-dot" style="background:#e09328;"></span> 阅读中</span>
        <span class="legend-item"><span class="legend-dot" style="background:#4caf7c;"></span> 已读</span>
        <span class="legend-sep">|</span>
        <span>连线 = 共享参考文献 · 线粗 = 相似度 · 节点大小 = 参考文献数</span>
      </div>
    </div>
    <div class="graph-controls">
      <input type="text" id="graph-search" class="graph-search-input" placeholder="🔍 搜索论文标题…" />
      <button id="graph-reset" class="graph-btn" title="重置布局">↺ 重置</button>
    </div>
    <div class="graph-viewport">
      <div id="graph-container"></div>
      <div class="graph-zoom-btns">
        <button id="zoom-in" class="zoom-btn" title="放大">+</button>
        <button id="zoom-out" class="zoom-btn" title="缩小">−</button>
        <button id="zoom-fit" class="zoom-btn" title="适应屏幕">⊡</button>
      </div>
      <div id="graph-tooltip" class="graph-tooltip"></div>
      <div id="graph-detail-panel" class="graph-detail-panel"></div>
    </div>
  `;
}
