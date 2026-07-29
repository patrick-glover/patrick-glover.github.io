(function () {
  var svg = document.getElementById('fmap');
  if (!svg || !svg.getBBox) return;
  var path   = document.getElementById('flownpath');
  var plane  = document.getElementById('planeg');
  var reveal = svg.querySelectorAll('.reveal');
  var clock  = document.getElementById('t-clock');
  var altEl  = document.getElementById('t-alt');
  var distEl = document.getElementById('t-dist');
  var statEl = document.getElementById('t-stat');
  var btn    = document.getElementById('replay');

  var DUR = 4600, TOTAL_NM = 99.3, T0 = 13 * 3600 + 17 * 60, SPAN = 864;
  var L = path.getTotalLength();
  var raf = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function frame(p) {
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L * (1 - p);

    var pt = path.getPointAtLength(L * p);
    var pt2 = path.getPointAtLength(Math.min(L, L * p + 1.5));
    var ang = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI + 90;
    plane.setAttribute('transform',
      'translate(' + pt.x.toFixed(1) + ',' + pt.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')');

    var s = Math.round(T0 + p * SPAN);
    clock.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);

    var ft = Math.round(32000 * Math.pow(p, 0.72) / 500) * 500;
    altEl.textContent = ft < 500 ? 'ground' : (ft >= 18000 ? 'FL' + (ft / 100) : ft.toLocaleString() + ' ft');
    distEl.textContent = (p * TOTAL_NM).toFixed(0) + ' nm';
    statEl.textContent = p < 0.04 ? 'taxi' : (p < 0.9 ? 'climb' : 'capture');

    var o = p < 0.88 ? 0 : (p - 0.88) / 0.12;
    for (var i = 0; i < reveal.length; i++) reveal[i].style.opacity = o;
  }

  function run() {
    if (raf) cancelAnimationFrame(raf);
    var t0 = null;
    (function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / DUR);
      frame(p < 1 ? 1 - Math.pow(1 - p, 2.2) : 1);   // ease-out
      if (p < 1) raf = requestAnimationFrame(step);
      else { raf = null; svg.classList.add('done'); }
    })(performance.now());
    svg.classList.remove('done');
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    frame(1); svg.classList.add('done');
  } else if ('IntersectionObserver' in window) {
    var seen = false;
    new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !seen) { seen = true; run(); }
    }, { threshold: 0.25 }).observe(svg);
    frame(0);
  } else {
    run();
  }

  if (btn) btn.addEventListener('click', run);
})();
