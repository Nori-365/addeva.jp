// Mobile hamburger navigation
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;
  const nav = header.querySelector('nav');
  if (!nav) return;
  nav.id = 'primary-nav';
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-controls', 'primary-nav');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'メニュー');
  btn.innerHTML = '<span></span><span></span><span></span>';
  header.prepend(btn);
  const close = () => {
    header.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
});