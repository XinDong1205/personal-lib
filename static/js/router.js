/**
 * Hash-based SPA router.
 */

import { escapeHtml, parseQuery } from "./utils.js";

class Router {
  constructor() {
    this._routes = [];
    window.addEventListener("hashchange", () => this._handle());
  }

  on(pattern, handler) {
    this._routes.push({ pattern, handler });
    return this;
  }

  navigate(hash) {
    window.location.hash = hash;
  }

  start() {
    if (!window.location.hash) {
      window.location.hash = "#/papers";
    } else {
      this._handle();
    }
  }

  _handle() {
    const hash = window.location.hash.slice(1) || "/papers";
    const [path] = hash.split("?");
    const params = parseQuery(hash);

    for (const { pattern, handler } of this._routes) {
      const match = this._match(pattern, path);
      if (match) {
        handler({ params, ...match });
        return;
      }
    }

    // 404 fallback
    const main = document.getElementById("main-content");
    if (main) {
      main.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>页面未找到</h3><p>路由 ${escapeHtml(path)} 不存在</p></div>`;
    }
  }

  _match(pattern, path) {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");

    if (patternParts.length !== pathParts.length) return null;

    const result = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":")) {
        result[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return result;
  }
}

export const router = new Router();
