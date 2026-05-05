/**
 * Search bar with debounced input.
 */

import { debounce } from "../utils.js";

import { store } from "../state.js";

export function createSearchBar(onSearch) {
  const container = document.createElement("div");
  container.className = "search-bar";
  const filters = store.get("filters");
  container.innerHTML = `
    <span class="search-icon">&#x1F50D;</span>
    <input type="text" id="search-input" placeholder="搜索标题、文件名或全文内容..." autocomplete="off" value="${(filters.q || '').replace(/"/g, '&quot;')}">
    <span class="search-scope">全文搜索</span>
  `;

  const input = container.querySelector("#search-input");
  const scope = container.querySelector(".search-scope");
  const debouncedSearch = debounce((val) => {
    scope.style.display = val ? "inline-block" : "none";
    onSearch(val);
  }, 350);
  input.addEventListener("input", () => debouncedSearch(input.value));

  // Initialize scope visibility
  scope.style.display = filters.q ? "inline-block" : "none";

  return container;
}
