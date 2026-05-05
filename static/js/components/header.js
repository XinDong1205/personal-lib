/**
 * Header component — brand and stats.
 */

export class Header {
  constructor() {
    this.el = document.getElementById("app-header");
  }

  render() {
    const currentTheme = document.documentElement.dataset.theme || "light";
    const themeIcon = currentTheme === "dark" ? "☀️" : "🌙";
    this.el.innerHTML = `
      <div class="header-brand">个人<span>图书馆</span></div>
      <div style="display:flex;align-items:center;gap:16px;">
        <button id="theme-toggle" class="theme-toggle" title="切换深色/浅色模式">${themeIcon}</button>
        <div class="header-stats">
          <span>共 <strong id="stat-total">-</strong> 篇</span>
          <span>未读 <strong id="stat-unread">-</strong></span>
          <span>阅读中 <strong id="stat-reading">-</strong></span>
          <span>已读 <strong id="stat-read">-</strong></span>
        </div>
      </div>
    `;

    document.getElementById("theme-toggle").addEventListener("click", () => {
      const current = document.documentElement.dataset.theme;
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      document.getElementById("theme-toggle").textContent = next === "dark" ? "☀️" : "🌙";
    });
  }

  updateStats(stats) {
    if (!stats) return;
    document.getElementById("stat-total").textContent = stats.total_papers;
    document.getElementById("stat-unread").textContent = stats.unread;
    document.getElementById("stat-reading").textContent = stats.reading;
    document.getElementById("stat-read").textContent = stats.read;
  }
}
