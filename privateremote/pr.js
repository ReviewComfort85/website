// PrivateRemote pages: the ONE place to set the buy link and the price.
// GO LIVE: put the Gumroad product link in PR_BUY_URL
// (e.g. https://reviewcomfort85.gumroad.com/l/privateremote).
// While it is '' every Buy button shows as a disabled "Coming soon / Скоро".
var PR_BUY_URL = '';
// Price shown WITH VAT (Alex, 20 Nov 2026). Gumroad net price 8.32 -> 9.98 with BG VAT.
var PR_PRICE   = { en: '€9.99', bg: '€9,99' };
var PR_VAT     = { en: 'incl. VAT', bg: 'с ДДС' };

(function () {
  function apply() {
    var live = /^https:\/\//.test(PR_BUY_URL);
    function both(o) {
      return '<span class="en">' + o.en + '</span><span class="bg">' + o.bg + '</span>';
    }
    document.querySelectorAll('[data-buy]').forEach(function (a) {
      if (live) {
        a.href = PR_BUY_URL; a.target = '_blank'; a.rel = 'noopener';
        return;
      }
      // Not on sale yet: a calm, clearly inactive button, no dead link.
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('role', 'link');
      a.classList.add('soon');
      var en = a.querySelector(':scope > .en'), bg = a.querySelector(':scope > .bg');
      var mini = a.classList.contains('buy-mini');
      if (en) en.textContent = mini ? 'Soon' : 'Coming soon';
      if (bg) bg.textContent = 'Скоро';
    });
    document.querySelectorAll('[data-price]').forEach(function (el) {
      el.innerHTML = both(PR_PRICE) + ' <small class="vat">' + both(PR_VAT) + '</small>';
    });

  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();

// Screenshot alt text follows the EN/BG switch.
(function () {
  function alts() {
    var bg = document.documentElement.classList.contains('bg');
    document.querySelectorAll('img[data-alt-en]').forEach(function (img) {
      img.alt = img.getAttribute(bg ? 'data-alt-bg' : 'data-alt-en');
    });
  }
  new MutationObserver(alts).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', alts); else alts();
})();
