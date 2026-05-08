const body = document.body;
const themeBtn = document.querySelector('#themeBtn');
const menuBtn = document.querySelector('#menuBtn');
const navLinks = document.querySelector('#navLinks');
const year = document.querySelector('#year');

function loadTheme() {
  const savedTheme = localStorage.getItem('codepilot-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    if (themeBtn) themeBtn.textContent = '☀️';
  }
}

function toggleTheme() {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('codepilot-theme', isDark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = isDark ? '☀️' : '🌙';
}

loadTheme();
if (year) year.textContent = new Date().getFullYear();
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));

const openButtons = document.querySelectorAll('.open-btn');
openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const url = button.dataset.url;
    window.location.href = url;
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const searchInput = document.querySelector('#searchInput');
let activeFilter = 'all';

function filterProjects() {
  const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

  projectCards.forEach((card) => {
    const category = card.dataset.category;
    const title = card.dataset.title.toLowerCase();
    const matchFilter = activeFilter === 'all' || category === activeFilter;
    const matchSearch = title.includes(searchText);

    card.style.display = matchFilter && matchSearch ? 'block' : 'none';
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    filterProjects();
  });
});

if (searchInput) searchInput.addEventListener('input', filterProjects);

const counters = document.querySelectorAll('[data-count]');
let counterStarted = false;

function startCounters() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    }, 25);
  });
}

if (counters.length) {
  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) startCounters();
  });
  startCounters();
}
