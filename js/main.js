// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Subtle parallax drift on visual case study images
const parallaxContainers = document.querySelectorAll('.cs-visual-case');
if (parallaxContainers.length) {
  const range = 40; // total px of drift across the full scroll of each image
  const updateParallax = () => {
    parallaxContainers.forEach(container => {
      const img = container.querySelector('.cs-visual-case-img');
      if (!img) return;
      const rect = container.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
      const offset = (progress - 0.5) * range;
      img.style.transform = `scale(1.04) translateY(${offset}px)`;
    });
  };
  window.addEventListener('scroll', () => requestAnimationFrame(updateParallax), { passive: true });
  updateParallax();
}

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
