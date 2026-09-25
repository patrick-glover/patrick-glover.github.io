---
---
{%- if site.cloudflare_analytics_token and site.cloudflare_analytics_token != "" -%}
// Cloudflare Web Analytics loader. Served from the root domain so the project
// repos (/tdcs/, /breach/, ...) can include this one file and share the token.
(function () {
  if (location.hostname !== 'patrickglover.io') return;
  var s = document.createElement('script');
  s.type = 'module';
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: '{{ site.cloudflare_analytics_token }}' }));
  document.head.appendChild(s);
})();
{%- endif -%}
