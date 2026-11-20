// PrivateRemote pages: the ONE place to set the buy link and the price.
// GO LIVE: put the Gumroad product link in PR_BUY_URL
// (e.g. https://reviewcomfort85.gumroad.com/l/privateremote).
// While it is '' every Buy button shows as a disabled "Coming soon / Скоро".
var PR_BUY_URL = '';
// Price before VAT (option A, 20 Nov 2026). Gumroad adds VAT at checkout.
var PR_PRICE   = { en: '€8.32', bg: '€8,32' };
var PR_VAT     = { en: '+ VAT', bg: '+ ДДС' };
var PR_TOTAL_BG = { en: '€9.98', bg: '€9,98' };   // total with 20% Bulgarian VAT

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
    document.querySelectorAll('[data-total-bg]').forEach(function (el) { el.innerHTML = both(PR_TOTAL_BG); });

    // Copy buttons on the example address plate.
    document.querySelectorAll('[data-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var t = b.getAttribute('data-copy');
        if (navigator.clipboard) navigator.clipboard.writeText(t).catch(function () {});
        var old = b.innerHTML;
        b.textContent = '✓';
        setTimeout(function () { b.innerHTML = old; }, 1200);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
