#!/usr/bin/env node
// Submit all site URLs to IndexNow (Bing, Yahoo, Yandex, Seznam, Naver share it).
// Usage: node scripts/indexnow.mjs
// Reads the LIVE sitemap so it always submits the current URL set.

const HOST = 'streetshowproduction.com';
const KEY = '12c6b4c33ec9b9e6e3c66ca16363de88';
const SITEMAP = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();

  // Grab <loc> and xhtml:link alternate hrefs so /ja URLs are included too.
  const urls = new Set();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1].trim());
  for (const m of xml.matchAll(/hreflang="[^"]*"\s+href="([^"]+)"/g)) urls.add(m[1].trim());
  const urlList = [...urls].filter((u) => u.startsWith('https://'));

  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const submit = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  console.log(`IndexNow response: ${submit.status} ${submit.statusText}`);
  if (submit.status === 200 || submit.status === 202) {
    console.log('OK — Bing/Yahoo/Yandex/Seznam notified.');
  } else {
    console.log(await submit.text());
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
