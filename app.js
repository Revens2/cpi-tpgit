/**
 * TaskManager CPI — app.js (LOT #03)
 * Issue #03 : Formulaire d'ajout d'une tâche
 *
 * Ce lot ajoute : soumission du formulaire, validation du titre,
 * création d'une tâche et rafraîchissement de la liste.
 */
'use strict';

let tasks = [];
let editingId = null;
let currentFilter = 'all';

const STORAGE_KEY     = 'taskmanager-cpi-v1';
const STATUS_LABELS   = { todo: 'À faire', inprogress: 'En cours', done: 'Terminé' };
const PRIORITY_LABELS = { low: 'Basse', medium: 'Moyenne', high: 'Haute' };

function genId() { return 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,6); }
function escHtml(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function saveTasks() {}
function loadTasks() {}

function updateStats() {
  document.getElementById('count-todo').textContent       = tasks.length;
  document.getElementById('count-inprogress').textContent = tasks.length;
  document.getElementById('count-done').textContent       = tasks.length;
}

function render() {
  const list = document.getElementById('task-list');
  const emptyMsg = document.getElementById('empty-msg');
  const filtered = currentFilter === 'all' ? tasks : tasks.filter(t => t.status === currentFilter);
  list.innerHTML = '';
  if (filtered.length === 0) { emptyMsg.classList.remove('hidden'); updateStats(); return; }
  emptyMsg.classList.add('hidden');
  filtered.forEach(task => {
    const card = document.createElement('article');
    card.className = `task-card status-${task.status}`;
    card.dataset.id = task.id;
    card.innerHTML = `
      <div class="task-body">
        <div class="task-title">${escHtml(task.title)}</div>
        ${task.description ? `<div class="task-desc">${escHtml(task.description)}</div>` : ''}
        <div class="task-meta">
          <span class="badge badge-${task.status}">${STATUS_LABELS[task.status]}</span>
          <span class="badge">${PRIORITY_LABELS[task.priority]}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-edit">Modifier</button>
        <button class="btn-delete">Supprimer</button>
      </div>`;
    card.querySelector('.btn-edit').addEventListener('click',   () => openEdit(task.id));
    card.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));
    list.appendChild(card);
  });
  updateStats();
}

// Non implémentés (lots suivants)
document.getElementById('task-form').addEventListener('submit', e => { e.preventDefault(); });
function deleteTask(id) { alert('Suppression non encore implémentée (lot #05)'); }
function openEdit(id)   { alert('Modification non encore implémentée (lot #04)'); }
document.getElementById('save-edit').addEventListener('click', () => {});
document.getElementById('cancel-edit').addEventListener('click', closeModal);
document.getElementById('edit-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() { document.getElementById('edit-modal').classList.add('hidden'); editingId = null; }
document.querySelectorAll('.filter-btn').forEach(btn => { btn.addEventListener('click', () => {}); });

loadTasks(); render();
