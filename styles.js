'use strict';

document.body.classList.add('js-ready');

const menu = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

if (menu && navLinks) {
  menu.hidden = false;

  function updateMenuLabel(open) {
    menu.replaceChildren(document.createTextNode(open ? 'Close ' : 'Menu '));
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = open ? '×' : '+';
    menu.append(icon);
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }
  updateMenuLabel(false);

  function closeMenu(returnFocus = false) {
    navLinks.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    updateMenuLabel(false);
    if (returnFocus) menu.focus();
  }

  menu.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(isOpen));
    navLinks.classList.toggle('open', isOpen);
    updateMenuLabel(isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu(true);
    }
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('nav')) closeMenu();
  });

  matchMedia('(min-width: 901px)').addEventListener('change', () => closeMenu());
}

const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project')];

if (filters && projects.length) {
  filters.hidden = false;
  const filterStatus = document.querySelector('#filter-status');

  filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      let visibleCount = 0;
      projects.forEach(project => {
        const visible = button.dataset.filter === 'all' ||
          project.dataset.category.split(' ').includes(button.dataset.filter);
        project.hidden = !visible;
        if (visible) visibleCount++;
      });

      if (filterStatus) {
        filterStatus.textContent = `${visibleCount} of ${projects.length} projects shown`;
      }
      const professionalHeading = document.querySelector('.professional-heading');
      if (professionalHeading) {
        professionalHeading.hidden = !projects.some(project =>
          project.classList.contains('professional') && !project.hidden);
      }
    });
  });

  // Direct case-study links must also work after a visitor filters the work.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (target?.classList.contains('project') && target.hidden) {
        filters.querySelector('[data-filter="all"]')?.click();
      }
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
