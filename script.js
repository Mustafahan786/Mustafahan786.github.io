const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const scholarUrl = 'https://scholar.google.com/citations?user=AgU49wwAAAAJ&hl=en';

function addScholarLink(container, label, className = '') {
  if (!container || container.querySelector(`a[href="${scholarUrl}"]`)) return;
  const link = document.createElement('a');
  link.href = scholarUrl;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = label;
  if (className) link.className = className;
  container.appendChild(link);
}

addScholarLink(document.querySelector('.profile-badges'), 'Google Scholar');
addScholarLink(document.querySelector('.profile-links'), 'Google Scholar ↗');

const contactLinks = document.querySelector('.contact-links');
if (contactLinks && !contactLinks.querySelector(`a[href="${scholarUrl}"]`)) {
  const link = document.createElement('a');
  link.href = scholarUrl;
  link.target = '_blank';
  link.rel = 'noopener';
  link.innerHTML = '<span>Google Scholar</span><strong>Muhammad Mustafa Khan</strong>';
  contactLinks.appendChild(link);
}
