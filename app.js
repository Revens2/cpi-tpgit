/**
 * TaskManager CPI — app.js (LOT #02)
 * Issue #02 : Affichage de la liste des tâches
 *
 * Ce lot ajoute : render() avec affichage des cartes de tâches.
 * Données de démonstration incluses pour valider l'affichage.
 */
'use strict';

let tasks = [
  { id:'demo1', title:'Initialisation du dépôt Git', description:'Créer le dépôt et pousser le starter', status:'done', priority:'high', createdAt: new Date().toISOString() },
  { id:'demo2', title:'Affichage de la liste', description:'Implémentation du rendu des cartes', status:'inprogress', priority:'medium', createdAt: new Date().toISOString() },
  { id:'demo3', title:'Formulaire d\'ajout', description:'À venir — lot #03', status:'todo', priority:'low', createdAt: new Date().toISOString() },
];
let editingId = null;
let currentFilter = 'all';

const STORAGE_KEY     = 'taskmanager-cpi-v1';
const STATUS_LABELS   = { todo: 'À faire', inprogress: 'En cours', done: 'Terminé' };
const PRIORITY_LABELS = { low: 'Basse', medium: 'Moyenne', high: 'Haute' };

function genId() { return 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,6); }
function escHtml(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function saveTasks() {}
function loadTasks() {}

// ── Issue #02 : updateStats (partielle — comptage simple) ──────────
function updateStats() {
  document.getElementById('count-todo').textContent       = tasks.length;
  document.getElementById('count-inprogress').textContent = tasks.length;
  document.getElementById('count-done').textContent       = tasks.length;
}

// ── Issue #02 : render() ──────────────────────────────────────────
function render() {
  const list     = document.getElementById('task-list');
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
function openEdit(id) { alert('Modification non encore implémentée (lot #04)'); }
document.getElementById('save-edit').addEventListener('click', () => {});
document.getElementById('cancel-edit').addEventListener('click', closeModal);
document.getElementById('edit-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() { document.getElementById('edit-modal').classList.add('hidden'); editingId = null; }
document.querySelectorAll('.filter-btn').forEach(btn => { btn.addEventListener('click', () => {}); });

loadTasks(); render();
