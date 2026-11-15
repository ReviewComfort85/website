// English by default, always. The button switches to Bulgarian, and the
// choice is kept only while the tab stays open.
(function () {
  var root = document.documentElement;
  var lang = 'en';
  try { if (sessionStorage.getItem('lang') === 'bg') lang = 'bg'; } catch (e) {}
  if (location.hash === '#bg') lang = 'bg';
  function set(l) {
    lang = l;
    root.classList.toggle('bg', l === 'bg');
    root.lang = l;
    try { sessionStorage.setItem('lang', l); } catch (e) {}
  }
  set(lang);
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.lang')) set(lang === 'bg' ? 'en' : 'bg');
  });
})();
