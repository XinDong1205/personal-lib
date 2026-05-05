/**
 * Utility functions.
 */

export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "Z");
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("zh-CN", {
      year: "numeric", month: "2-digit", day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export function parseQuery(hash) {
  const q = hash.includes("?") ? hash.split("?")[1] : "";
  const params = {};
  for (const [k, v] of new URLSearchParams(q)) {
    params[k] = v;
  }
  return params;
}

export function cleanSubtitle(title, titleCn) {
  if (!titleCn) return "";
  if (titleCn.startsWith(title)) {
    const rest = titleCn.slice(title.length).trim();
    const m = rest.match(/^\s*\(([^)]+)\)\s*$/);
    if (m) return m[1];
    if (rest) return rest;
    return "";
  }
  return titleCn;
}

export function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => { el.remove(); }, 3000);
}
