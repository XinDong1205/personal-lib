/**
 * Sidebar — navigation and tag list.
 */

import { store } from "../state.js";
import { router } from "../router.js";
import { escapeHtml } from "../utils.js";

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export class Sidebar {
  constructor() {
    this.el = document.getElementById("sidebar");
  }

  render() {
    const stats = store.get("stats") || {};
    this.el.innerHTML = `
      <div class="sidebar-section">
        <div class="sidebar-label">导航</div>
        <div class="nav-item active" data-route="/papers">
          <span class="nav-dot dot-unread"></span> 全部论文
          <span class="nav-count">${stats.total_papers ?? '…'}</span>
        </div>
        <div class="nav-item" data-route="/papers?status=unread">
          <span class="nav-dot dot-unread"></span> 未读
          <span class="nav-count">${stats.unread ?? '…'}</span>
        </div>
        <div class="nav-item" data-route="/papers?status=reading">
          <span class="nav-dot dot-reading"></span> 阅读中
          <span class="nav-count">${stats.reading ?? '…'}</span>
        </div>
        <div class="nav-item" data-route="/papers?status=read">
          <span class="nav-dot dot-read"></span> 已读
          <span class="nav-count">${stats.read ?? '…'}</span>
        </div>
        <div class="nav-item" data-route="/dashboard">
          <span class="nav-dot" style="background:#d48a30;"></span> 📊 仪表盘
          <span class="nav-count"></span>
        </div>
        <div class="nav-item" data-route="/graph">
          <span class="nav-dot" style="background:#7b4b8a;"></span> 🕸️ 关联网络
          <span class="nav-count"></span>
        </div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-label">标签</div>
        <div id="sidebar-tags"></div>
        <button class="tag-add-btn" id="btn-add-tag">+ 新建标签</button>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-label">工具</div>
        <button class="tag-add-btn" id="btn-scan" style="margin-bottom:6px;">🔄 重新扫描</button>
        <button class="tag-add-btn" id="btn-init-papers" style="border-color:var(--accent);color:var(--accent);">📥 初始化新论文</button>
      </div>
    `;

    this._bindEvents();
    this._updateActiveNav();
  }

  _bindEvents() {
    this.el.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const route = item.dataset.route;
        router.navigate(`#${route}`);
      });
    });

    document.getElementById("btn-scan").addEventListener("click", async () => {
      const btn = document.getElementById("btn-scan");
      btn.textContent = "⏳ 扫描中...";
      btn.disabled = true;
      try {
        const { api } = await import("../api.js");
        const { showToast } = await import("../utils.js");
        const result = await api.scan();
        showToast(`扫描完成: 新增 ${result.added}, 更新 ${result.updated}, 移除 ${result.removed}`, "success");
        // Refresh stats and tags
        const { api: api2 } = await import("../api.js");
        const [stats, tags] = await Promise.all([api2.stats(), api2.tags.list()]);
        store.set("stats", stats);
        store.set("tags", tags);
        this.updateTags(tags);
      } catch (err) {
        const { showToast } = await import("../utils.js");
        showToast("扫描失败: " + err.message, "error");
      } finally {
        btn.textContent = "🔄 重新扫描";
        btn.disabled = false;
      }
    });

    document.getElementById("btn-add-tag").addEventListener("click", () => {
      const name = prompt("输入标签名称:");
      if (!name || !name.trim()) return;
      import("../api.js").then(({ api }) => {
        api.tags.create({ name: name.trim() }).then(() => {
          return api.tags.list();
        }).then(tags => {
          store.set("tags", tags);
          this.updateTags(tags);
        });
      });
    });

    document.getElementById("btn-init-papers").addEventListener("click", async () => {
      const btn = document.getElementById("btn-init-papers");
      if (!confirm("将扫描根目录下散落的 PDF 文件，自动翻译文件名、创建中文文件夹并生成 MD。是否继续？")) return;
      btn.textContent = "⏳ 处理中...";
      btn.disabled = true;
      try {
        const { api } = await import("../api.js");
        const { showToast } = await import("../utils.js");
        const result = await api.initialize();
        const ok = result.results.filter(r => r.status === "ok").length;
        const skipped = result.results.filter(r => r.status === "skipped").length;
        const errors = result.results.filter(r => r.status === "error").length;
        showToast(`初始化完成: ${ok} 个成功, ${skipped} 个跳过, ${errors} 个失败`, ok > 0 ? "success" : "info");
        if (ok > 0) {
          // Refresh stats and papers
          const { api: api2 } = await import("../api.js");
          const [stats, tags] = await Promise.all([api2.stats(), api2.tags.list()]);
          store.set("stats", stats);
          store.set("tags", tags);
          this.updateTags(tags);
        }
      } catch (err) {
        const { showToast } = await import("../utils.js");
        showToast("初始化失败: " + err.message, "error");
      } finally {
        btn.textContent = "📥 初始化新论文";
        btn.disabled = false;
      }
    });
  }

  updateTags(tags) {
    const container = document.getElementById("sidebar-tags");
    if (!container) return;

    const activeTag = store.get("filters").tag || "";

    container.innerHTML = tags.map(t => `
      <div class="tag-item ${activeTag === t.name ? 'active' : ''}" data-tag="${escapeHtml(t.name)}">
        <span class="tag-swatch" style="background:${HEX_COLOR.test(t.color) ? t.color : '#5e81ac'}"></span>
        ${escapeHtml(t.name)}
        <span class="tag-count">${t.paper_count}</span>
      </div>
    `).join("");

    container.querySelectorAll(".tag-item").forEach(item => {
      item.addEventListener("click", () => {
        const tagName = item.dataset.tag;
        const current = store.get("filters").tag;
        if (current === tagName) {
          router.navigate("#/papers");
        } else {
          router.navigate(`#/papers?tag=${encodeURIComponent(tagName)}`);
        }
      });
    });
  }

  _updateActiveNav() {
    const hash = window.location.hash;
    this.el.querySelectorAll(".nav-item").forEach(item => {
      const route = item.dataset.route;
      item.classList.toggle("active", hash === route || hash.startsWith(route.split("?")[0]));
    });
  }
}
