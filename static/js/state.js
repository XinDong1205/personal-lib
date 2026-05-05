/**
 * Simple reactive state store with pub/sub.
 */

class Store {
  constructor() {
    this._state = {
      papers: [],
      tags: [],
      stats: null,
      currentPaper: null,
      view: "grid",  // "grid" | "list"
      filters: { q: "", tag: "", status: "", page: 1, per_page: 50, sort: "folder" },
      loading: false,
    };
    this._listeners = {};
  }

  get(key) {
    return this._state[key];
  }

  set(key, value) {
    this._state[key] = value;
    this._notify(key, value);
  }

  on(key, fn) {
    if (!this._listeners[key]) this._listeners[key] = [];
    this._listeners[key].push(fn);
    return () => {
      this._listeners[key] = this._listeners[key].filter(f => f !== fn);
    };
  }

  _notify(key, value) {
    (this._listeners[key] || []).forEach(fn => fn(value));
    (this._listeners["*"] || []).forEach(fn => fn(key, value));
  }
}

export const store = new Store();
