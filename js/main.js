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

  // スクロールアニメーション（フェードイン）
  if (!('IntersectionObserver' in window)) return;

  var targets = [
    '.sec-title',
    '.worry__item',
    '.cause__inner',
    '.feature__item',
    '.reason__item',
    '.cta .inner',
    '.program__item',
    '.case__item',
    '.flow__item',
    '.faq__item'
  ];

  var els = document.querySelectorAll(targets.join(','));

  els.forEach(function (el) {
    el.classList.add('fade-up');
    // 同じ並びの要素は少しずつ遅らせて順番に表示
    var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) {
      return c.matches(targets.join(','));
    });
    var index = siblings.indexOf(el);
    if (siblings.length > 1 && index > 0) {
      el.style.setProperty('--delay', (index % 4) * 0.15 + 's');
    }
  });

  // FV：非表示の状態を一度描画してから開始（最初から完成形で表示されるのを防ぐ）
  function startFv() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.querySelectorAll('.fv-anim').forEach(function (el) {
          el.classList.add('is-show');
        });
      });
    });
  }

  // 背景写真の読み込みを待ってから開始（最大1秒）
  var fvImg = document.querySelector('.fv__bg img');
  var started = false;
  function startOnce() {
    if (started) return;
    started = true;
    startFv();
  }
  if (fvImg.complete) {
    startOnce();
  } else {
    fvImg.addEventListener('load', startOnce);
    fvImg.addEventListener('error', startOnce);
    setTimeout(startOnce, 1000);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  els.forEach(function (el) {
    observer.observe(el);
  });
})();
