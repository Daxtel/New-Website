// Japan Creative Performance Audit: page content (EN + JA).
//
// EN copy is final (owner-approved brief). JA copy is a first-pass translation
// written to keep the bilingual route complete; it is NOT final marketing copy.
// TODO(jp-review): owner to review all Japanese wording before deployment. Do not
// treat the JA strings here as finalized transcreation.

export type L = { en: string; ja: string };
export type LFaq = { q: L; a: L };

const bi = (en: string, ja: string): L => ({ en, ja });

export const auditPage = {
  slug: 'japan-creative-performance-audit',

  meta: {
    title: bi(
      'Japan Creative Performance Audit | Streetshow Productions',
      '日本向けクリエイティブ・パフォーマンス監査｜Streetshow Productions',
    ),
    description: bi(
      'A 7 business day audit of creative, messaging, localization and landing page performance for brands entering or operating in Japan. Starting from ¥350,000.',
      '日本に参入・展開する海外ブランド向けに、クリエイティブ、メッセージ、ローカライズ、ランディングページのパフォーマンスを7営業日で監査します。¥350,000から。',
    ),
  },

  // ── Hero ──
  hero: {
    eyebrow: bi('JAPAN CREATIVE PERFORMANCE AUDIT', '日本向けクリエイティブ・パフォーマンス監査'),
    h1: bi('Is your creative actually ready for Japan?', 'あなたのクリエイティブは、本当に日本市場に対応できていますか？'),
    supporting: bi(
      'A focused review of how your creative, messaging, and localization actually perform in Japan. For brands about to launch, or already in market.',
      'クリエイティブ、メッセージ、ローカライズが日本で実際にどう機能しているかを集中レビュー。これから立ち上げるブランドにも、すでに展開中のブランドにも。',
    ),
    priceLabel: bi('Starting from', '料金'),
    price: bi('¥350,000 + tax', '¥350,000＋税'),
    duration: bi('7 business days', '7営業日'),
    primaryCta: bi('Request a Japan Creative Performance Audit', '監査をリクエストする'),
    secondaryCta: bi('See What We Review', 'レビュー内容を見る'),
  },

  proofStrip: {
    label: bi('Trusted by brands operating in Japan', '日本で展開するブランドに信頼されています'),
  },

  // ── Problem ──
  problem: {
    heading: bi(
      'Strong global creative can still underperform in Japan.',
      '優れたグローバルクリエイティブでも、日本では力を発揮しきれないことがあります。',
    ),
    body: [
      bi(
        'Your campaign can be beautifully produced, professionally translated, and a proven winner in other markets, and still fall flat with Japanese buyers.',
        '完成度の高い制作、プロによる翻訳、他市場での実績。それでも、日本の購入者には響かないことがあります。',
      ),
      bi(
        'It is rarely one obvious mistake. It is usually the sum of small ones: the message, the trust cues, the visual hierarchy, the localization, the cultural read, the platform norms, and the path from first impression to purchase.',
        '原因が一つの明らかなミスであることは稀です。多くは小さなズレの積み重ねです。メッセージ、信頼の伝え方、視覚的な優先順位、ローカライズ、文化的な読み取り、プラットフォームの慣習、そして第一印象から購入までの導線。',
      ),
      bi(
        'This audit surfaces those gaps before you spend more on media, production, or localization.',
        'この監査は、メディア、制作、ローカライズに追加投資する前に、そのズレを可視化します。',
      ),
    ],
  },

  // ── Two moments ──
  moments: {
    heading: bi('Built for brands at two critical moments', '2つの重要な局面にあるブランドのために'),
    columns: [
      {
        title: bi('Before launching in Japan', '日本での立ち上げ前'),
        body: bi(
          'You have global creative and messaging ready, and you want to know what to adapt before it goes live in Japan. We flag the weak points while they are still cheap to fix.',
          'グローバルのクリエイティブとメッセージが準備済みで、日本で公開する前に何を適応させるべきか知りたい段階。まだ安く直せるうちに、弱点を洗い出します。',
        ),
      },
      {
        title: bi('Already active in Japan', 'すでに日本で展開中'),
        body: bi(
          'Your campaigns are live, but engagement or conversion is softer than you expected. We pinpoint whether it is the creative, the message, the localization, the landing page, or the way the whole thing is put together.',
          'キャンペーンは稼働中だが、エンゲージメントやコンバージョンが想定を下回っている場合。原因がクリエイティブ、メッセージ、ローカライズ、ランディングページ、あるいは全体の組み立て方のどこにあるのかを特定します。',
        ),
      },
    ],
  },

  // ── What we review ──
  review: {
    heading: bi('We examine the full creative journey.', 'クリエイティブの全行程を検証します。'),
    supporting: bi(
      'We judge your campaign as one connected system, not a folder of separate assets.',
      'キャンペーンを、バラバラの素材ではなく、つながり合った一つのシステムとして評価します。',
    ),
    categories: [
      {
        title: bi('Creative execution', 'クリエイティブの実行'),
        body: bi(
          'Video, static assets, photography, hooks, visual hierarchy, pacing, talent, product presentation, and overall creative structure.',
          '動画、静止画、写真、フック、視覚的な優先順位、テンポ、出演者、商品の見せ方、そしてクリエイティブ全体の構造。',
        ),
      },
      {
        title: bi('Messaging', 'メッセージ'),
        body: bi(
          'Value proposition, headlines, claims, tone, trust signals, calls to action, and whether the message actually lands with a Japanese audience.',
          '価値提案、見出し、訴求、トーン、信頼を伝える要素、行動喚起、そしてメッセージが日本のオーディエンスに実際に届くかどうか。',
        ),
      },
      {
        title: bi('Localization', 'ローカライズ'),
        body: bi(
          'We assess whether the idea itself translates, not simply whether the Japanese language is technically correct.',
          '日本語が技術的に正しいかどうかだけでなく、アイデアそのものが日本に伝わるかを評価します。',
        ),
      },
      {
        title: bi('Landing experience', 'ランディング体験'),
        body: bi(
          'The relationship between the campaign and the page it leads to, including message continuity, trust, hierarchy, CTA clarity, and obvious conversion friction.',
          'キャンペーンと遷移先ページの関係。メッセージの一貫性、信頼、優先順位、CTAの明快さ、そして明らかなコンバージョンの障害を含みます。',
        ),
      },
      {
        title: bi('Competitive context', '競合コンテクスト'),
        body: bi(
          'We review 3 to 5 relevant competitors in Japan to understand how the category communicates, builds trust, and positions value locally.',
          '日本の関連競合3〜5社をレビューし、そのカテゴリーが現地でどう伝え、信頼を築き、価値を位置づけているかを把握します。',
        ),
      },
      {
        title: bi('Campaign consistency', 'キャンペーンの一貫性'),
        body: bi(
          'Whether the creative, the message, the landing page, and the action you want all pull in the same direction.',
          'クリエイティブ、メッセージ、ランディングページ、そして狙う顧客行動が、すべて同じ方向を向いているかどうか。',
        ),
      },
    ],
  },

  // ── Deliverables ──
  deliverables: {
    heading: bi('A clear diagnosis, not a generic strategy deck.', '汎用的な戦略資料ではなく、明確な診断を。'),
    supporting: bi(
      'You get a structured Japan Creative Performance Audit Report that shows your team exactly what is working, what is holding performance back, and what to change first.',
      '成果物は、体系化された「日本向けクリエイティブ・パフォーマンス監査レポート」。何が機能し、何がパフォーマンスを妨げ、まず何を変えるべきかを、チームに正確に示します。',
    ),
    items: [
      {
        n: '01',
        title: bi('Executive diagnosis', 'エグゼクティブ診断'),
        body: bi(
          "A concise summary of the campaign's strongest elements, most important weaknesses, and highest priority risks.",
          'キャンペーンの最も強い要素、最も重要な弱点、最優先のリスクを簡潔にまとめます。',
        ),
      },
      {
        n: '02',
        title: bi('Creative performance scorecard', 'クリエイティブ・パフォーマンス・スコアカード'),
        body: bi(
          'Review across cultural fit, message clarity, trust, localization, visual communication, differentiation, conversion path, and platform suitability.',
          '文化的適合、メッセージの明快さ、信頼、ローカライズ、視覚的コミュニケーション、差別化、コンバージョン導線、プラットフォーム適性の各観点でレビューします。',
        ),
      },
      {
        n: '03',
        title: bi('Asset by asset review', 'アセット別レビュー'),
        body: bi(
          'We annotate and evaluate the actual creative being used or planned so your team can see exactly where recommendations apply.',
          '実際に使用中または予定のクリエイティブに注釈を付けて評価し、どこに推奨が当てはまるかをチームが正確に把握できるようにします。',
        ),
      },
      {
        n: '04',
        title: bi('Japan competitor comparison', '日本競合比較'),
        body: bi(
          'A focused comparison of 3 to 5 relevant competitors covering messaging, visual language, proof, offers, and conversion approach.',
          '関連競合3〜5社を対象に、メッセージ、ビジュアル言語、実績、オファー、コンバージョン手法を比較します。',
        ),
      },
      {
        n: '05',
        title: bi('Priority action plan', '優先アクションプラン'),
        body: bi(
          'Recommendations organised into Critical (fix before additional media or production investment), Important (address during the next creative cycle), and Opportunity (areas with potential to improve performance or differentiation).',
          '推奨事項を、Critical（追加のメディア・制作投資の前に修正）、Important（次のクリエイティブサイクルで対応）、Opportunity（パフォーマンスや差別化を高める余地）に整理します。',
        ),
      },
      {
        n: '06',
        title: bi('Three recommended creative directions', '3つの推奨クリエイティブ方向性'),
        body: bi(
          'Three practical ways the campaign could be improved or repositioned for the Japanese market. Clearly labelled as strategic directions, not finished advertisements.',
          '日本市場に向けてキャンペーンを改善・再位置づけする実践的な3つの方向性。完成した広告ではなく、戦略的な方向性として明示します。',
        ),
      },
      {
        n: '07',
        title: bi('One illustrative creative direction mockup', '1点の例示クリエイティブモックアップ'),
        body: bi(
          'One non production ready visual example showing how a key recommendation could look in practice: a redesigned frame, a visual concept, or a simple storyboard, depending on the campaign.',
          '主要な推奨がクリエイティブ表現にどう落とし込めるかを示す、制作前提ではない1点のビジュアル例。キャンペーンに応じて、再設計フレーム、ビジュアルコンセプト、簡易絵コンテのいずれかとなります。',
        ),
      },
      {
        n: '08',
        title: bi('60 minute findings session', '60分のフィードバックセッション'),
        body: bi(
          "A live review of the audit with the client's team, including recommendations, priorities, and Q&A.",
          '推奨、優先順位、Q&Aを含め、監査結果をクライアントチームとライブでレビューします。',
        ),
      },
    ],
  },

  // ── Scope & investment ──
  scope: {
    heading: bi('Standard audit scope', '標準監査スコープ'),
    price: bi('Starting from ¥350,000 + tax', '¥350,000＋税から'),
    duration: bi('Delivered in 7 business days', '7営業日で納品'),
    includes: [
      bi('One brand', '1ブランド'),
      bi('One product or service', '1商品またはサービス'),
      bi('One active or planned Japan campaign', '実施中または予定の日本キャンペーン1件'),
      bi('Up to 10 core creative assets', 'コアクリエイティブ素材 最大10点'),
      bi('One landing page', 'ランディングページ1点'),
      bi('3 to 5 relevant Japanese competitors', '関連する日本競合3〜5社'),
      bi('Japan Creative Performance Audit Report', '日本向けクリエイティブ・パフォーマンス監査レポート'),
      bi('Three recommended creative directions', '推奨クリエイティブ方向性 3点'),
      bi('One illustrative creative direction mockup', '例示クリエイティブモックアップ 1点'),
      bi('60 minute findings session', '60分のフィードバックセッション'),
    ],
    note: bi(
      'Larger, multi product, or multi campaign scopes are quoted separately.',
      '大規模・複数商品・複数キャンペーンのスコープは別途お見積もりします。',
    ),
    cta: bi('Request an Audit', '監査をリクエストする'),
  },

  // ── What this is not ──
  notIncluded: {
    heading: bi(
      'Focused creative diagnosis, not full market entry consulting.',
      'フルの市場参入コンサルティングではなく、クリエイティブに絞った診断です。',
    ),
    intro: bi('The Japan Creative Performance Audit does not include:', 'この監査には以下は含まれません：'),
    items: [
      bi('Full Japan market sizing', '日本市場の規模推計'),
      bi('Regulatory or legal analysis', '規制・法務分析'),
      bi('Distribution strategy', '流通戦略'),
      bi('Media buying', 'メディアバイイング'),
      bi('Full consumer research studies', '本格的な消費者調査'),
      bi('Completed Japanese advertising production', '日本向け広告の完成制作'),
      bi('Full copywriting or transcreation', 'フルのコピーライティング・トランスクリエーション'),
      bi('Website redesign', 'ウェブサイトのリデザイン'),
      bi('Finished creative assets', '完成クリエイティブ素材'),
    ],
    footer: bi('These can be handled separately where required.', 'これらは必要に応じて別途対応いたします。'),
  },

  // ── Strategic value ──
  value: {
    heading: bi('Fix the creative before increasing the spend.', '出稿を増やす前に、クリエイティブを整える。'),
    body: bi(
      'When a campaign underperforms, the reflex is to spend more: more media, new targeting, more content. But if the message, the creative, or the market fit is off, more spend just buys more of the same result. The audit gives you a Japan-specific outside read before you commit the next budget.',
      'キャンペーンが伸び悩むと、まず出稿を増やす、ターゲティングを変える、コンテンツを増やす、という反応になりがちです。しかし、メッセージ、クリエイティブ、市場適合がずれていれば、追加投資は同じ結果を買い増すだけです。監査は、次の予算を投じる前に、日本に特化した外部の視点を提供します。',
    ),
  },

  // ── Implementation pathway ──
  implementation: {
    heading: bi('Turn the findings into execution.', '発見を実行に移す。'),
    body: bi(
      'When the audit points to clear opportunities, Streetshow can build the next stage with you.',
      '監査が明確な機会を示したら、Streetshowが次の段階を一緒に形にします。',
    ),
    items: [
      bi('Localized creative production', 'ローカライズ・クリエイティブ制作'),
      bi('Campaign development', 'キャンペーン開発'),
      bi('Video production', '映像制作'),
      bi('Photography', 'フォトグラフィー'),
      bi('CGI and 3D content', 'CGI・3Dコンテンツ'),
      bi('Japanese market adaptation', '日本市場への適応'),
      bi('Landing page creative direction', 'ランディングページのクリエイティブディレクション'),
    ],
    creditAmount: bi('¥100,000 implementation credit', '¥100,000の実装クレジット'),
    creditBody: bi(
      'Clients who commission recommended implementation work with Streetshow within 30 days can receive a ¥100,000 credit toward the next project.',
      '推奨された実装業務を30日以内にStreetshowへ発注いただいたクライアントは、次のプロジェクトに使える¥100,000のクレジットを受け取れます。',
    ),
  },

  // ── Relevant work ──
  work: {
    heading: bi('Relevant Japan work', '関連する日本での実績'),
    slugs: [
      'new-balance-japan-ohtani-activation',
      'shein-japan-paid-social-campaign',
      'jtl-japan-luxury-preowned-live-commerce',
    ],
  },

  // ── FAQ ──
  faqs: [
    {
      q: bi('Is this a full Japan market entry study?', 'これは日本市場参入の総合調査ですか？'),
      a: bi(
        'No. The audit focuses specifically on creative, messaging, localization, campaign structure, landing experience, and competitive creative context.',
        'いいえ。この監査は、クリエイティブ、メッセージ、ローカライズ、キャンペーン構造、ランディング体験、競合クリエイティブの文脈に特化しています。',
      ),
    },
    {
      q: bi('Can we use the audit before launching in Japan?', '日本での立ち上げ前に利用できますか？'),
      a: bi(
        'Yes. The audit can be used before launch to identify weaknesses in existing global campaign assets before they are adapted or deployed in Japan.',
        'はい。立ち上げ前に、既存のグローバルキャンペーン素材を日本向けに適応・展開する前の弱点を特定するために利用できます。',
      ),
    },
    {
      q: bi('Can you audit a campaign that is already live?', 'すでに実施中のキャンペーンも監査できますか？'),
      a: bi(
        'Yes. Existing campaigns are suitable, particularly where the team is seeing weaker than expected engagement, conversion, or response in Japan.',
        'はい。特に日本でエンゲージメント、コンバージョン、反応が期待を下回っている場合、実施中のキャンペーンに適しています。',
      ),
    },
    {
      q: bi('How many assets are included?', '対象となる素材数は？'),
      a: bi(
        'The standard scope includes up to 10 core creative assets and one relevant landing page.',
        '標準スコープには、コアクリエイティブ素材 最大10点と、関連するランディングページ1点が含まれます。',
      ),
    },
    {
      q: bi('Do you rewrite or redesign the entire campaign?', 'キャンペーン全体を書き直し・再設計しますか？'),
      a: bi(
        'No. The standard audit provides recommendations, three strategic creative directions, and one illustrative creative direction mockup. Full production, transcreation, or redesign is scoped separately.',
        'いいえ。標準監査では、推奨事項、3つの戦略的クリエイティブ方向性、1点の例示モックアップを提供します。フルの制作、トランスクリエーション、再設計は別途スコープとなります。',
      ),
    },
    {
      q: bi('What happens after the audit?', '監査の後はどうなりますか？'),
      a: bi(
        'Streetshow can support implementation if required, including localization, campaign development, video production, CGI, photography, and other Japan market creative execution.',
        '必要に応じて、ローカライズ、キャンペーン開発、映像制作、CGI、フォトグラフィーなど、日本市場向けのクリエイティブ実行をStreetshowが支援します。',
      ),
    },
    {
      q: bi('How quickly is the audit delivered?', 'どのくらいの期間で納品されますか？'),
      a: bi(
        'The standard audit is delivered within 7 business days after receiving all required materials and project context.',
        '標準監査は、必要な素材とプロジェクト情報をすべて受領後、7営業日以内に納品します。',
      ),
    },
    {
      q: bi('What does it cost?', '費用はいくらですか？'),
      a: bi(
        'Standard engagements start from ¥350,000 + tax. Larger or multi campaign scopes are quoted separately.',
        '標準の契約は¥350,000＋税から。大規模・複数キャンペーンのスコープは別途お見積もりします。',
      ),
    },
  ] as LFaq[],

  // ── Final CTA ──
  finalCta: {
    heading: bi(
      'Before you spend more in Japan, make sure the creative is working for Japan.',
      '日本でさらに投資する前に、クリエイティブが日本のために機能しているか確かめましょう。',
    ),
    service: bi('Japan Creative Performance Audit', '日本向けクリエイティブ・パフォーマンス監査'),
    price: bi('Starting from ¥350,000 + tax', '¥350,000＋税から'),
    duration: bi('7 business days', '7営業日'),
    deliverables: bi(
      'Audit report + 60 minute findings session + one illustrative creative direction mockup',
      '監査レポート ＋ 60分のフィードバックセッション ＋ 例示クリエイティブモックアップ1点',
    ),
    cta: bi('Request a Japan Creative Performance Audit', '監査をリクエストする'),
    microcopy: bi(
      "Tell us what you're launching, where the campaign stands today, and what you need to understand. We'll confirm fit and scope before we start.",
      '何を立ち上げるのか、キャンペーンの現状、何を明らかにしたいのかをお聞かせください。開始前に、適合性とスコープを確認します。',
    ),
  },

  // Illustrative scorecard (NOT real client data).
  scorecard: {
    label: bi('ILLUSTRATIVE AUDIT VIEW', '監査ビューのイメージ'),
    title: bi('CREATIVE PERFORMANCE', 'クリエイティブ・パフォーマンス'),
    // Qualitative levels, not invented precise scores. Clearly an example view.
    rows: [
      { label: bi('Cultural Fit', '文化的適合'), level: 'strong' },
      { label: bi('Message Clarity', 'メッセージの明快さ'), level: 'developing' },
      { label: bi('Trust', '信頼'), level: 'strong' },
      { label: bi('Localization', 'ローカライズ'), level: 'attention' },
      { label: bi('Conversion Path', 'コンバージョン導線'), level: 'developing' },
    ],
    levels: {
      strong: { label: bi('Strong', '良好'), width: 82 },
      developing: { label: bi('Developing', '改善余地'), width: 54 },
      attention: { label: bi('Needs work', '要改善'), width: 32 },
    },
    tags: [
      bi('Critical', 'Critical'),
      bi('Important', 'Important'),
      bi('Opportunity', 'Opportunity'),
    ],
  },
} as const;

