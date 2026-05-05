/**
 * API client wrapper for all REST endpoints.
 */

const BASE = "/api/v1";

async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Papers
  papers: {
    list: (params = {}) => {
      const qs = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== "" && v != null)
      ).toString();
      return request(`/papers${qs ? "?" + qs : ""}`);
    },
    get: (id) => request(`/papers/${id}`),
    update: (id, data) => request(`/papers/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id) => request(`/papers/${id}`, { method: "DELETE" }),
    content: (id) => request(`/papers/${id}/content`),
    metadata: (id) => request(`/papers/${id}/metadata`),
    analysisFiles: (id) => request(`/papers/${id}/analysis-files`),
    refreshMetadata: (id) => request(`/papers/${id}/metadata/refresh`, { method: "POST" }),
    related: (id) => request(`/papers/${id}/related`),
    references: (id) => request(`/papers/${id}/references`),
    // Batch operations
    batchStatus: (paperIds, readingStatus) =>
      request("/papers/batch/status", { method: "POST", body: JSON.stringify({ paper_ids: paperIds, reading_status: readingStatus }) }),
    batchTag: (paperIds, tagId) =>
      request("/papers/batch/tags", { method: "POST", body: JSON.stringify({ paper_ids: paperIds, tag_id: tagId }) }),
    batchDelete: (paperIds) =>
      request("/papers/batch/delete", { method: "POST", body: JSON.stringify({ paper_ids: paperIds }) }),
  },

  // Search
  search: (q, page = 1) => request(`/search?q=${encodeURIComponent(q)}&page=${page}`),

  // Tags
  tags: {
    list: () => request("/tags"),
    create: (data) => request("/tags", { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) => request(`/tags/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id) => request(`/tags/${id}`, { method: "DELETE" }),
    addToPaper: (paperId, tagId) =>
      request(`/papers/${paperId}/tags`, { method: "POST", body: JSON.stringify({ tag_id: tagId }) }),
    removeFromPaper: (paperId, tagId) =>
      request(`/papers/${paperId}/tags/${tagId}`, { method: "DELETE" }),
  },

  // Notes
  notes: {
    list: (paperId) => request(`/papers/${paperId}/notes`),
    create: (paperId, content) =>
      request(`/papers/${paperId}/notes`, { method: "POST", body: JSON.stringify({ content }) }),
    update: (id, content) =>
      request(`/notes/${id}`, { method: "PATCH", body: JSON.stringify({ content }) }),
    delete: (id) => request(`/notes/${id}`, { method: "DELETE" }),
  },

  // AI
  ai: {
    analyze: (paperId) =>
      request(`/papers/${paperId}/analyze`, { method: "POST" }),
    analyzeStatus: (paperId) =>
      request(`/papers/${paperId}/analyze/status`),
    chat: (paperId) =>
      request(`/papers/${paperId}/chat`, { method: "POST" }),
    chatSend: (paperId, message, history) =>
      request(`/papers/${paperId}/chat/send`, {
        method: "POST",
        body: JSON.stringify({ message, history }),
      }),
  },

  // Admin
  scan: () => request("/scan", { method: "POST" }),
  initialize: () => request("/initialize", { method: "POST" }),
  stats: () => request("/stats"),
  statsExtended: () => request("/stats/extended"),
  graph: () => request("/graph"),

  // Settings
  settings: {
    list: () => request("/settings"),
    update: (key, value) => request(`/settings/${key}`, { method: "PATCH", body: JSON.stringify({ value }) }),
  },
};
