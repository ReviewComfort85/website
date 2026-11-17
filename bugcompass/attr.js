// Remembers where a visitor came from (?utm_* or ?ref=) for this browser tab
// (sessionStorage, no cookie) and adds it to the Gumroad "Get Pro" links, so the
// sale shows under Gumroad Analytics -> UTM links and in the Sales CSV. Gumroad
// records a UTM link only when utm_source, utm_medium and utm_campaign are all set.
// Chrome Web Store links get utm_source too (CWS Developer Dashboard -> Analytics).
(function () {
  var KEY = "bc_attr";
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  function clean(v) {
    return typeof v === "string" ? v.trim().toLowerCase().replace(/[^a-z0-9\-_]/g, "-").slice(0, 100) : "";
  }

  function read() {
    try {
      var v = JSON.parse(sessionStorage.getItem(KEY) || "null");
      return v && typeof v === "object" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function capture() {
    var q = new URLSearchParams(location.search);
    var a = {};
    UTM.forEach(function (k) {
      var v = clean(q.get(k) || "");
      if (v) a[k] = v;
    });
    var ref = clean(q.get("ref") || "");
    if (ref) a.ref = ref;
    if (!a.utm_source && !a.ref) return null;
    try {
      var r = new URL(document.referrer);
      if (/^https?:$/.test(r.protocol) && r.hostname && r.hostname !== location.hostname) a.referrer = r.origin;
    } catch (e) {}
    return a;
  }

  var attr = read();
  if (!attr) {
    attr = capture();
    if (attr) {
      try {
        sessionStorage.setItem(KEY, JSON.stringify(attr));
      } catch (e) {}
    }
  }
  if (!attr) return;

  var source = attr.utm_source || attr.ref;
  var medium = attr.utm_medium || "referral";
  var campaign = attr.utm_campaign || (attr.utm_source ? "bugcompass" : ("ref_" + attr.ref).slice(0, 100));

  function tag() {
    var links = document.querySelectorAll('a[href*="gumroad.com/l/"], a[href*="chromewebstore.google.com/detail/"]');
    for (var i = 0; i < links.length; i++) {
      var u;
      try {
        u = new URL(links[i].href);
      } catch (e) {
        continue;
      }
      u.searchParams.set("utm_source", source);
      u.searchParams.set("utm_medium", medium);
      u.searchParams.set("utm_campaign", campaign);
      if (/gumroad\.com$/.test(u.hostname)) {
        if (attr.utm_term) u.searchParams.set("utm_term", attr.utm_term);
        if (attr.utm_content) u.searchParams.set("utm_content", attr.utm_content);
        if (attr.referrer) u.searchParams.set("referrer", attr.referrer);
      }
      links[i].href = u.toString();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tag);
  else tag();
})();