// ── Cross-link callout copy (home, JME, localization) ──
export const auditCallouts = {
  home: {
    title: bi('Japan Creative Performance Audit', '日本向けクリエイティブ・パフォーマンス監査'),
    body: bi(
      'A 7 business day review for international brands preparing to launch or already active in Japan.',
      '日本での立ち上げを準備中、またはすでに展開中の海外ブランドのための、7営業日のレビュー。',
    ),
    price: bi('Starting from ¥350,000 + tax', '¥350,000＋税から'),
    cta: bi('Explore the Audit', '監査を見る'),
  },
  jme: {
    title: bi('Not ready for a full Japan engagement?', 'まだフルの日本エンゲージメントの段階ではない？'),
    body: bi(
      'Start with a Japan Creative Performance Audit. If you already have campaign assets, it finds the gaps in creative, messaging, localization, and conversion before you commit a bigger Japan budget.',
      'まずは日本向けクリエイティブ・パフォーマンス監査から。すでにキャンペーン素材をお持ちなら、より大きな日本予算を投じる前に、クリエイティブ、メッセージ、ローカライズ、コンバージョンのギャップを見つけます。',
    ),
    price: bi('Starting from ¥350,000 + tax · 7 business days', '¥350,000＋税から・7営業日'),
    cta: bi('Explore the Japan Creative Performance Audit', '日本向けクリエイティブ・パフォーマンス監査を見る'),
  },
  localization: {
    title: bi('Need to diagnose the current campaign first?', 'まず現在のキャンペーンを診断したい？'),
    body: bi(
      'A focused 7 business day review of your existing or planned Japan campaign, before you put more behind it.',
      '既存または予定の日本キャンペーンを、さらに投資する前に7営業日で集中レビュー。',
    ),
    price: bi('Starting from ¥350,000 + tax', '¥350,000＋税から'),
    cta: bi('View Audit Details', '監査の詳細を見る'),
  },
} as const;
