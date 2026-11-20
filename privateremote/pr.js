// PrivateRemote pages: the ONE place to set the buy link and the price.
// When the Gumroad product exists, replace BUY_URL with its link
// (e.g. https://reviewcomfort85.gumroad.com/l/privateremote) and set PRICE.
var PR_BUY_URL = '#gumroad-link-pending';   // PLACEHOLDER
var PR_PRICE   = '€9.99';                    // NOT FINAL: Alex picks €8.32 + VAT or €9.99 + VAT; no 'incl. VAT' wording

(function () {
  function apply() {
    document.querySelectorAll('[data-buy]').forEach(function (a) {
      a.href = PR_BUY_URL;
      if (/^https?:/.test(PR_BUY_URL)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = PR_PRICE; });

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
