const offsetByHeaderHeight = (() => {
    const landmark = document.querySelector('.logo');
    const style = window.getComputedStyle(landmark);
    if (style.getPropertyValue('position') === 'fixed') return landmark.clientHeight;
    else return 0;
})();

function ancherSmoothScroll() {
  // ページ内アンカースムーススクロール
  const handler = (e) => {
      const hash = e.currentTarget.hash;
      const target = document.getElementById(hash.slice(1));
      e.preventDefault();
      const position = target.getBoundingClientRect().top + window.scrollY + offsetByHeaderHeight;
      window.scrollTo({
      top: position,
      behavior: "smooth",
      });

      // URLにハッシュを含める
      history.pushState(null, '', hash);
  }

  document.querySelectorAll('a[href^="#"]')
      .forEach((element) => element.addEventListener('click', handler));

  // 別ページ遷移後にスムーススクロール
  const urlHash = window.location.hash;
  if (urlHash) {
      const target = document.getElementById(urlHash.slice(1));
      if (target) {
      // ページトップから開始（ブラウザ差異を考慮して併用）
      history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);

      window.addEventListener("load", () => {
          const position = target.getBoundingClientRect().top + window.scrollY + offsetByHeaderHeight;
          window.scrollTo({
              top: position,
              behavior: "smooth",
          });

          // ハッシュを再設定
          history.replaceState(null, '', window.location.pathname + urlHash);
      });
      }
  }
}

function headerNavSmoothScroll() {
    const event = new CustomEvent('clickHeaderMenu');

    const handler = (e) => {
        console.log('e', e);
        const hash = e.currentTarget.hash;
        const target = document.getElementById(hash.slice(1));
        e.preventDefault();
        const position = target.getBoundingClientRect().top + window.scrollY + offsetByHeaderHeight;
        window.scrollTo({
            top: position,
            behavior: "smooth",
        });

        // URLにハッシュを含める
        history.pushState(null, '', hash);

        // ヘッダーの更新処理
        document.querySelector('.header').dispatchEvent(event);
    }

    document.querySelectorAll(`a[href^="${location.pathname}#"]`)
        .forEach((element) => element.addEventListener('click', handler));
}


export {
  ancherSmoothScroll, headerNavSmoothScroll,
};
