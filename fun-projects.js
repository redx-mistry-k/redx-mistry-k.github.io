'use strict';
const controls = document.querySelector('.directory-controls');
const search = document.querySelector('#tool-search');
const buttons = [...document.querySelectorAll('.directory-filters button')];
const entries = [...document.querySelectorAll('.tool-entry')];
const empty = document.querySelector('.empty-results');
const status = document.querySelector('#results-status');
let category = 'all';
function updateDirectory() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  entries.forEach(entry => {
    const visible = (category === 'all' || entry.dataset.category === category) && entry.textContent.toLowerCase().includes(query);
    entry.hidden = !visible;
    if (visible) count++;
  });
  buttons.forEach(button => {
    const active = button.dataset.filter === category;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('active', active);
  });
  status.textContent = `${count} of ${entries.length} projects shown`;
  empty.hidden = count !== 0;
  document.querySelectorAll('.tool-group').forEach(group => {
    const groupEntries = [...group.querySelectorAll('.tool-entry')];
    const visible = groupEntries.filter(entry => !entry.hidden).length;
    group.hidden = visible === 0;
    const label = group.querySelector('.group-heading .eyebrow');
    const number = label.textContent.split(' / ')[0];
    const countLabel = visible === groupEntries.length ? String(visible) : `${visible} of ${groupEntries.length}`;
    label.textContent = `${number} / ${countLabel} tools`;
  });
}
controls.hidden = false;
updateDirectory();
buttons.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  updateDirectory();
}));
search.addEventListener('input', updateDirectory);
document.querySelector('#reset-search').addEventListener('click', () => {
  category = 'all';
  search.value = '';
  updateDirectory();
  search.focus();
});
