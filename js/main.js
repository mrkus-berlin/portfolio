// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Active nav link based on current page
const path = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && path.endsWith(href)) a.classList.add('active');
});
