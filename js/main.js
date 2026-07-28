// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Stagger .tag fade-ups line by line, based on where they actually wrap
const tagList = document.querySelectorAll('.tags .tag');
if (tagList.length) {
  const staggerTagsByLine = () => {
    let lastTop = null, lineIndex = -1;
    tagList.forEach(tag => {
      const top = tag.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 4) {
        lineIndex++;
        lastTop = top;
      }
      tag.style.transitionDelay = `${lineIndex * 0.12}s`;
    });
  };
  staggerTagsByLine();
  window.addEventListener('resize', staggerTagsByLine);
  // Recompute once webfonts finish loading — the initial run happens against
  // fallback-font metrics, and the swap to Poppins can reflow which line a
  // borderline tag lands on without a resize event firing.
  document.fonts?.ready.then(staggerTagsByLine);
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
