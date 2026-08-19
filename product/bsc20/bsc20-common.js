/* BSC-20 size pages: reuse common top content from series index */
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

      /*
       * BSC-20 series index の共通上部をそのまま再利用する。
       * 1. ブランド訴求画像4枚のセクション
       * 2. Introducing Beatas
       * 3. FEATURES
       * LINEUP 以降はサイズページ側に既存の比較UIがあるため含めない。
       */
      const brandSection = doc.getElementById('brand');
      const visualSection = brandSection?.previousElementSibling;
      const featuresSection = brandSection?.nextElementSibling;

      if (!visualSection || !brandSection || !featuresSection) {
        throw new Error('BSC-20 common top sections not found');
      }

      const visualImages = visualSection.querySelectorAll('img[src*="/assets/img/items/bsc20/970_600_brand_top_"]');
      const featuresKicker = featuresSection.querySelector('.kicker')?.textContent?.trim();

      if (visualImages.length < 1) {
        throw new Error('BSC-20 brand visual section not found');
      }
      if (featuresKicker !== 'FEATURES') {
        throw new Error('BSC-20 FEATURES section not found');
      }

      const fragment = document.createDocumentFragment();
      fragment.append(
        document.importNode(visualSection, true),
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
