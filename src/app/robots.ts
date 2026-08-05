import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      // AI + search crawlers — explicitly allowed for indexing, LLM discovery, citation
      // OpenAI / ChatGPT
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      // Google (search + Gemini/Vertex grounding)
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // Microsoft Bing (also feeds ChatGPT search + Copilot) & Yahoo
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'msnbot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
      // Apple (Siri / Spotlight / Apple Intelligence)
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // Amazon
      { userAgent: 'Amazonbot', allow: '/' },
      // Meta AI
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
      // Cohere
      { userAgent: 'cohere-ai', allow: '/' },
      // DuckDuckGo, Yandex, Baidu
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      // ByteDance (TikTok / Doubao)
      { userAgent: 'Bytespider', allow: '/' },
      // Common Crawl (training corpus many models pull from)
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: 'https://streetshowproduction.com/sitemap.xml',
    host: 'https://streetshowproduction.com',
  };
}
