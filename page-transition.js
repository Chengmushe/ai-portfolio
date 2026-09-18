(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname && url.hash) return;
    if (!/\.html$/.test(url.pathname) || url.href === window.location.href) return;
    event.preventDefault();
    document.body.classList.add('page-exiting');
    window.setTimeout(function () { window.location.href = url.href; }, 210);
  });
}());
