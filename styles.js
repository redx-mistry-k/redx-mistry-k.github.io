'use strict';
document.body.classList.add('js-ready');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
menu.hidden = false;
function closeMenu(returnFocus = false) {
  links.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  links.classList.toggle('open', expanded);
});
links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && links.classList.contains('open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('nav')) closeMenu();
});
const wideScreen = matchMedia('(min-width: 761px)');
wideScreen.addEventListener('change', () => closeMenu());
const filters = document.querySelector('.filters');
filters.hidden = false;
const projects = [...document.querySelectorAll('.project')];
filters.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    filters.querySelectorAll('button').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach(project => {
      const visible = button.dataset.filter === 'all' || project.dataset.category.split(' ').includes(button.dataset.filter);
      project.hidden = !visible;
      if (visible) count++;
    });
    document.querySelector('#filter-status').textContent = `${count} project${count === 1 ? '' : 's'} shown.`;
  });
});
// Restore the booking case study when reached from the hero after filtering.
document.querySelector('.feature > a').addEventListener('click', () => {
  filters.querySelector('[data-filter="all"]').click();
});
document.querySelector('#year').textContent = new Date().getFullYear();
