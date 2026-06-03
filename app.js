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

// Rendu — non implémenté (lot #02)
function render() {
  document.getElementById('empty-msg').classList.remove('hidden');
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
