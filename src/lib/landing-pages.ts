// Location and industry landing pages.
// Built from the SEO + LLM Visibility Execution Playbook (sections 11 & 12).
// Each page proves who Streetshow helps, what we do, where we operate, and why we are credible.

export type Localized = { en: string; ja: string };

export type LandingSection = {
  heading: Localized;
  body?: Localized;
  points?: Localized[];
};

export type LandingFaq = { q: Localized; a: Localized };

export type LandingPage = {
  slug: string;
  kind: 'location' | 'industry';
  navLabel: Localized; // short label for nav menus and footer
  metaTitle: Localized;
  metaDescription: Localized;
  h1: Localized;
  intro: Localized;
  trustLine: Localized;
  targetKeywords: string[];
  sections: LandingSection[];
  faqs: LandingFaq[];
  relatedServices: string[]; // catalog service slugs
  relatedProjects: string[]; // catalog project slugs
  cta: { title: Localized; body: Localized };
};

// ── Location pages ────────────────────────────────────────────────────────────
export const locationPages: LandingPage[] = [
  {
    slug: 'video-production-fukuoka',
    kind: 'location',
    navLabel: { en: 'Video Production in Fukuoka', ja: '福岡の映像制作' },
    metaTitle: {
      en: 'Video Production Company in Fukuoka | English-Speaking Crew | Streetshow',
      ja: '福岡の映像制作会社｜英語対応クルー｜Streetshow Productions',
    },
    metaDescription: {
      en: 'Fukuoka-based video production for premium and international brands. English-speaking crew, brand films, and hospitality and restaurant content.',
      ja: '福岡拠点の映像制作。プレミアム・海外ブランド向け。英語対応クルー、ブランドフィルム、ホスピタリティ・レストランコンテンツ。九州・日本全国で対応。',
    },
    h1: {
      en: 'Video Production Company in Fukuoka for Premium Brands',
      ja: '福岡のプレミアムブランド向け映像制作会社',
    },
    intro: {
      en: 'Streetshow Productions is a Fukuoka-based creative production studio serving premium and international brands. We produce brand films, hospitality content, and campaign work with an English and Japanese-speaking crew, on location across Fukuoka, Kyushu, and the rest of Japan.',
      ja: 'Streetshow Productionsは、プレミアム・海外ブランドを支援する福岡拠点のクリエイティブ制作スタジオです。英語・日本語対応クルーで、福岡、九州、日本全国のロケーションにて、ブランドフィルム、ホスピタリティコンテンツ、キャンペーン制作を行います。',
    },
    trustLine: {
      en: 'Fukuoka headquarters · Bilingual EN/JP crew · Hospitality, restaurant, and international brand production',
      ja: '福岡本拠地 · EN/JPバイリンガルクルー · ホスピタリティ、レストラン、海外ブランド制作',
    },
    targetKeywords: [
      'video production Fukuoka',
      'Fukuoka video production company',
      'English-speaking video crew Fukuoka',
      'commercial video production Fukuoka',
      'hotel video production Fukuoka',
      'restaurant video production Fukuoka',
    ],
    sections: [
      {
        heading: { en: 'Fukuoka-Based Creative Production for Brands in Japan', ja: '日本のブランド向け 福岡拠点のクリエイティブ制作' },
        body: {
          en: 'Fukuoka is our home base. That means faster scheduling, real local knowledge, and lower production overhead than running a shoot out of Tokyo. For brands operating in Kyushu, or international teams who want a capable local partner, we handle the full production from concept to delivery.',
          ja: '福岡は私たちの拠点です。東京から撮影を動かすよりも、スケジュール調整が速く、地元の知見が本物で、制作コストも抑えられます。九州で事業を展開するブランドや、頼れるローカルパートナーを求める海外チームのために、企画から納品まで一貫して対応します。',
        },
      },
      {
        heading: { en: 'What We Produce in Fukuoka', ja: '福岡での制作内容' },
        points: [
          { en: 'Brand films and commercials', ja: 'ブランドフィルム・CM' },
          { en: 'Hotel, resort, and hospitality content', ja: 'ホテル・リゾート・ホスピタリティコンテンツ' },
          { en: 'Restaurant and F&B video and photography', ja: 'レストラン・飲食の映像・写真' },
          { en: 'Social and paid campaign assets', ja: 'SNS・広告キャンペーン素材' },
          { en: 'Product, CGI, and editorial photography', ja: 'プロダクト・CGI・エディトリアル写真' },
        ],
      },
      {
        heading: { en: 'Why Fukuoka Is a Strong Production Base', ja: '福岡が優れた制作拠点である理由' },
        body: {
          en: 'Fukuoka combines coastline, city, mountains, and traditional Japanese settings within a short drive. Location permits are more accessible than in central Tokyo, and the city is a major gateway for inbound tourism from Korea, China, and the wider region. That makes it an efficient base for both domestic campaigns and inbound-focused hospitality work.',
          ja: '福岡は、海岸、都市、山、伝統的な日本の風景が、短時間の移動圏内にそろっています。ロケーション許可も都心の東京より取得しやすく、韓国、中国、周辺地域からのインバウンド観光の主要な玄関口でもあります。国内キャンペーンにも、インバウンド向けのホスピタリティ制作にも効率的な拠点です。',
        },
      },
      {
        heading: { en: 'Our Production Process', ja: '制作プロセス' },
        points: [
          { en: 'Brief and creative direction aligned to your goal', ja: '目標に沿ったブリーフとクリエイティブディレクション' },
          { en: 'Pre-production: scripting, casting, locations, permits', ja: 'プリプロダクション：脚本、キャスティング、ロケーション、許可' },
          { en: 'Production with bilingual on-set coordination', ja: 'バイリンガルな現場コーディネート付きの撮影' },
          { en: 'Post-production, localization, and delivery in required formats', ja: 'ポストプロダクション、ローカライズ、必要な形式での納品' },
        ],
      },
    ],
    faqs: [
      {
        q: { en: 'How much does video production cost in Fukuoka?', ja: '福岡の映像制作の費用はいくらですか？' },
        a: {
          en: 'Video production in Fukuoka typically runs from ¥300,000 to ¥2,000,000 per day depending on crew size, equipment, and deliverables. A typical multi-day brand shoot in Fukuoka is more cost-efficient than the equivalent production in central Tokyo.',
          ja: '福岡の映像制作は、クルー規模、機材、納品物により1日¥300,000〜¥2,000,000が目安です。数日間のブランド撮影は、都心の東京での同等制作よりコスト効率に優れます。',
        },
      },
      {
        q: { en: 'Can I hire an English-speaking video crew in Fukuoka?', ja: '福岡で英語対応の映像クルーを雇えますか？' },
        a: {
          en: 'Yes. Streetshow Productions is headquartered in Fukuoka and operates an English, Japanese, and French-speaking crew, so overseas brands and agencies can brief, shoot, and review in their own language.',
          ja: 'はい。Streetshow Productionsは福岡に本拠を置き、英語・日本語・フランス語対応のクルーを運営しています。海外ブランドやエージェンシーは、自国語でブリーフ、撮影、確認が可能です。',
        },
      },
      {
        q: { en: 'Do you shoot outside Fukuoka?', ja: '福岡以外でも撮影しますか？' },
        a: {
          en: 'Yes. Fukuoka is our base, but we regularly produce in Tokyo, Osaka, Kyoto, and across Japan. For clients elsewhere in Kyushu or nationwide, we bring the same crew and standards on location.',
          ja: 'はい。福岡が拠点ですが、東京、大阪、京都、日本全国で定期的に制作しています。九州の他地域や全国のクライアントにも、同じクルーと品質でロケ対応します。',
        },
      },
    ],
    relatedServices: ['video-production-japan', 'hospitality-creative-strategy-japan', 'photography-cgi-japan'],
    relatedProjects: ['fuditalyco-japan-market-entry', 'tokyo-editorial-photography'],
    cta: {
      title: { en: 'Planning a shoot in Fukuoka or Kyushu?', ja: '福岡・九州での撮影を計画中ですか？' },
      body: {
        en: 'Tell us about your brand, timeline, and goal. We will scope the right crew, locations, and production plan for Fukuoka.',
        ja: 'ブランド、スケジュール、目標をお聞かせください。福岡に最適なクルー、ロケーション、制作プランをご提案します。',
      },
    },
  },
  {
    slug: 'video-production-tokyo',
    kind: 'location',
    navLabel: { en: 'Video Production in Tokyo', ja: '東京の映像制作' },
    metaTitle: {
      en: 'Video Production Company in Tokyo | International Brands | Streetshow',
      ja: '東京の映像制作会社｜海外ブランド向け｜Streetshow Productions',
    },
    metaDescription: {
      en: 'Tokyo video production and local crew for international brands and overseas agencies. Brand films, paid social, 3D billboards, and bilingual campaign launches.',
      ja: '海外ブランド・海外エージェンシー向けの東京映像制作とローカルクルー。ブランドフィルム、有料ソーシャル、3Dビルボード、キャンペーンローンチをバイリンガル対応で。',
    },
    h1: {
      en: 'Video Production Company in Tokyo for International Brands',
      ja: '東京の海外ブランド向け映像制作会社',
    },
    intro: {
      en: 'Streetshow Productions provides Tokyo production support for international brands, overseas agencies, and campaign teams. We supply local crew, bilingual coordination, and premium execution for brand films, paid social, 3D billboard content, and launch campaigns.',
      ja: 'Streetshow Productionsは、海外ブランド、海外エージェンシー、キャンペーンチームに東京での制作支援を提供します。ブランドフィルム、有料ソーシャル、3Dビルボードコンテンツ、ローンチキャンペーンのために、ローカルクルー、バイリンガルコーディネート、プレミアム制作を提供します。',
    },
    trustLine: {
      en: 'Tokyo production support · English-speaking crew · Brand films, paid social, and 3D billboard launches',
      ja: '東京制作支援 · 英語対応クルー · ブランドフィルム、有料ソーシャル、3Dビルボードローンチ',
    },
    targetKeywords: [
      'video production Tokyo',
      'Tokyo video production company',
      'English-speaking video crew Tokyo',
      'commercial video production Tokyo',
      'brand film production Tokyo',
      'foreign agency production partner Tokyo',
    ],
    sections: [
      {
        heading: { en: 'Tokyo Production Support for Campaigns and Brand Launches', ja: 'キャンペーン・ブランドローンチのための東京制作支援' },
        body: {
          en: 'When an international brand or agency needs to film in Tokyo, the hard part is rarely the idea. It is local crew, permits, casting, language, and premium execution under a tight schedule. We handle all of it, so your team can direct the work without managing the logistics of a foreign city.',
          ja: '海外ブランドやエージェンシーが東京で撮影する際、難しいのはアイデアではありません。ローカルクルー、許可、キャスティング、言語、そしてタイトなスケジュールでのプレミアムな実行です。それらをすべて引き受け、御社チームは異国の都市の段取りに追われることなく、制作に集中できます。',
        },
      },
      {
        heading: { en: 'English-Speaking Production Crew in Tokyo', ja: '東京の英語対応制作クルー' },
        body: {
          en: 'Our crew works in English, Japanese, and French. That removes the friction that usually slows down foreign productions in Japan: mistranslated briefs, unclear approvals, and slow on-set communication.',
          ja: '当クルーは英語、日本語、フランス語で対応します。これにより、日本での海外制作を遅らせがちな摩擦、つまりブリーフの誤訳、不明確な承認、現場での遅いコミュニケーションを取り除きます。',
        },
      },
      {
        heading: { en: 'What We Produce in Tokyo', ja: '東京での制作内容' },
        points: [
          { en: 'Brand films and TV-quality commercials', ja: 'ブランドフィルム・放送品質のCM' },
          { en: 'Paid social and short-form campaign content', ja: '有料ソーシャル・短尺キャンペーンコンテンツ' },
          { en: '3D anamorphic billboard content for Shibuya and Shinjuku', ja: '渋谷・新宿向け3Dアナモルフィックビルボードコンテンツ' },
          { en: 'Launch events, activations, and campaign photography', ja: 'ローンチイベント、アクティベーション、キャンペーン写真' },
        ],
      },
      {
        heading: { en: 'Our Tokyo Production Process', ja: '東京での制作プロセス' },
        points: [
          { en: 'Remote briefing and pre-production alignment', ja: 'リモートブリーフィングとプリプロダクションの擦り合わせ' },
          { en: 'Local crew, casting, locations, and permits', ja: 'ローカルクルー、キャスティング、ロケーション、許可' },
          { en: 'On-set direction with bilingual coordination', ja: 'バイリンガルコーディネート付きの現場ディレクション' },
          { en: 'Post-production and delivery to global brand standards', ja: 'グローバルブランド基準でのポストプロダクション・納品' },
        ],
      },
    ],
    faqs: [
      {
        q: { en: 'Can Streetshow work with overseas agencies on Tokyo shoots?', ja: '海外エージェンシーと東京撮影で協業できますか？' },
        a: {
          en: 'Yes. Streetshow Productions works with international brands, agencies, and production teams that need Japan-based creative direction, local production support, bilingual communication, and premium execution across Tokyo and the rest of Japan.',
          ja: 'はい。Streetshow Productionsは、日本でのクリエイティブディレクション、ローカル制作支援、バイリンガルコミュニケーション、プレミアム制作を必要とする海外ブランド、エージェンシー、制作チームと、東京および日本全国で協業しています。',
        },
      },
      {
        q: { en: 'How much does video production cost in Tokyo?', ja: '東京の映像制作の費用はいくらですか？' },
        a: {
          en: 'Video production in Tokyo generally runs from ¥500,000 to ¥2,000,000+ per day depending on crew, equipment, talent, and location permits. We scope each project to the deliverables rather than quoting a fixed package.',
          ja: '東京の映像制作は、クルー、機材、タレント、ロケーション許可により、通常1日¥500,000〜¥2,000,000以上です。固定パッケージではなく、納品物に応じて各プロジェクトを設計します。',
        },
      },
      {
        q: { en: 'Do you handle 3D billboard content for Tokyo screens?', ja: '東京のスクリーン向け3Dビルボードコンテンツも対応しますか？' },
        a: {
          en: 'Yes. We produce 3D anamorphic billboard content calibrated for major Tokyo screens including Shibuya and Shinjuku, from concept and 3D modeling through to screen-specific delivery.',
          ja: 'はい。渋谷・新宿を含む東京の主要スクリーン向けに最適化した3Dアナモルフィックビルボードコンテンツを、コンセプトと3Dモデリングからスクリーン別の納品まで制作します。',
        },
      },
    ],
    relatedServices: ['video-production-japan', '3d-anamorphic-billboards-japan', 'japan-market-localization'],
    relatedProjects: ['new-balance-japan-ohtani-activation', 'charles-keith-shibuya-3d-anamorphic-billboard', 'shein-japan-paid-social-campaign'],
    cta: {
      title: { en: 'Filming in Tokyo? Bring a local partner.', ja: '東京で撮影ですか？ローカルパートナーを。' },
      body: {
        en: 'Share your campaign, schedule, and deliverables. We will assemble the Tokyo crew and production plan to match your brand standard.',
        ja: 'キャンペーン、スケジュール、納品物をお知らせください。御社のブランド基準に合う東京クルーと制作プランを編成します。',
      },
    },
  },
  {
    slug: 'english-speaking-video-crew-japan',
    kind: 'location',
    navLabel: { en: 'English-Speaking Crew in Japan', ja: '日本の英語対応クルー' },
    metaTitle: {
      en: 'English-Speaking Video Crew in Japan | Nationwide Production | Streetshow',
      ja: '日本の英語対応映像クルー｜全国制作対応｜Streetshow Productions',
    },
    metaDescription: {
      en: 'English-speaking video crew and production support in Japan for overseas brands and agencies. Crew, gear, locations, and bilingual coordination nationwide.',
      ja: '海外ブランド・エージェンシー向けの日本の英語対応映像クルーとローカル制作支援。福岡、東京、大阪、京都でクルー、機材、ロケーション、バイリンガルコーディネートを提供。',
    },
    h1: {
      en: 'English-Speaking Video Crew in Japan',
      ja: '日本の英語対応映像クルー',
    },
    intro: {
      en: 'Streetshow Productions provides an English-speaking video crew and full local production support for overseas brands, agencies, and production teams shooting in Japan. We supply crew, gear, locations, and bilingual coordination across Fukuoka, Tokyo, Osaka, Kyoto, and beyond.',
      ja: 'Streetshow Productionsは、日本で撮影する海外ブランド、エージェンシー、制作チームに、英語対応の映像クルーと完全なローカル制作支援を提供します。福岡、東京、大阪、京都、その他各地で、クルー、機材、ロケーション、バイリンガルコーディネートを提供します。',
    },
    trustLine: {
      en: 'Nationwide coverage · EN/JP/FR crew · Fixer, gear, locations, and post-production',
      ja: '全国対応 · EN/JP/FRクルー · フィクサー、機材、ロケーション、ポスト制作',
    },
    targetKeywords: [
      'English-speaking video crew Japan',
      'Japan production support',
      'video crew Japan',
      'fixer Japan production',
      'bilingual video production Japan',
      'local production company Japan',
    ],
    sections: [
      {
        heading: { en: 'Local Japan Production Support for Overseas Teams', ja: '海外チームのための日本ローカル制作支援' },
        body: {
          en: 'You have the concept and the brand. What you need in Japan is a crew that speaks your language, knows the locations, handles the permits, and delivers to a global standard. That is exactly what we provide, as a full production partner or as local support for your traveling team.',
          ja: 'コンセプトとブランドは御社にあります。日本で必要なのは、御社の言語を話し、ロケーションを知り、許可を処理し、グローバル基準で納品するクルーです。まさにそれを、フルの制作パートナーとして、あるいは出張チームへのローカル支援として提供します。',
        },
      },
      {
        heading: { en: 'Who This Is For', ja: '対象となる方' },
        points: [
          { en: 'Overseas brands producing a campaign in Japan', ja: '日本でキャンペーンを制作する海外ブランド' },
          { en: 'International agencies needing a Japan production partner', ja: '日本の制作パートナーを必要とする海外エージェンシー' },
          { en: 'Traveling directors and producers needing local crew', ja: 'ローカルクルーを必要とする出張中の監督・プロデューサー' },
          { en: 'Teams that need bilingual coordination on the ground', ja: '現場でのバイリンガルコーディネートを必要とするチーム' },
        ],
      },
      {
        heading: { en: 'Crew, Gear, Locations, and Bilingual Coordination', ja: 'クルー、機材、ロケーション、バイリンガルコーディネート' },
        points: [
          { en: 'Directors, DPs, and camera crew', ja: '監督、撮影監督、カメラクルー' },
          { en: 'Cinema and broadcast-grade equipment', ja: 'シネマ・放送グレードの機材' },
          { en: 'Location scouting, permits, and casting', ja: 'ロケハン、許可取得、キャスティング' },
          { en: 'Bilingual production coordination and translation on set', ja: '現場でのバイリンガル制作コーディネートと通訳' },
          { en: 'Post-production, subtitling, and localization', ja: 'ポストプロダクション、字幕、ローカライズ' },
        ],
      },
      {
        heading: { en: 'Production Support Across Fukuoka, Tokyo, Osaka, Kyoto, and Beyond', ja: '福岡、東京、大阪、京都、その他各地での制作支援' },
        body: {
          en: 'Our base is Fukuoka, with regular production in Tokyo, Osaka, and Kyoto. For nationwide shoots, we bring a consistent crew and standard wherever the story takes you.',
          ja: '拠点は福岡で、東京、大阪、京都で定期的に制作しています。全国撮影では、物語がどこへ向かおうと、一貫したクルーと品質でお応えします。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'What languages does your crew work in?', ja: 'クルーは何語で対応しますか？' },
        a: {
          en: 'Our crew works in English, Japanese, and French. Overseas teams can brief, direct, and review entirely in their own language while we handle Japanese-side communication and permits.',
          ja: '当クルーは英語、日本語、フランス語で対応します。海外チームは自国語でブリーフ、演出、確認ができ、日本側のコミュニケーションと許可は当方が担います。',
        },
      },
      {
        q: { en: 'Can you provide just crew and gear, or full production?', ja: 'クルーと機材だけ、または全制作、どちらも可能ですか？' },
        a: {
          en: 'Both. We work as a full production partner from concept to delivery, or as local crew, gear, and fixing support for a traveling team that already has its own direction.',
          ja: '両方可能です。コンセプトから納品までのフル制作パートナーとしても、既に自前の演出を持つ出張チームへのローカルクルー・機材・フィクサー支援としても対応します。',
        },
      },
      {
        q: { en: 'Which cities do you cover in Japan?', ja: '日本のどの都市に対応していますか？' },
        a: {
          en: 'We are based in Fukuoka and produce regularly in Tokyo, Osaka, and Kyoto, with nationwide coverage available for larger campaigns.',
          ja: '福岡を拠点に、東京、大阪、京都で定期的に制作しており、大型キャンペーンでは全国対応も可能です。',
        },
      },
    ],
    relatedServices: ['video-production-japan', 'japan-market-localization', 'photography-cgi-japan'],
    relatedProjects: ['qc-running-on-japan-activation', 'new-balance-japan-ohtani-activation'],
    cta: {
      title: { en: 'Need a crew on the ground in Japan?', ja: '日本で現地クルーが必要ですか？' },
      body: {
        en: 'Send your dates, locations, and scope. We will confirm crew availability and production support fast.',
        ja: '日程、ロケーション、範囲をお送りください。クルーの空き状況と制作支援を迅速に確認します。',
      },
    },
  },
];

// ── Industry pages ────────────────────────────────────────────────────────────
export const industryPages: LandingPage[] = [
  {
    slug: 'luxury-hospitality',
    kind: 'industry',
    navLabel: { en: 'Luxury Hospitality', ja: 'ラグジュアリーホスピタリティ' },
    metaTitle: {
      en: 'Creative Strategy & Video Production for Luxury Hotels in Japan | Streetshow',
      ja: '日本のラグジュアリーホテル向けクリエイティブ戦略・映像制作｜Streetshow',
    },
    metaDescription: {
      en: 'Creative strategy and video production for luxury hotels, resorts, and destinations in Japan. Content built to lift booking intent, not just look beautiful.',
      ja: '日本のラグジュアリーホテル、リゾート、デスティネーション施設向けのクリエイティブ戦略と映像制作。美しいだけでなく、予約意向を高めるコンテンツ。',
    },
    h1: {
      en: 'Creative Strategy and Video Production for Luxury Hotels in Japan',
      ja: '日本のラグジュアリーホテル向けクリエイティブ戦略・映像制作',
    },
    intro: {
      en: 'Streetshow Productions helps luxury hotels, resorts, restaurants, and destination properties in Japan turn beautiful spaces into booking demand. We combine creative strategy with premium production so content does more than look good. It drives reservations and protects brand perception.',
      ja: 'Streetshow Productionsは、日本のラグジュアリーホテル、リゾート、レストラン、デスティネーション施設が、美しい空間を予約需要に変えるお手伝いをします。クリエイティブ戦略とプレミアム制作を組み合わせ、コンテンツが見栄えするだけでなく、予約を生み、ブランド認知を守ります。',
    },
    trustLine: {
      en: 'Luxury hospitality focus · Booking-intent content · Ritz-Carlton and premium property experience',
      ja: 'ラグジュアリーホスピタリティ特化 · 予約意向コンテンツ · リッツ・カールトンおよびプレミアム施設の実績',
    },
    targetKeywords: [
      'hotel video production Japan',
      'luxury hotel marketing Japan',
      'hospitality creative agency Japan',
      'hotel content production Japan',
      'inbound tourism marketing Japan',
    ],
    sections: [
      {
        heading: { en: 'For Hotels, Resorts, Restaurants, and Destination Properties', ja: 'ホテル、リゾート、レストラン、デスティネーション施設のために' },
        body: {
          en: 'Premium properties often have exceptional spaces and weak digital demand. The gap is rarely the product. It is how the property is presented, localized, and surfaced to the guest who is deciding where to book.',
          ja: 'プレミアム施設は、世界水準の空間を持ちながら、デジタル需要が弱いことがよくあります。その差は、多くの場合、商品ではありません。施設がどう見せられ、ローカライズされ、予約先を選ぶゲストにどう届くかです。',
        },
      },
      {
        heading: { en: 'The Problem With Beautiful Content That Does Not Drive Bookings', ja: '予約につながらない美しいコンテンツの問題' },
        body: {
          en: 'A beautiful film that no one books from is a cost, not an asset. We start from the guest decision and work backward, so every piece of content has a job: build trust, show the experience, and move the viewer toward a reservation.',
          ja: '誰も予約しない美しい映像は、資産ではなくコストです。私たちはゲストの意思決定から逆算し、すべてのコンテンツに役割を持たせます。信頼を築き、体験を見せ、視聴者を予約へと動かすことです。',
        },
      },
      {
        heading: { en: 'What Streetshow Produces for Hospitality Brands', ja: 'ホスピタリティブランド向けの制作内容' },
        points: [
          { en: 'Hotel and resort brand films', ja: 'ホテル・リゾートのブランドフィルム' },
          { en: 'Restaurant, dining, and private event content', ja: 'レストラン、ダイニング、プライベートイベントコンテンツ' },
          { en: 'Google Maps and Instagram visual packages', ja: 'Googleマップ・Instagram向けビジュアルパッケージ' },
          { en: 'Bilingual content for inbound travelers', ja: 'インバウンド旅行者向けバイリンガルコンテンツ' },
          { en: 'Seasonal and campaign photography', ja: '季節・キャンペーン写真' },
        ],
      },
      {
        heading: { en: 'How We Improve Booking Intent', ja: '予約意向を高める方法' },
        points: [
          { en: 'Content mapped to how guests actually discover and decide', ja: 'ゲストが実際に発見し決定する流れに沿ったコンテンツ設計' },
          { en: 'Bilingual assets for domestic and inbound audiences', ja: '国内・インバウンド双方に向けたバイリンガル素材' },
          { en: 'Formats optimized for search, social, and direct booking pages', ja: '検索、ソーシャル、直接予約ページ向けに最適化した形式' },
          { en: 'Consistent premium presentation across every touchpoint', ja: 'あらゆるタッチポイントで一貫したプレミアムな見せ方' },
        ],
      },
    ],
    faqs: [
      {
        q: { en: 'How can video production increase hotel bookings in Japan?', ja: '映像制作は日本のホテル予約をどう増やしますか？' },
        a: {
          en: 'Strategic video content increases hotel bookings by showing the guest experience, property atmosphere, and unique selling points in formats optimized for Google, Instagram, and direct booking pages. Properties with professional, well-placed content see materially higher engagement on booking platforms.',
          ja: '戦略的な映像コンテンツは、ゲスト体験、施設の雰囲気、独自の強みを、Google、Instagram、直接予約ページ向けに最適化した形式で示すことで、ホテル予約を増やします。プロが制作し適切に配置されたコンテンツを持つ施設は、予約プラットフォームでのエンゲージメントが明確に高まります。',
        },
      },
      {
        q: { en: 'Do you work with luxury hotels outside Fukuoka?', ja: '福岡以外のラグジュアリーホテルとも仕事をしていますか？' },
        a: {
          en: 'Yes. Streetshow Productions works with luxury hotels and hospitality brands across Japan including Tokyo, Osaka, Kyoto, and Fukuoka. Previous hospitality work includes Ritz-Carlton properties.',
          ja: 'はい。東京、大阪、京都、福岡を含む日本全国のラグジュアリーホテル・ホスピタリティブランドと仕事をしています。過去のホスピタリティ実績にはリッツ・カールトンの案件が含まれます。',
        },
      },
      {
        q: { en: 'How do you support inbound tourism demand?', ja: 'インバウンド観光需要をどう支援しますか？' },
        a: {
          en: 'We create bilingual content packages designed for international travelers discovering properties through Google Maps, Instagram, and search, including English-facing profiles, multilingual video, and culturally adapted visuals.',
          ja: 'Googleマップ、Instagram、検索を通じて施設を発見する海外旅行者向けに、英語対応プロフィール、多言語映像、文化的に適応したビジュアルを含むバイリンガルコンテンツパッケージを制作します。',
        },
      },
    ],
    relatedServices: ['hospitality-creative-strategy-japan', 'video-production-japan', 'photography-cgi-japan'],
    relatedProjects: ['ritz-carlton-kyoto-private-dining-campaign', 'kuoe-kyoto-brand-campaign'],
    cta: {
      title: { en: 'Planning a hotel launch, repositioning, or campaign?', ja: 'ホテルのローンチ、再構築、キャンペーンを計画中ですか？' },
      body: {
        en: 'We work with selected hospitality brands where guest perception and booking intent decide whether rooms get booked. Tell us about your property.',
        ja: 'ゲスト認知と予約意向が成果に大きく影響する、厳選されたホスピタリティブランドと仕事をしています。御社の施設についてお聞かせください。',
      },
    },
  },
  {
    slug: 'international-brands-entering-japan',
    kind: 'industry',
    navLabel: { en: 'International Brands Entering Japan', ja: '日本参入の海外ブランド' },
    metaTitle: {
      en: 'Creative Partner for International Brands Entering Japan | Streetshow',
      ja: '海外ブランドの日本参入クリエイティブパートナー｜Streetshow',
    },
    metaDescription: {
      en: 'Japan launch support for global brands. Strategy, localization, production, and campaigns so your brand resonates with Japanese buyers, not just translated.',
      ja: 'グローバルブランドの日本ローンチ支援。戦略、ローカライズ、制作、キャンペーン実行で、翻訳にとどまらず日本の買い手に響くブランドへ。',
    },
    h1: {
      en: 'Creative Partner for International Brands Entering Japan',
      ja: '海外ブランドの日本市場参入クリエイティブパートナー',
    },
    intro: {
      en: 'Streetshow Productions helps global brands enter Japan with strategy, localization, production, and campaign execution under one roof. We adapt your brand for Japanese buyers so it resonates, rather than simply translating words and hoping they land.',
      ja: 'Streetshow Productionsは、グローバルブランドの日本参入を、戦略、ローカライズ、制作、キャンペーン実行のワンストップで支援します。言葉を訳して届くことを願うのではなく、日本の買い手に響くようブランドを適応させます。',
    },
    trustLine: {
      en: 'Japan market entry focus · Strategy to execution · New Balance, SHEIN, and premium brand launches',
      ja: '日本市場参入特化 · 戦略から実行まで · New Balance、SHEIN、プレミアムブランドのローンチ実績',
    },
    targetKeywords: [
      'Japan market entry agency',
      'Japan launch support',
      'foreign brand Japan marketing',
      'international brand Japan localization',
      'Japan go to market creative',
    ],
    sections: [
      {
        heading: { en: 'Japan Launch Support for Global Brands', ja: 'グローバルブランドの日本ローンチ支援' },
        body: {
          en: 'Entering Japan is not a translation project. It is a market with its own buying culture, trust signals, visual codes, and platform behavior. We give international brands a single partner for strategy, creative, and production so the launch is coherent from the first touchpoint.',
          ja: '日本参入は翻訳プロジェクトではありません。独自の購買文化、信頼シグナル、ビジュアルコード、プラットフォーム行動を持つ市場です。私たちは海外ブランドに、戦略、クリエイティブ、制作を一つのパートナーで提供し、最初のタッチポイントから一貫したローンチを実現します。',
        },
      },
      {
        heading: { en: 'Why Global Campaigns Often Fail in Japan', ja: 'グローバルキャンペーンが日本で失敗しがちな理由' },
        body: {
          en: 'Foreign campaigns fail in Japan when brands only translate words and ignore emotional context, visual codes, platform behavior, trust signals, and buying culture. Japanese consumers detect inauthenticity quickly and disengage without explanation.',
          ja: '海外キャンペーンが日本で失敗するのは、言葉だけを訳し、感情的文脈、ビジュアルコード、プラットフォーム行動、信頼シグナル、購買文化を無視するときです。日本の消費者は不自然さを素早く見抜き、説明なく離れていきます。',
        },
      },
      {
        heading: { en: 'How We Adapt Brand Messaging for Japan', ja: '日本向けにブランドメッセージを適応させる方法' },
        points: [
          { en: 'Cultural and competitive audit before creative', ja: 'クリエイティブ前の文化・競合監査' },
          { en: 'Messaging adapted to Japanese register and expectations', ja: '日本語のトーンと期待に合わせたメッセージ適応' },
          { en: 'Visual and platform adaptation, not literal translation', ja: '直訳ではないビジュアル・プラットフォーム適応' },
          { en: 'Production and campaign execution in-market', ja: '市場内での制作・キャンペーン実行' },
        ],
      },
      {
        heading: { en: 'Strategy, Localization, Production, and Launch Support', ja: '戦略、ローカライズ、制作、ローンチ支援' },
        points: [
          { en: 'Market insight and positioning for Japan', ja: '日本市場のインサイトとポジショニング' },
          { en: 'Creative localization and messaging adaptation', ja: 'クリエイティブローカライズとメッセージ適応' },
          { en: 'Video, photography, and campaign assets', ja: '映像、写真、キャンペーン素材' },
          { en: 'Landing pages, content systems, and launch execution', ja: 'ランディングページ、コンテンツシステム、ローンチ実行' },
        ],
      },
    ],
    faqs: [
      {
        q: { en: 'Do I need a Japanese agency, or can a foreign agency handle Japan?', ja: '日本のエージェンシーが必要ですか、海外でも対応可能ですか？' },
        a: {
          en: 'You need a partner who understands both worlds. A purely Japanese agency may not understand your global brand standards. A purely foreign agency will miss the cultural register Japanese consumers respond to. Streetshow bridges both.',
          ja: '両方の世界を理解するパートナーが必要です。純粋な日本のエージェンシーはグローバルブランド基準を理解できないことがあり、純粋な海外エージェンシーは日本の消費者が反応する文化的トーンを見逃します。Streetshowは両者を橋渡しします。',
        },
      },
      {
        q: { en: 'What does Japan market entry support actually include?', ja: '日本市場参入支援には具体的に何が含まれますか？' },
        a: {
          en: 'It includes market insight, messaging adaptation, video and campaign assets, landing pages, content systems, and launch support. We scope the mix to your brand, category, and timeline rather than selling a fixed package.',
          ja: '市場インサイト、メッセージ適応、映像・キャンペーン素材、ランディングページ、コンテンツシステム、ローンチ支援が含まれます。固定パッケージではなく、ブランド、カテゴリー、スケジュールに応じて構成します。',
        },
      },
      {
        q: { en: 'Which international brands have you worked with in Japan?', ja: '日本でどの海外ブランドと仕事をしましたか？' },
        a: {
          en: 'Our Japan market work includes brands such as New Balance Japan, SHEIN Japan, Charles & Keith, and others across fashion, sport, lifestyle, and e-commerce.',
          ja: '日本市場での実績には、New Balance Japan、SHEIN Japan、Charles & Keithなど、ファッション、スポーツ、ライフスタイル、ECにわたるブランドが含まれます。',
        },
      },
    ],
    relatedServices: ['japan-market-localization', 'video-production-japan', 'live-commerce-growth-japan'],
    relatedProjects: ['shein-japan-paid-social-campaign', 'new-balance-japan-ohtani-activation', 'fuditalyco-japan-market-entry'],
    cta: {
      title: { en: 'Bringing your brand to Japan?', ja: 'ブランドを日本へ展開しますか？' },
      body: {
        en: 'Tell us about your brand, category, and timeline. We will outline a Japan entry approach built around your buyer.',
        ja: 'ブランド、カテゴリー、スケジュールをお聞かせください。買い手を軸にした日本参入アプローチを提案します。',
      },
    },
  },
  {
    slug: 'restaurants-fnb-japan',
    kind: 'industry',
    navLabel: { en: 'Restaurants & F&B', ja: 'レストラン・飲食' },
    metaTitle: {
      en: 'Restaurant Video Production & Visibility Strategy in Japan | Streetshow',
      ja: '日本のレストラン映像制作・集客戦略｜Streetshow',
    },
    metaDescription: {
      en: 'Visibility strategy that helps restaurants in Japan get found, trusted, and booked. Google Maps, Instagram, and short-form video for local and inbound diners.',
      ja: '日本のレストランが見つかり、信頼され、予約されるためのコンテンツ・集客戦略。国内・インバウンドの食客に向けたGoogleマップ、Instagram、短尺動画。',
    },
    h1: {
      en: 'Restaurant Video Production and Visibility Strategy in Japan',
      ja: '日本のレストラン映像制作・集客戦略',
    },
    intro: {
      en: 'Streetshow Productions helps restaurants and F&B brands in Japan get found, trusted, and booked. We build content and a visibility system for Google Maps, Instagram, and short-form video that reaches both domestic and inbound diners.',
      ja: 'Streetshow Productionsは、日本のレストラン・飲食ブランドが見つかり、信頼され、予約されるお手伝いをします。国内・インバウンド双方の食客に届く、Googleマップ、Instagram、短尺動画向けのコンテンツと集客システムを構築します。',
    },
    trustLine: {
      en: 'Restaurant and F&B focus · Google Maps and Instagram visibility · Domestic and inbound diners',
      ja: 'レストラン・飲食特化 · Googleマップ・Instagram集客 · 国内・インバウンドの食客',
    },
    targetKeywords: [
      'restaurant video production Japan',
      'restaurant marketing Japan',
      'restaurant Google Maps Japan',
      'inbound diner marketing Japan',
      'F&B content Japan',
    ],
    sections: [
      {
        heading: { en: 'Content That Helps Restaurants Get Found, Trusted, and Booked', ja: 'レストランが見つかり、信頼され、予約されるコンテンツ' },
        body: {
          en: 'For most restaurants in Japan, the paying inbound customer opens Google Maps before Tabelog. If the profile is thin, the photos are old, and there is no English, the restaurant is effectively invisible regardless of food quality. We fix the discovery layer, not just the highlight reel.',
          ja: '日本の多くのレストランにとって、支払うインバウンド客は食べログより先にGoogleマップを開きます。プロフィールが薄く、写真が古く、英語がなければ、料理の質に関わらず、その店は事実上見えていません。私たちはハイライト映像だけでなく、発見される仕組みそのものを整えます。',
        },
      },
      {
        heading: { en: 'Why Restaurants Lose Customers on Google Maps and Instagram', ja: 'レストランがGoogleマップとInstagramで客を逃す理由' },
        points: [
          { en: 'No English description for inbound diners', ja: 'インバウンド食客向けの英語説明がない' },
          { en: 'Few reviews and stale, low-quality photos', ja: 'レビューが少なく、写真が古く低品質' },
          { en: 'No recent posts or seasonal updates', ja: '最近の投稿や季節の更新がない' },
          { en: 'Booking links that dead-end for non-Japanese users', ja: '非日本語ユーザーで行き止まりになる予約リンク' },
        ],
      },
      {
        heading: { en: 'What We Produce in One Day', ja: '1日で制作できるもの' },
        points: [
          { en: 'Food, interior, and exterior photography', ja: '料理、内装、外観の写真' },
          { en: 'Short-form video for Instagram and Google', ja: 'Instagram・Google向け短尺動画' },
          { en: 'Bilingual profile and menu content', ja: 'バイリンガルのプロフィール・メニューコンテンツ' },
          { en: 'A reusable asset library for ongoing posts', ja: '継続投稿に使える再利用可能な素材ライブラリ' },
        ],
      },
      {
        heading: { en: 'Google Maps, Instagram, Short-Form Video, and Review Visibility', ja: 'Googleマップ、Instagram、短尺動画、レビュー可視性' },
        body: {
          en: 'We treat visibility as a system: a properly built bilingual Google Business Profile, a steady cadence of posts, short-form video that travels, and a review response protocol. Done consistently, venues move from invisible to ranking within about 90 days.',
          ja: '私たちは可視性をシステムとして扱います。適切に構築されたバイリンガルのGoogleビジネスプロフィール、安定した投稿頻度、拡散する短尺動画、そしてレビュー対応の仕組みです。一貫して実行すれば、店舗はおよそ90日で「見えない」状態から上位表示へと移ります。',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Why do foreign diners skip Tabelog and use Google Maps?', ja: 'なぜ海外の食客は食べログを飛ばしてGoogleマップを使うのですか？' },
        a: {
          en: 'Foreign diners bypass Tabelog because the interface assumes local knowledge, the 3.5-star scoring norm confuses non-Japanese users, and discovery is search-first. Inbound diners drop a pin on a map and ask what is close, which is exactly where Google Maps wins.',
          ja: '海外の食客が食べログを避けるのは、インターフェースが地元の知識を前提とし、3.5点基準が非日本語ユーザーを混乱させ、発見が検索前提だからです。インバウンド客は地図にピンを落として近くの店を探します。まさにGoogleマップが強い場面です。',
        },
      },
      {
        q: { en: 'How fast can a restaurant improve its visibility?', ja: 'レストランはどのくらい早く集客を改善できますか？' },
        a: {
          en: 'Venues that consistently execute a properly built bilingual profile, regular posts, fresh photos, and fast review responses typically rank in the local map pack within about 90 days.',
          ja: '適切に構築されたバイリンガルプロフィール、定期投稿、新しい写真、迅速なレビュー対応を一貫して実行する店舗は、通常およそ90日でローカルマップパックに表示されます。',
        },
      },
      {
        q: { en: 'Do you only work with restaurants in Fukuoka?', ja: '福岡のレストランだけと仕事をするのですか？' },
        a: {
          en: 'No. We are based in Fukuoka but produce restaurant and F&B content across Japan, including Tokyo, Osaka, and Kyoto.',
          ja: 'いいえ。福岡が拠点ですが、東京、大阪、京都を含む日本全国でレストラン・飲食コンテンツを制作します。',
        },
      },
    ],
    relatedServices: ['hospitality-creative-strategy-japan', 'video-production-japan', 'photography-cgi-japan'],
    relatedProjects: ['ritz-carlton-kyoto-private-dining-campaign', 'fuditalyco-japan-market-entry'],
    cta: {
      title: { en: 'Want more foreign customers through your door?', ja: 'より多くの海外客を店に呼び込みたいですか？' },
      body: {
        en: 'We build the content and visibility system that turns Google Maps and Instagram into reservations. Apply for a restaurant content sprint.',
        ja: 'GoogleマップとInstagramを予約に変える、コンテンツと集客のシステムを構築します。レストランコンテンツスプリントにお申し込みください。',
      },
    },
  },
];

export const allLandingPages: LandingPage[] = [...locationPages, ...industryPages];

export function getLocationPage(slug: string) {
  return locationPages.find((p) => p.slug === slug);
}

export function getIndustryPage(slug: string) {
  return industryPages.find((p) => p.slug === slug);
}
