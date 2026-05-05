/**
 * Tag management page.
 */

import { api } from "../api.js";
import { store } from "../state.js";
import { escapeHtml, showToast } from "../utils.js";

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export class TagManager {
  constructor() {
    this.el = document.getElementById("main-content");
  }

  async render() {
    const tags = store.get("tags") || [];
    this.el.innerHTML = `
      <h2 style="font-family:Georgia,serif;font-size:1.3rem;margin-bottom:16px;">标签管理</h2>
      <div class="search-bar" style="margin-bottom:16px;">
        <input type="text" id="new-tag-name" placeholder="输入新标签名称..." autocomplete="off">
        <input type="color" id="new-tag-color" value="#5e81ac" style="width:32px;height:32px;border:none;cursor:pointer;">
        <button class="btn btn-primary btn-sm" id="btn-create-tag">创建</button>
      </div>
      <div id="tag-list">
        ${tags.length === 0 ? '<div class="empty-state"><h3>暂无标签</h3></div>' : ''}
        <table class="paper-table">
          <thead><tr><th>颜色</th><th>名称</th><th>论文数</th><th>操作</th></tr></thead>
          <tbody>
            ${tags.map(t => `
              <tr>
                <td><span class="tag-swatch" style="background:${HEX_COLOR.test(t.color) ? t.color : '#5e81ac'};display:inline-block;width:16px;height:16px;border-radius:3px;"></span></td>
                <td>${escapeHtml(t.name)}</td>
                <td>${t.paper_count}</td>
                <td>
                  <button class="btn btn-ghost btn-sm edit-tag" data-id="${t.id}" data-name="${escapeHtml(t.name)}" data-color="${HEX_COLOR.test(t.color) ? t.color : '#5e81ac'}">编辑</button>
                  <button class="btn btn-danger btn-sm delete-tag" data-id="${t.id}" data-name="${escapeHtml(t.name)}">删除</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById("btn-create-tag").addEventListener("click", async () => {
      const name = document.getElementById("new-tag-name").value.trim();
      const color = document.getElementById("new-tag-color").value;
      if (!name) return;
      try {
        await api.tags.create({ name, color });
        const tags = await api.tags.list();
        store.set("tags", tags);
        showToast(`标签 "${name}" 已创建`, "success");
        this.render();
      } catch (err) { showToast(err.message, "error"); }
    });

    this.el.querySelectorAll(".edit-tag").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = prompt("新名称:", btn.dataset.name);
        if (!name || !name.trim()) return;
        const color = prompt("新颜色 (十六进制):", btn.dataset.color);
        api.tags.update(parseInt(btn.dataset.id), {
          name: name.trim(),
          color: color || undefined,
        }).then(() => api.tags.list()).then(tags => {
          store.set("tags", tags);
          showToast("标签已更新", "success");
          this.render();
        }).catch(err => showToast(err.message, "error"));
      });
    });

    this.el.querySelectorAll(".delete-tag").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm(`确认删除标签 "${btn.dataset.name}"？`)) return;
        try {
          await api.tags.delete(parseInt(btn.dataset.id));
          const tags = await api.tags.list();
          store.set("tags", tags);
          showToast("标签已删除", "info");
          this.render();
        } catch (err) { showToast(err.message, "error"); }
      });
    });
  }
}
