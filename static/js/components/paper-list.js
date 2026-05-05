/**
 * Paper list view — grid, table, filters, pagination, batch selection.
 */

import { store } from "../state.js";
import { api } from "../api.js";
import { router } from "../router.js";
import { createSearchBar } from "./search-bar.js";
import { renderPaperCard } from "./paper-card.js";
import { escapeHtml, showToast } from "../utils.js";

export function statusLabel(s) {
  return { unread: "未读", reading: "阅读中", read: "已读" }[s] || s;
}

export function statusCSS(s) {
  return `status-${s}`;
}

export class PaperList {
  constructor() {
    this.el = document.getElementById("main-content");
    this.selectMode = false;
    this.selected = new Set();
    this._bindKeyboard();
  }

  async render() {
    const filters = store.get("filters");
    store.set("loading", true);
    this.el.innerHTML = _skeletonGrid();

    try {
      const data = await api.papers.list(filters);
      store.set("papers", data.papers);
      store.set("loading", false);
      this._renderContent(data);
    } catch (e) {
      this.el.innerHTML = `<div class="empty-state"><div class="empty-icon">!</div><h3>加载失败</h3><p>${e.message}</p></div>`;
    }
  }

  _renderContent(data) {
    const view = store.get("view");
    const filters = store.get("filters");

    this.el.innerHTML = "";

    // Search bar
    const searchBar = createSearchBar((val) => {
      const f = store.get("filters");
      f.q = val;
      f.page = 1;
      store.set("filters", { ...f });
    });
    this.el.appendChild(searchBar);

    // Filter bar
    const filterBar = document.createElement("div");
    filterBar.className = "filter-bar";

    // Active tag chip
    if (filters.tag) {
      const chip = document.createElement("span");
      chip.className = "filter-chip active";
      chip.innerHTML = `标签: ${escapeHtml(filters.tag)} <span class="remove">&times;</span>`;
      chip.querySelector(".remove").addEventListener("click", () => {
        router.navigate("#/papers");
      });
      filterBar.appendChild(chip);
    }

    // Active status chip
    if (filters.status) {
      const chip = document.createElement("span");
      chip.className = "filter-chip active";
      chip.innerHTML = `${escapeHtml(statusLabel(filters.status))} <span class="remove">&times;</span>`;
      chip.querySelector(".remove").addEventListener("click", () => {
        router.navigate("#/papers");
      });
      filterBar.appendChild(chip);
    }

    // Clear all
    if (filters.tag || filters.status || filters.q) {
      const clear = document.createElement("button");
      clear.className = "btn btn-ghost btn-sm";
      clear.textContent = "清除筛选";
      clear.addEventListener("click", () => router.navigate("#/papers"));
      filterBar.appendChild(clear);
    }

    // Sort
    const sortSel = document.createElement("select");
    sortSel.className = "filter-chip";
    sortSel.innerHTML = `
      <option value="folder" ${filters.sort === 'folder' ? 'selected' : ''}>按文件夹</option>
      <option value="title" ${filters.sort === 'title' ? 'selected' : ''}>按标题</option>
      <option value="status" ${filters.sort === 'status' ? 'selected' : ''}>按状态</option>
      <option value="updated" ${filters.sort === 'updated' ? 'selected' : ''}>最近更新</option>
    `;
    sortSel.addEventListener("change", () => {
      const f = store.get("filters");
      f.sort = sortSel.value;
      f.page = 1;
      store.set("filters", { ...f });
    });
    filterBar.appendChild(sortSel);

    // View toggle
    const toggle = document.createElement("div");
    toggle.className = "view-toggle";
    toggle.innerHTML = `
      <button class="view-btn ${view === 'grid' ? 'active' : ''}" data-view="grid">▦</button>
      <button class="view-btn ${view === 'table' ? 'active' : ''}" data-view="table">☰</button>
    `;
    toggle.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        store.set("view", btn.dataset.view);
        this._renderContent(data);
      });
    });
    filterBar.appendChild(toggle);

    // Select mode toggle
    const selectToggle = document.createElement("button");
    selectToggle.className = `btn btn-ghost btn-sm ${this.selectMode ? 'active' : ''}`;
    selectToggle.style.marginLeft = "4px";
    selectToggle.textContent = this.selectMode ? "取消选择" : "选择";
    selectToggle.addEventListener("click", () => {
      this.selectMode = !this.selectMode;
      this.selected.clear();
      this._renderContent(data);
    });
    filterBar.appendChild(selectToggle);

    this.el.appendChild(filterBar);

    // Batch action bar (visible in select mode)
    if (this.selectMode) {
      this.el.appendChild(this._renderBatchBar(data));
    }

    // Results count + match breakdown
    const count = document.createElement("div");
    count.style.cssText = "font-size:0.82rem;color:var(--text-muted);margin-bottom:12px;";
    if (filters.q && data.papers.length > 0) {
      const contentMatches = data.papers.filter(p => p.match_source === "content" || p.match_source === "both").length;
      const titleMatches = data.papers.filter(p => p.match_source === "title").length;
      let parts = [`共 ${data.total} 篇`];
      if (contentMatches > 0) parts.push(`全文匹配 ${contentMatches} 篇`);
      if (titleMatches > 0) parts.push(`标题匹配 ${titleMatches} 篇`);
      count.textContent = parts.join(" · ");
    } else {
      const ftsNote = filters.q ? ` · 全文搜索` : "";
      count.textContent = `共 ${data.total} 篇论文${ftsNote}`;
    }
    this.el.appendChild(count);

    if (data.papers.length === 0) {
      this.el.appendChild(this._emptyState());
      return;
    }

    // Grid or Table
    if (view === "grid") {
      const grid = document.createElement("div");
      grid.className = "paper-grid";
      data.papers.forEach(p => {
        const card = renderPaperCard(p);
        if (this.selectMode) {
          card.classList.add("select-mode");
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.className = "card-checkbox";
          cb.checked = this.selected.has(p.id);
          cb.addEventListener("click", (e) => {
            e.stopPropagation();
            this._toggleSelect(p.id, card);
          });
          card.prepend(cb);
        }
        if (this.selected.has(p.id)) card.classList.add("selected");
        // FTS5 snippet
        if (p.snippet) {
          const snip = document.createElement("div");
          snip.style.cssText = "font-size:0.78rem;color:var(--text-dim);margin-top:4px;line-height:1.4;";
          snip.innerHTML = p.snippet;
          card.appendChild(snip);
        }
        card.addEventListener("click", (e) => {
          if (this.selectMode && (e.target.tagName === "INPUT" || e.target.closest("[data-action]"))) return;
          if (this.selectMode) {
            this._toggleSelect(p.id, card);
            return;
          }
          router.navigate(`#/papers/${p.id}`);
        });
        grid.appendChild(card);
      });
      this.el.appendChild(grid);
    } else {
      this.el.appendChild(this._renderTable(data.papers));
    }

    // Pagination
    if (data.total_pages > 1) {
      this.el.appendChild(this._renderPagination(data));
    }
  }

  _renderBatchBar(data) {
    const bar = document.createElement("div");
    bar.className = "batch-bar";

    const info = document.createElement("span");
    info.className = "selected-count";
    info.textContent = `已选 ${this.selected.size} 篇`;
    bar.appendChild(info);

    // Select all
    const allBtn = document.createElement("button");
    allBtn.className = "btn btn-ghost btn-sm";
    allBtn.textContent = this.selected.size === data.papers.length ? "取消全选" : "全选";
    allBtn.addEventListener("click", () => {
      if (this.selected.size === data.papers.length) {
        this.selected.clear();
      } else {
        data.papers.forEach(p => this.selected.add(p.id));
      }
      this._renderContent(data);
    });
    bar.appendChild(allBtn);

    // Compare button (exactly 2 selected)
    if (this.selected.size === 2) {
      const compareBtn = document.createElement("button");
      compareBtn.className = "btn btn-ghost btn-sm";
      compareBtn.style.cssText = "margin-left:8px;";
      compareBtn.textContent = "📊 对比选中";
      compareBtn.addEventListener("click", () => {
        const ids = [...this.selected];
        import("./compare.js").then(m => new m.Compare().open(ids[0], ids[1]));
      });
      bar.appendChild(compareBtn);
    }

    // Batch status
    const statusSel = document.createElement("select");
    statusSel.className = "filter-chip";
    statusSel.style.cssText = "margin-left:8px;";
    statusSel.innerHTML = `
      <option value="">标记状态...</option>
      <option value="unread">未读</option>
      <option value="reading">阅读中</option>
      <option value="read">已读</option>
    `;
    statusSel.addEventListener("change", async () => {
      if (!statusSel.value) return;
      const ids = [...this.selected];
      try {
        await api.papers.batchStatus(ids, statusSel.value);
        showToast(`已更新 ${ids.length} 篇论文状态`, "success");
        this.selected.clear();
        this.selectMode = false;
        this.render();
      } catch (err) { showToast(err.message, "error"); }
    });
    bar.appendChild(statusSel);

    // Batch tag
    const tags = store.get("tags") || [];
    if (tags.length > 0) {
      const tagSel = document.createElement("select");
      tagSel.className = "filter-chip";
      tagSel.innerHTML = '<option value="">添加标签...</option>' +
        tags.map(t => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join("");
      tagSel.addEventListener("change", async () => {
        if (!tagSel.value) return;
        const ids = [...this.selected];
        try {
          const result = await api.papers.batchTag(ids, parseInt(tagSel.value));
          showToast(`已为 ${result.added} 篇论文添加标签`, "success");
          this.selected.clear();
          this.selectMode = false;
          this.render();
        } catch (err) { showToast(err.message, "error"); }
      });
      bar.appendChild(tagSel);
    }

    // Batch delete
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-danger btn-sm";
    delBtn.style.cssText = "margin-left:auto;";
    delBtn.textContent = `删除 ${this.selected.size} 篇`;
    delBtn.addEventListener("click", async () => {
      const ids = [...this.selected];
      if (!confirm(`确认删除 ${ids.length} 篇论文？此操作不可恢复。`)) return;
      try {
        await api.papers.batchDelete(ids);
        showToast(`已删除 ${ids.length} 篇论文`, "success");
        this.selected.clear();
        this.selectMode = false;
        this.render();
      } catch (err) { showToast(err.message, "error"); }
    });
    bar.appendChild(delBtn);

    return bar;
  }

  _toggleSelect(paperId, cardEl) {
    if (this.selected.has(paperId)) {
      this.selected.delete(paperId);
      cardEl?.classList.remove("selected");
    } else {
      this.selected.add(paperId);
      cardEl?.classList.add("selected");
    }
    // Update batch bar
    const bar = this.el.querySelector(".batch-bar");
    if (bar) {
      bar.querySelector(".selected-count").textContent = `已选 ${this.selected.size} 篇`;
    }
  }

  _bindKeyboard() {
    document.addEventListener("keydown", (e) => {
      // ESC — close detail panel
      if (e.key === "Escape") {
        const overlay = document.getElementById("detail-overlay");
        if (overlay && !overlay.classList.contains("hidden")) {
          overlay.classList.remove("open");
          setTimeout(() => overlay.classList.add("hidden"), 250);
          router.navigate("#/papers");
          return;
        }
      }

      // Arrow keys — navigate between papers when detail is open
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const overlay = document.getElementById("detail-overlay");
        if (!overlay || overlay.classList.contains("hidden")) return;
        // Don't navigate if user is typing in an input
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

        e.preventDefault();
        const papers = store.get("papers");
        if (!papers || papers.length === 0) return;

        const hash = window.location.hash;
        const currentId = parseInt(hash.match(/\/papers\/(\d+)/)?.[1]);
        const currentIdx = papers.findIndex(p => p.id === currentId);
        if (currentIdx === -1) return;

        const nextIdx = e.key === "ArrowRight"
          ? Math.min(currentIdx + 1, papers.length - 1)
          : Math.max(currentIdx - 1, 0);

        if (nextIdx !== currentIdx) {
          router.navigate(`#/papers/${papers[nextIdx].id}`);
        }
      }
    });
  }

  _renderTable(papers) {
    const table = document.createElement("table");
    table.className = "paper-table";

    const selectHeader = this.selectMode ? '<th class="batch-select-cell"><input type="checkbox" id="select-all-checkbox"></th>' : '';
    table.innerHTML = `
      <thead>
        <tr>
          ${selectHeader}
          <th>标题</th><th>文件夹</th><th>作者/年份</th><th>状态</th><th>MD</th><th>分析</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");

    // Select-all handler
    if (this.selectMode) {
      table.querySelector("#select-all-checkbox")?.addEventListener("change", (e) => {
        if (e.target.checked) {
          papers.forEach(p => this.selected.add(p.id));
        } else {
          this.selected.clear();
        }
        this._renderContent({ papers, total: papers.length, page: 1, per_page: 50, total_pages: 1 });
      });
    }

    papers.forEach(p => {
      const tr = document.createElement("tr");
      if (this.selected.has(p.id)) tr.style.background = "var(--accent-bg)";

      const selectCell = this.selectMode
        ? `<td class="batch-select-cell"><input type="checkbox" ${this.selected.has(p.id) ? 'checked' : ''}></td>`
        : '';

      tr.innerHTML = `
        ${selectCell}
        <td>
          <strong>${escapeHtml(p.title)}</strong>
          ${p.title_cn ? `<div style="font-size:0.78rem;color:var(--accent);">${escapeHtml(p.title_cn)}</div>` : ''}
          ${p.snippet ? `<div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px;">${p.snippet}</div>` : ''}
        </td>
        <td style="color:var(--text-dim);font-size:0.82rem;">${escapeHtml(p.folder_name)}</td>
        <td style="font-size:0.8rem;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;">
          ${[p.authors, p.venue, p.year ? String(p.year) : ''].filter(Boolean).join(' · ') || '—'}
        </td>
        <td><span class="status-badge ${statusCSS(p.reading_status)}">${escapeHtml(statusLabel(p.reading_status))}</span></td>
        <td style="text-align:center;"><span class="indicator-dot-cell ${p.has_md ? 'on' : ''}" title="${p.has_md ? '有 MD 文件' : '无 MD 文件'}"></span></td>
        <td style="text-align:center;"><span class="indicator-dot-cell ${p.has_paper_analysis ? 'on' : ''}" title="${p.has_paper_analysis ? '有分析报告' : '无分析报告'}"></span></td>
      `;

      if (this.selectMode) {
        tr.querySelector("input")?.addEventListener("click", (e) => {
          e.stopPropagation();
          this._toggleSelect(p.id);
          tr.style.background = this.selected.has(p.id) ? "var(--accent-bg)" : "";
        });
      }

      tr.addEventListener("click", () => {
        if (this.selectMode) {
          this._toggleSelect(p.id);
          tr.style.background = this.selected.has(p.id) ? "var(--accent-bg)" : "";
          return;
        }
        router.navigate(`#/papers/${p.id}`);
      });
      tbody.appendChild(tr);
    });
    return table;
  }

  _renderPagination(data) {
    const filters = store.get("filters");
    const container = document.createElement("div");
    container.className = "pagination";

    const total = data.total_pages;
    const current = data.page;
    if (total <= 1) return container;

    const addBtn = (label, page, disabled = false) => {
      const btn = document.createElement("button");
      btn.className = `page-btn ${page === current ? 'active' : ''}`;
      btn.textContent = label;
      btn.disabled = disabled;
      if (!disabled) {
        btn.addEventListener("click", () => {
          const f = store.get("filters");
          f.page = page;
          store.set("filters", { ...f });
        });
      }
      container.appendChild(btn);
    };

    addBtn("← 上一页", current - 1, current <= 1);

    const pages = [];
    const range = 2;
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - range && i <= current + range)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    pages.forEach(p => {
      if (p === "...") {
        const span = document.createElement("span");
        span.textContent = "...";
        span.style.cssText = "padding:0 4px;color:var(--text-muted);";
        container.appendChild(span);
      } else {
        addBtn(String(p), p);
      }
    });

    addBtn("下一页 →", current + 1, current >= total);
    return container;
  }

  _emptyState() {
    const div = document.createElement("div");
    div.className = "empty-state";
    div.innerHTML = `
      <div class="empty-icon">📄</div>
      <h3>没有找到论文</h3>
      <p>尝试修改搜索条件或清除筛选</p>
    `;
    return div;
  }
}

function _skeletonGrid() {
  const cards = Array(6).fill(`
    <div class="skeleton-card">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line wide"></div>
      <div class="skeleton-line med"></div>
      <div class="skeleton-line short"></div>
    </div>
  `).join("");
  return `<div class="skeleton-grid">${cards}</div>`;
}
