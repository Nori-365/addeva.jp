/* BSC-20 size pages: reuse common introduction/features from series index */
(() => {
  const sizePages = new Set([
    '/product/bsc20/ss.html',
    '/product/bsc20/yoko.html',
    '/product/bsc20/s.html',
    '/product/bsc20/m.html'
  ]);

  if (!sizePages.has(location.pathname)) return;

  const renderCommonSections = async () => {
    const sizeCompare = document.getElementById('size-compare');
    const productSection = sizeCompare?.closest('section.section');
    if (!productSection) return;

    try {
      const response = await fetch('/product/bsc20/', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const brandSection = doc.getElementById('brand');
      const featuresSection = brandSection?.nextElementSibling;

      if (!brandSection || !featuresSection) {
        throw new Error('BSC-20 common sections not found');
      }

      const featuresKicker = featuresSection.querySelector('.kicker')?.textContent?.trim();
      if (featuresKicker !== 'FEATURES') {
        throw new Error('BSC-20 FEATURES section not found');
      }

      const fragment = document.createDocumentFragment();
      fragment.append(
        document.importNode(brandSection, true),
        document.importNode(featuresSection, true)
      );

      productSection.after(fragment);
    } catch (error) {
      console.error('BSC-20 common content include failed:', error);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCommonSections, { once: true });
  } else {
    renderCommonSections();
  }
})();
