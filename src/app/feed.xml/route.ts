import { blogPosts } from '@/lib/blog';
import { pick } from '@/lib/i18n';

const SITE = 'https://streetshowproduction.com';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const dynamic = 'force-static';

export async function GET() {
  const items = blogPosts
    .slice()
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .map((post) => {
      // ja-track posts live at /ja/blog/...; en + bilingual at /blog/...
      const loc = post.lang === 'ja' ? 'ja' : 'en';
      const url = `${SITE}${post.lang === 'ja' ? '/ja' : ''}/blog/${post.slug}`;
      const title = pick(post.title, loc);
      const desc = pick(post.excerpt, loc);
      const pubDate = new Date(`${post.datePublished}T09:00:00Z`).toUTCString();
      return `    <item>
      <title>${esc(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(desc)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${esc(pick(post.category, loc))}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Streetshow Productions — Insights</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Japan market entry, video production, hospitality creative, and 3D billboard insights from Streetshow Productions.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
