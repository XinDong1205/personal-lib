/**
 * App entry point — wires router, state, and components together.
 */

import { router } from "./router.js";
import { store } from "./state.js";
import { api } from "./api.js";
import { Header } from "./components/header.js";
import { Sidebar } from "./components/sidebar.js";
import { PaperList } from "./components/paper-list.js";
import { PaperDetail } from "./components/paper-detail.js";

const header = new Header();
const sidebar = new Sidebar();
const paperList = new PaperList();
const paperDetail = new PaperDetail();

async function init() {
  // Theme initialization (for first visit without saved preference)
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.dataset.theme = saved;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.dataset.theme = "dark";
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.dataset.theme = e.matches ? "dark" : "light";
      const btn = document.getElementById("theme-toggle");
      if (btn) btn.textContent = e.matches ? "☀️" : "🌙";
    }
  });

  header.render();
  sidebar.render();

  // Load initial data
  try {
    const [stats, tags] = await Promise.all([api.stats(), api.tags.list()]);
    store.set("stats", stats);
    store.set("tags", tags);
    header.updateStats(stats);
    sidebar.updateTags(tags);
  } catch (e) {
    console.warn("Failed to load initial data:", e);
  }
}

// Routes
router
  .on("/papers", (ctx) => {
    const hasParams = Object.keys(ctx.params).length > 0;
    const base = hasParams ? store.get("filters") : { sort: "folder" };
    store.set("filters", { ...base, ...ctx.params, page: parseInt(ctx.params.page) || 1 });
    paperList.render();
  })
  .on("/papers/:id", (ctx) => {
    paperDetail.open(parseInt(ctx.id), ctx.params.tab);
  })
  .on("/tags", () => {
    import("./components/tag-manager.js").then(m => new m.TagManager().render());
  })
  .on("/dashboard", () => {
    import("./components/dashboard.js").then(m => new m.Dashboard().render());
  })
  .on("/graph", () => {
    import("./components/graph.js").then(m => new m.Graph().render());
  });

// Listen for filter changes from sidebar
store.on("filters", () => {
  paperList.render();
});

// Keyboard shortcuts
function initShortcuts() {
  const shortcuts = [
    ["← →", "上一篇 / 下一篇论文"],
    ["Esc", "关闭详情面板"],
    ["Space", "切换阅读状态"],
    ["? / Shift+?", "打开 / 关闭此面板"],
    ["/", "聚焦搜索框"],
    ["G P", "跳转到全部论文"],
    ["G T", "跳转到标签管理"],
  ];

  const overlay = document.createElement("div");
  overlay.id = "shortcuts-overlay";
  overlay.className = "shortcuts-overlay hidden";
  overlay.innerHTML = `
    <div class="shortcuts-modal">
      <div class="shortcuts-header">
        <h3>⌨️ 快捷键</h3>
        <button class="shortcuts-close">&times;</button>
      </div>
      <div class="shortcuts-body">
        ${shortcuts.map(([key, desc]) => `
          <div class="shortcut-row">
            <kbd>${key}</kbd>
            <span>${desc}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".shortcuts-close").addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    // Don't trigger when typing in inputs
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
      // But do handle "?" shortcuts globally
      if (e.key === "?" && !e.shiftKey) {
        e.preventDefault();
        overlay.classList.toggle("hidden");
      }
      return;
    }

    if ((e.key === "?" || e.key === "/") && e.shiftKey) {
      e.preventDefault();
      overlay.classList.toggle("hidden");
      return;
    }

    if (e.key === "/" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const input = document.querySelector(".search-bar input");
      if (input) input.focus();
      return;
    }

    if (e.key === "g" && !e.ctrlKey && !e.metaKey) {
      // Wait for second key
      const handler = (e2) => {
        document.removeEventListener("keydown", handler);
        if (e2.key === "p" || e2.key === "P") {
          router.navigate("#/papers");
        } else if (e2.key === "t" || e2.key === "T") {
          router.navigate("#/tags");
        }
      };
      document.addEventListener("keydown", handler);
      setTimeout(() => document.removeEventListener("keydown", handler), 1000);
      return;
    }

    // Space: cycle reading status when detail is open
    if (e.key === " " || e.code === "Space") {
      const overlay = document.getElementById("detail-overlay");
      if (overlay && !overlay.classList.contains("hidden")) {
        e.preventDefault();
        const sel = document.getElementById("status-select");
        if (sel) {
          const next = { unread: "reading", reading: "read", read: "unread" };
          sel.value = next[sel.value] || "unread";
          sel.dispatchEvent(new Event("change"));
        }
      }
    }
  });
}

// Start
init().then(() => {
  initShortcuts();
  router.start();
});
