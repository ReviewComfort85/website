// Bulgarian for a phone set to Bulgarian, English otherwise; the button
// switches, and the choice is kept.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved || ((navigator.language || '').toLowerCase().indexOf('bg') === 0 ? 'bg' : 'en');
  if (location.hash === '#bg') lang = 'bg';
  function set(l) {
    lang = l;
    root.classList.toggle('bg', l === 'bg');
    root.lang = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  set(lang);
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.lang')) set(lang === 'bg' ? 'en' : 'bg');
  });
})();
