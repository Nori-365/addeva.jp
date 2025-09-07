document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const btn = header?.querySelector('.nav-toggle');
  const backdrop = header?.querySelector('.backdrop') || document.querySelector('.backdrop');
  if (!header || !btn) return;
  const close = () => {
    header.classList.remove('nav-open');
    btn.setAttribute('aria-expanded','false');
  };
  btn.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  (backdrop || document.body).addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
});