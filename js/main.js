(function () {
  'use strict';

  // ハンバーガーメニュー（SP）
  var body = document.body;
  var toggle = document.querySelector('.header__toggle');
  var navLinks = document.querySelectorAll('.header__nav a');

  function setMenu(open) {
    body.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  toggle.addEventListener('click', function () {
    setMenu(!body.classList.contains('is-menu-open'));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  // 導入事例スライダー
  var list = document.querySelector('.case__list');
  var prev = document.querySelector('.case__arrow--prev');
  var next = document.querySelector('.case__arrow--next');

  function step() {
    var item = list.querySelector('.case__item');
    var gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    return item.offsetWidth + gap;
  }

  // 端まで来たら反対側の端へ戻り、左右どちらにもループして送れるようにする
  function slide(dir) {
    var max = list.scrollWidth - list.clientWidth;
    if (max <= 1) return;
    if (dir > 0 && list.scrollLeft >= max - 1) {
      list.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dir < 0 && list.scrollLeft <= 1) {
      list.scrollTo({ left: max, behavior: 'smooth' });
    } else {
      list.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }
  }

  prev.addEventListener('click', function () {
    slide(-1);
  });

  next.addEventListener('click', function () {
    slide(1);
  });
})();
