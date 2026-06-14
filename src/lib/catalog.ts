import type { Localized } from './i18n';

export type CatalogService = {
  slug: string;
  number: string;
  title: Localized;
  metaTitle: Localized;
  metaDescription: Localized;
  headline: Localized;
  description: Localized;
  intro: Localized;
  whyTitle: Localized;
  whyBody: Localized;
  mistakesTitle: Localized;
  mistakes: Localized<string[]>;
  features: Localized<string[]>;
  idealFor: Localized<string[]>;
  relatedProjects: string[];
  relatedServices: string[];
  faq: Localized<{ q: string; a: string }[]>;
};

export type CatalogProject = {
  slug: string;
  title: Localized;
  proofLine: Localized;
  client: string;
  year: string;
  category: string;
  metaTitle: Localized;
  metaDescription: Localized;
  intro: Localized;
  description: Localized;
  media: { video?: string; image?: string; alt: Localized };
  servicesProvided: Localized<string[]>;
  deliverables: Localized<string[]>;
  projectFocus: Localized<string[]>;
  caseStudy: {
    context: Localized;
    challenge: Localized;
    response: Localized;
    execution: Localized;
    outcome: Localized;
  };
  relatedServices: string[];
};

export const serviceCatalog: CatalogService[] = [
  {
    slug: 'japan-market-localization',
    number: '01',
    title: {
      en: 'Japan Market Entry & Localization',
      ja: '日本市場進出・ローカライズ',
    },
    metaTitle: {
      en: 'Japan Market Entry & Localization Agency | Streetshow',
      ja: '日本市場進出・ローカライズ エージェンシー | Streetshow',
    },
    metaDescription: {
      en: 'Japan market entry and localization for international brands. Strategy-led cultural adaptation, messaging, and creative execution from a Fukuoka and Tokyo studio.',
      ja: '海外ブランドのための日本市場進出・ローカライズ。戦略主導の文化的適応、メッセージング、クリエイティブ実行を福岡・東京のスタジオから提供します。',
    },
    headline: {
      en: 'Adapt Global Creative for Japan',
      ja: 'グローバルクリエイティブを日本市場へ最適化',
    },
    description: {
      en: 'We help international brands adapt positioning, messaging, and execution for Japan so launches feel considered, credible, and locally relevant.',
      ja: '海外ブランドのポジショニング、メッセージング、実行を日本市場向けに再構築し、現地で信頼され、文化的に共鳴するローンチを実現します。',
    },
    intro: {
      en: 'We do not just translate, we adapt. Streetshow helps premium brands reshape messaging, visuals, and execution for Japanese audiences while protecting core brand equity.',
      ja: '単なる翻訳ではなく、適応です。Streetshowは、ブランドのコアエクイティを守りながら、メッセージング・ビジュアル・実行を日本のオーディエンスに合わせて再構築します。',
    },
    whyTitle: {
      en: 'Why This Matters in Japan',
      ja: '日本市場で重要な理由',
    },
    whyBody: {
      en: 'Market entry in Japan fails when translation is mistaken for adaptation. Premium brands need positioning, messaging, and execution aligned with Japanese expectations from the start.',
      ja: '日本市場進出の失敗の多くは、翻訳を適応と取り違えることから生まれます。プレミアムブランドには、最初から日本の期待値に沿ったポジショニング・メッセージング・実行が求められます。',
    },
    mistakesTitle: {
      en: 'Where Brands Usually Get It Wrong',
      ja: 'ブランドが陥りがちな落とし穴',
    },
    mistakes: {
      en: [
        'Treating Japan like a standard regional rollout',
        'Using translation without cultural adaptation',
        'Separating strategy, localization, and production across disconnected vendors',
      ],
      ja: [
        '日本市場を他地域と同じ標準的ロールアウトとして扱う',
        '文化的適応を伴わない翻訳だけで済ませる',
        '戦略・ローカライズ・制作を分断したベンダーに分けて進める',
      ],
    },
    features: {
      en: [
        'Cultural consulting and market research',
        'Creative adaptation and transcreation',
        'Visual and messaging localization',
        'Talent and influencer coordination',
        'Media strategy for Japan',
        'Ongoing campaign optimization',
      ],
      ja: [
        '文化コンサルティングと市場調査',
        'クリエイティブ適応・トランスクリエーション',
        'ビジュアルおよびメッセージのローカライズ',
        'タレント・インフルエンサー起用・調整',
        '日本向けメディア戦略',
        '継続的なキャンペーン最適化',
      ],
    },
    idealFor: {
      en: ['Foreign brands entering Japan', 'Global campaign rollouts', 'Product launches', 'Rebranding for Japan'],
      ja: ['日本進出を予定する海外ブランド', 'グローバルキャンペーンの展開', '新商品ローンチ', '日本向けリブランディング'],
    },
    relatedProjects: ['shein-japan-paid-social-campaign', 'fuditalyco-japan-market-entry'],
    relatedServices: ['video-production-japan', 'photography-cgi-japan', 'hospitality-creative-strategy-japan'],
    faq: {
      en: [
        {
          q: 'How long does Japan market entry typically take?',
          a: 'A structured Japan market entry usually runs from three to nine months depending on category, licensing, and distribution model. Streetshow recommends sequencing positioning, localization, and a first campaign window inside the first ninety days, then scaling from there.',
        },
        {
          q: 'Is translation enough to localize a global brand for Japan?',
          a: 'No. Translation converts words. Localization adapts positioning, messaging, visual tone, pricing logic, and channel mix for Japanese expectations. Premium brands that rely on translation alone consistently underperform in Japan.',
        },
        {
          q: 'Which industries does Streetshow specialize in for Japan market entry?',
          a: 'Luxury hospitality, fashion, automotive, food and beverage, and premium e-commerce. We also support international real estate and lifestyle brands entering the Japanese market.',
        },
        {
          q: 'Can Streetshow handle bilingual campaigns in English and Japanese?',
          a: 'Yes. All Streetshow engagements are executed bilingually. Creative, copy, and client communication can run in English, Japanese, or both depending on the campaign audience.',
        },
      ],
      ja: [
        {
          q: '日本市場進出には通常どのくらいの期間が必要ですか？',
          a: '構造化された日本市場進出は、カテゴリー、ライセンス、流通モデルに応じて通常3～9ヶ月で進行します。Streetshowでは、最初の90日間にポジショニング、ローカライズ、初回キャンペーンを組み込み、その後段階的に拡大することをご提案しています。',
        },
        {
          q: 'グローバルブランドを日本向けにローカライズするには翻訳で十分ですか？',
          a: 'いいえ。翻訳は言葉を変換するだけです。ローカライズとは、日本の期待値に合わせてポジショニング、メッセージング、ビジュアルトーン、価格戦略、チャネルミックスを適応させることです。翻訳だけに頼るプレミアムブランドは、日本市場で一貫して期待値を下回ります。',
        },
        {
          q: 'Streetshowが得意とする日本市場進出の業界は？',
          a: 'ラグジュアリーホスピタリティ、ファッション、自動車、食品・飲料、プレミアムEコマースです。日本進出を図る海外の不動産・ライフスタイルブランドの支援実績もあります。',
        },
        {
          q: '英語と日本語のバイリンガルキャンペーンに対応できますか？',
          a: 'はい。Streetshowのすべてのプロジェクトはバイリンガル体制で進行します。クリエイティブ、コピー、クライアントとのコミュニケーションは、キャンペーンの対象に応じて英語、日本語、またはその両方で対応可能です。',
        },
      ],
    },
  },
  {
    slug: 'hospitality-creative-strategy-japan',
    number: '02',
    title: {
      en: 'Hospitality Creative Strategy & Production',
      ja: 'ホスピタリティ・クリエイティブ戦略＆制作',
    },
    metaTitle: {
      en: 'Luxury Hospitality Creative Agency Japan | Streetshow',
      ja: 'ラグジュアリーホスピタリティ クリエイティブエージェンシー 日本 | Streetshow',
    },
    metaDescription: {
      en: 'Luxury hotel and hospitality creative strategy in Japan. Premium video, photography, and campaign production for hotels, resorts, and destination properties.',
      ja: '日本におけるラグジュアリーホテル・ホスピタリティのクリエイティブ戦略。ホテル、リゾート、デスティネーションプロパティ向けのプレミアム映像、写真、キャンペーン制作。',
    },
    headline: {
      en: 'Creative Strategy & Content for Hotels and Hospitality Brands in Japan',
      ja: '日本のホテル・ホスピタリティブランドのための戦略とコンテンツ',
    },
    description: {
      en: 'We support luxury hotels, resorts, and destination properties with strategy-led creative designed to strengthen visibility, booking intent, and premium brand perception.',
      ja: 'ラグジュアリーホテル、リゾート、デスティネーションプロパティを対象に、露出、予約意向、プレミアムなブランド認知を高める戦略主導のクリエイティブを提供します。',
    },
    intro: {
      en: 'We help hotels, resorts, and hospitality brands in Japan increase bookings and long-term revenue through strategy-first creative.',
      ja: '戦略を起点としたクリエイティブで、日本のホテル、リゾート、ホスピタリティブランドの予約と長期的な収益成長を支援します。',
    },
    whyTitle: {
      en: 'Why This Matters in Japan',
      ja: '日本市場で重要な理由',
    },
    whyBody: {
      en: 'In luxury hospitality, visual and messaging quality directly influence trust, desirability, and booking intent. In Japan, premium perception is shaped by restraint, consistency, and local relevance.',
      ja: 'ラグジュアリーホスピタリティでは、ビジュアルとメッセージの品質が信頼、憧れ、予約意向に直接影響します。特に日本では、抑制、一貫性、ローカルな文脈が「プレミアム」の認知を形作ります。',
    },
    mistakesTitle: {
      en: 'Where Brands Usually Get It Wrong',
      ja: 'ブランドが陥りがちな落とし穴',
    },
    mistakes: {
      en: [
        'Treating hospitality content as decoration rather than revenue support',
        'Using generic luxury cues that do not resonate locally',
        'Failing to align campaign assets with guest expectations and booking behavior',
      ],
      ja: [
        'ホスピタリティコンテンツを収益支援ではなく装飾として扱う',
        '日本の文脈で響かない一般的なラグジュアリー表現を用いる',
        'キャンペーン素材を宿泊客の期待と予約行動に合わせきれていない',
      ],
    },
    features: {
      en: [
        'Hospitality-focused creative strategy',
        'Video and photography for hotels and resorts',
        'Campaign planning for peak and off-peak seasons',
        'Content systems designed to increase bookings and ROI',
        'Creative optimization for ads, social, and digital platforms',
      ],
      ja: [
        'ホスピタリティに特化したクリエイティブ戦略',
        'ホテル・リゾート向け映像・写真制作',
        'ハイシーズン・ローシーズンに合わせたキャンペーン設計',
        '予約とROIを高めるコンテンツシステム構築',
        '広告・ソーシャル・デジタルプラットフォーム向け最適化',
      ],
    },
    idealFor: {
      en: ['Luxury and boutique hotels', 'Resorts and destination properties', 'Hospitality brands entering or repositioning in Japan', 'Hotels improving online conversion'],
      ja: ['ラグジュアリー＆ブティックホテル', 'リゾート・デスティネーションプロパティ', '日本進出・再構築中のホスピタリティブランド', 'オンライン予約転換率の改善を目指すホテル'],
    },
    relatedProjects: ['ritz-carlton-kyoto-private-dining-campaign', 'kuoe-kyoto-brand-campaign'],
    relatedServices: ['video-production-japan', 'photography-cgi-japan', 'japan-market-localization'],
    faq: {
      en: [
        {
          q: 'What kinds of hotels does Streetshow work with in Japan?',
          a: 'Luxury international chains, boutique properties, resort destinations, and repositioning projects. We have supported brands including The Ritz-Carlton Kyoto and The Ritz-Carlton Osaka.',
        },
        {
          q: 'Can Streetshow produce seasonal campaigns for peak travel periods?',
          a: 'Yes. We plan hospitality campaigns around Japanese peak windows, cherry blossom, Golden Week, summer hanabi, autumn koyo, and New Year, and align creative delivery to booking lead times.',
        },
        {
          q: 'Does hospitality work include both photography and video?',
          a: 'Yes. Most hospitality engagements combine cinematography, stills photography, and campaign strategy so the visual system is coherent across web, paid media, and direct booking channels.',
        },
        {
          q: 'How do you approach luxury brand voice for Japanese audiences?',
          a: 'Japanese luxury perception is shaped by restraint, attention to detail, and cultural specificity. We adapt messaging and visual tone so properties feel credible and desirable to Japanese guests as well as international travelers.',
        },
      ],
      ja: [
        {
          q: '日本ではどのようなホテルと協業していますか？',
          a: 'ラグジュアリーな国際チェーン、ブティックホテル、リゾート、リポジショニング案件まで幅広く対応しています。ザ・リッツ・カールトン京都、ザ・リッツ・カールトン大阪などのブランドを支援してきました。',
        },
        {
          q: 'ハイシーズン向けの季節キャンペーンは制作できますか？',
          a: 'はい。桜、ゴールデンウィーク、夏の花火、紅葉、年末年始などの日本のピーク時期を軸にホスピタリティキャンペーンを設計し、予約リードタイムに合わせたクリエイティブ納品を行います。',
        },
        {
          q: 'ホスピタリティ案件では写真と映像の両方を扱いますか？',
          a: 'はい。多くのホスピタリティ案件で、シネマトグラフィ、スチール撮影、キャンペーン戦略を組み合わせ、ウェブ、ペイドメディア、直販チャネル全体で一貫したビジュアルシステムを構築します。',
        },
        {
          q: '日本のオーディエンスに向けたラグジュアリーブランドボイスはどう作りますか？',
          a: '日本のラグジュアリー認知は、抑制、細部へのこだわり、文化的な具体性によって形作られます。国内の宿泊客と海外の旅行者の双方にとって信頼と憧れを感じられるよう、メッセージとビジュアルトーンを調整します。',
        },
      ],
    },
  },
  {
    slug: 'video-production-japan',
    number: '03',
    title: {
      en: 'Video Production in Japan',
      ja: '日本での映像制作',
    },
    metaTitle: {
      en: 'Video Production Company in Japan | Streetshow Productions',
      ja: '日本の映像制作会社 | Streetshow Productions',
    },
    metaDescription: {
      en: 'Full-service video production in Japan, commercials, brand films, and social content for global brands. Local crew, bilingual operation, premium standards.',
      ja: '日本でのフルサービス映像制作。CM、ブランドフィルム、ソーシャルコンテンツをグローバルブランド向けに提供。現地クルー、バイリンガル体制、プレミアム品質。',
    },
    headline: {
      en: 'Commercials & Brand Films Made in Japan',
      ja: '日本で制作するCMとブランドフィルム',
    },
    description: {
      en: 'High-level production for premium campaigns, launches, and brand storytelling managed locally in Japan with the quality control international teams expect.',
      ja: 'プレミアムキャンペーン、ローンチ、ブランドストーリーテリングのためのハイレベルな制作を、国際チームが求める品質管理のもと日本国内でディレクションします。',
    },
    intro: {
      en: 'Full-service video production for brands targeting the Japanese market, from concept through delivery across commercials, brand films, social content, and campaign videos.',
      ja: '日本市場を狙うブランド向けのフルサービス映像制作。CM、ブランドフィルム、ソーシャルコンテンツ、キャンペーン動画までコンセプトから納品まで一貫して対応します。',
    },
    whyTitle: {
      en: 'Why This Matters in Japan',
      ja: '日本市場で重要な理由',
    },
    whyBody: {
      en: 'Premium campaigns in Japan require local control without compromising global brand standards. Production quality, local coordination, and cultural fit all influence the final result.',
      ja: '日本でのプレミアムキャンペーンは、グローバルブランド基準を妥協せず、現地でのコントロールが求められます。制作品質、現地調整、文化的適合のすべてが最終成果に影響します。',
    },
    mistakesTitle: {
      en: 'Where Brands Usually Get It Wrong',
      ja: 'ブランドが陥りがちな落とし穴',
    },
    mistakes: {
      en: [
        'Optimizing for speed instead of brand sensitivity',
        'Running production without enough local context',
        'Treating Japan as execution-only instead of a strategic market',
      ],
      ja: [
        'ブランド感度よりもスピードを優先してしまう',
        '現地の文脈が不足したまま制作を進行する',
        '日本を実行市場としてだけ扱い、戦略市場として位置づけない',
      ],
    },
    features: {
      en: [
        'Creative concept and scripting',
        'Location scouting across Japan',
        'Talent casting and coordination',
        'Full production crew',
        'Post-production and color grading',
        'Multi-format delivery',
      ],
      ja: [
        'クリエイティブコンセプトと脚本',
        '日本全国のロケハン',
        'タレントキャスティング・調整',
        'フル制作クルー',
        'ポストプロダクションとカラーグレーディング',
        'マルチフォーマット納品',
      ],
    },
    idealFor: {
      en: ['TV commercials', 'Digital advertising', 'Brand documentaries', 'Product videos'],
      ja: ['テレビCM', 'デジタル広告', 'ブランドドキュメンタリー', '商品動画'],
    },
    relatedProjects: ['new-balance-japan-ohtani-activation', 'kuoe-kyoto-brand-campaign', 'qc-running-on-japan-activation'],
    relatedServices: ['japan-market-localization', 'photography-cgi-japan', 'hospitality-creative-strategy-japan'],
    faq: {
      en: [
        {
          q: 'Does Streetshow handle video production across all of Japan?',
          a: 'Yes. Streetshow produces across Tokyo, Fukuoka, Kyoto, Osaka, and other regions of Japan. Fukuoka and Tokyo are our primary operating bases.',
        },
        {
          q: 'Can an international client manage a Japan shoot remotely?',
          a: 'Yes. We run bilingual production with international standards so global clients can approve edits, color, and delivery remotely. Pre-production alignment typically removes the need for on-site travel.',
        },
        {
          q: 'What formats do you deliver?',
          a: 'TV commercials, digital advertising cutdowns, brand films, product videos, vertical social edits, OOH loops, and long-form brand documentaries. Every project is delivered in multi-format specifications from the start.',
        },
        {
          q: 'Do you handle talent and location coordination in Japan?',
          a: 'Yes. Casting, talent coordination, location scouting, permits, and crew are handled in-house. Clients receive one point of contact across the full production.',
        },
      ],
      ja: [
        {
          q: '日本全国で映像制作に対応していますか？',
          a: 'はい。東京、福岡、京都、大阪をはじめ日本全国で制作を行っています。福岡と東京が主要拠点です。',
        },
        {
          q: '海外クライアントが日本での撮影をリモートで管理することは可能ですか？',
          a: 'はい。国際基準のバイリンガル制作体制を整えており、編集・カラー・納品の確認をリモートで行えます。事前のプリプロ調整を徹底することで、現地出張なしでも品質を担保できます。',
        },
        {
          q: 'どのような納品フォーマットに対応していますか？',
          a: 'テレビCM、デジタル広告カットダウン、ブランドフィルム、商品動画、縦型ソーシャル編集、OOHループ、長尺ブランドドキュメンタリーなど。すべてのプロジェクトで複数フォーマットを想定して設計します。',
        },
        {
          q: 'キャスティングやロケ調整も対応してもらえますか？',
          a: 'はい。キャスティング、タレント調整、ロケハン、許可取得、クルー手配まで社内で一貫対応します。クライアントはプロジェクト全体を通じて単一の窓口とやり取りできます。',
        },
      ],
    },
  },
  {
    slug: 'photography-cgi-japan',
    number: '04',
    title: {
      en: 'Photography & CGI',
      ja: 'フォトグラフィー＆CGI',
    },
    metaTitle: {
      en: 'Premium Photography & CGI Production in Japan | Streetshow',
      ja: '日本のプレミアム写真＆CGI制作 | Streetshow',
    },
    metaDescription: {
      en: 'High-end photography and CGI production across Japan. Product, editorial, hospitality, and 3D visualization for premium advertising and brand campaigns.',
      ja: '日本全国でのハイエンド写真・CGI制作。商品、エディトリアル、ホスピタリティ、3Dビジュアライゼーションをプレミアム広告・ブランドキャンペーン向けに提供します。',
    },
    headline: {
      en: 'High-End Photography & CGI Across Japan',
      ja: '日本全国のハイエンド写真＆CGI',
    },
    description: {
      en: 'Premium visual production for hospitality, lifestyle, real estate, and consumer brands that need launch-ready visual systems and long-term brand consistency.',
      ja: 'ホスピタリティ、ライフスタイル、不動産、コンシューマーブランドのためのプレミアムビジュアル制作。ローンチ対応のビジュアルシステムと長期的なブランド一貫性を提供します。',
    },
    intro: {
      en: 'From product photography to editorial shoots and CGI visuals, we deliver premium visual content for advertising, hospitality, lifestyle, and brand campaigns.',
      ja: '商品撮影からエディトリアル、CGIビジュアルまで、広告、ホスピタリティ、ライフスタイル、ブランドキャンペーン向けのプレミアムビジュアルコンテンツを制作します。',
    },
    whyTitle: {
      en: 'Why This Matters in Japan',
      ja: '日本市場で重要な理由',
    },
    whyBody: {
      en: 'Premium visual systems shape how a brand is priced and perceived. In Japan, image quality and refinement often influence trust before any message is read.',
      ja: 'プレミアムなビジュアルシステムは、ブランドの価格感と認知を左右します。日本では、メッセージを読む前に画像の品質と洗練度が信頼を決定づけることが少なくありません。',
    },
    mistakesTitle: {
      en: 'Where Brands Usually Get It Wrong',
      ja: 'ブランドが陥りがちな落とし穴',
    },
    mistakes: {
      en: [
        'Using inconsistent visuals across channels',
        'Producing images that feel generic instead of premium',
        'Underestimating how visual quality affects credibility',
      ],
      ja: [
        'チャネル間でビジュアルに一貫性がない',
        'プレミアムに感じられない一般的なイメージを制作してしまう',
        'ビジュアル品質が信頼性に与える影響を過小評価している',
      ],
    },
    features: {
      en: [
        'Product and still life photography',
        'Lifestyle and editorial shoots',
        'CGI product visualization',
        'Location scouting and coordination',
        'Studio rental and set design',
        'Post-production and retouching',
      ],
      ja: [
        '商品・静物写真',
        'ライフスタイル・エディトリアル撮影',
        'CGI商品ビジュアライゼーション',
        'ロケハン・調整',
        'スタジオ手配とセットデザイン',
        'ポストプロダクション・レタッチ',
      ],
    },
    idealFor: {
      en: ['Advertising campaigns', 'E-commerce imagery', 'Hotel and hospitality', 'Fashion and lifestyle'],
      ja: ['広告キャンペーン', 'Eコマース商品画像', 'ホテル・ホスピタリティ', 'ファッション・ライフスタイル'],
    },
    relatedProjects: ['soumei-champagne-cgi-visualization', 'tokyo-editorial-photography'],
    relatedServices: ['video-production-japan', 'japan-market-localization', 'hospitality-creative-strategy-japan'],
    faq: {
      en: [
        {
          q: 'Does Streetshow produce CGI visuals from scratch?',
          a: 'Yes. We produce full CGI visualization from concept through final render, including product visualization, packaging, and environment builds. Our SOUMEI Champagne project is an example of a complete CGI campaign built from scratch.',
        },
        {
          q: 'What photography formats do you shoot?',
          a: 'Editorial, product, lifestyle, hospitality, and campaign photography. Deliverables include print-ready files, web-optimized exports, and retouched masters.',
        },
        {
          q: 'Can Streetshow combine live photography and CGI in one campaign?',
          a: 'Yes. Most premium campaigns combine live capture with CGI elements, and we plan the pipeline so lighting, perspective, and color match seamlessly across both.',
        },
        {
          q: 'Do you handle art direction and styling in-house?',
          a: 'Yes. Art direction, styling coordination, location scouting, and post-production retouching are delivered end-to-end from a single team.',
        },
      ],
      ja: [
        {
          q: 'CGIビジュアルをゼロから制作できますか？',
          a: 'はい。コンセプトから最終レンダリングまで、商品ビジュアライゼーション、パッケージ、環境構築を含むフルCGIビジュアライゼーションを制作します。SOUMEI Champagne案件は、ゼロから構築した完全CGIキャンペーンの一例です。',
        },
        {
          q: 'どのような写真ジャンルに対応していますか？',
          a: 'エディトリアル、商品、ライフスタイル、ホスピタリティ、キャンペーン撮影に対応しています。納品物には印刷用データ、ウェブ最適化書き出し、レタッチ済みマスターが含まれます。',
        },
        {
          q: '実写とCGIを1つのキャンペーンで組み合わせられますか？',
          a: 'はい。多くのプレミアムキャンペーンで実写とCGI要素を組み合わせており、ライティング、パース、カラーが両者でシームレスに一致するようパイプラインを設計します。',
        },
        {
          q: 'アートディレクションとスタイリングも社内対応ですか？',
          a: 'はい。アートディレクション、スタイリング調整、ロケハン、ポストプロダクションのレタッチまで、単一チームでエンドツーエンドに対応します。',
        },
      ],
    },
  },
  {
    slug: '3d-anamorphic-billboards-japan',
    number: '05',
    title: {
      en: '3D Anamorphic Billboards',
      ja: '3Dアナモルフィックビルボード',
    },
    metaTitle: {
      en: '3D Anamorphic Billboards in Japan | Shibuya, Shinjuku | Streetshow',
      ja: '3Dアナモルフィックビルボード 日本 | 渋谷・新宿 | Streetshow',
    },
    metaDescription: {
      en: 'Full-service 3D anamorphic billboard production in Tokyo. From concept to Shibuya screen. Pricing starts at $50K/month. See our portfolio.',
      ja: '東京の3Dアナモルフィックビルボード制作をワンストップで。コンセプトから渋谷スクリーンまで。月額5万ドルから。ポートフォリオをご覧ください。',
    },
    headline: {
      en: 'Naked-Eye 3D That Stops Traffic',
      ja: '街を止める裸眼3D',
    },
    description: {
      en: 'High-visibility 3D billboard production for launch moments, activations, and attention-led campaigns across Japan’s major urban locations.',
      ja: '日本の主要都市でのローンチ、アクティベーション、注目を狙うキャンペーンに向けた、視認性の高い3Dビルボード制作。',
    },
    intro: {
      en: 'We create immersive 3D billboard content for premium LED screens across Japan, built to maximize visibility and launch impact.',
      ja: '日本全国のプレミアムLEDスクリーン向けに、視認性とローンチインパクトを最大化する没入型3Dビルボードコンテンツを制作します。',
    },
    whyTitle: {
      en: 'Why This Matters in Japan',
      ja: '日本市場で重要な理由',
    },
    whyBody: {
      en: 'High-visibility formats only create value when they align with launch timing, location context, and brand positioning. In Japan, spectacle without strategic fit can weaken premium perception.',
      ja: '高視認性フォーマットは、ローンチのタイミング、場所の文脈、ブランドポジショニングと揃って初めて価値を生み出します。日本では、戦略との整合性を欠いたスペクタクルはむしろプレミアム認知を損ないかねません。',
    },
    mistakesTitle: {
      en: 'Where Brands Usually Get It Wrong',
      ja: 'ブランドが陥りがちな落とし穴',
    },
    mistakes: {
      en: [
        'Using 3D billboards as a gimmick without launch strategy',
        'Designing for novelty instead of brand alignment',
        'Ignoring how OOH execution affects long-term perception',
      ],
      ja: [
        'ローンチ戦略のないまま3Dビルボードを仕掛けとして扱う',
        'ブランド整合性ではなく目新しさで設計してしまう',
        'OOH実行が長期的なブランド認知に与える影響を軽視する',
      ],
    },
    features: {
      en: [
        'Concept development and creative direction',
        '3D modeling and animation',
        'Anamorphic perspective calculation',
        'Screen-specific optimization',
        'Media placement coordination',
        'Campaign performance tracking',
      ],
      ja: [
        'コンセプト開発とクリエイティブディレクション',
        '3Dモデリング・アニメーション',
        'アナモルフィックパース計算',
        'スクリーンごとの最適化',
        'メディアバイイング・出稿調整',
        'キャンペーンパフォーマンス計測',
      ],
    },
    idealFor: {
      en: ['Product launches', 'Brand awareness campaigns', 'Market entry activations', 'Seasonal promotions'],
      ja: ['新商品ローンチ', 'ブランド認知キャンペーン', '市場進出アクティベーション', 'シーズンプロモーション'],
    },
    relatedProjects: ['charles-keith-shibuya-3d-anamorphic-billboard'],
    relatedServices: ['photography-cgi-japan', 'video-production-japan'],
    faq: {
      en: [
        {
          q: 'Which screens can Streetshow produce 3D anamorphic content for?',
          a: 'Shibuya, Shinjuku, Harajuku, Osaka, and other major urban LED screens across Japan. Each screen has its own geometry, viewing angle, and calibration requirements, and we produce content specifically for the target screen.',
        },
        {
          q: 'How long does 3D anamorphic billboard production take?',
          a: 'A typical production window runs four to eight weeks depending on complexity. This covers concept, 3D modeling, animation, anamorphic calibration, and final screen-specific delivery.',
        },
        {
          q: 'Do you coordinate media placement as well as production?',
          a: 'Yes. We coordinate screen booking, runtime scheduling, and campaign timing alongside creative production so launches hit in the right window with the right placement.',
        },
        {
          q: 'Can you deliver social cutdowns from a 3D anamorphic campaign?',
          a: 'Yes. Every 3D billboard project includes vertical social cutdowns engineered for reuse on Instagram, TikTok, and paid social so the OOH moment extends into earned and paid reach.',
        },
      ],
      ja: [
        {
          q: '3Dアナモルフィックコンテンツはどのスクリーンに対応できますか？',
          a: '渋谷、新宿、原宿、大阪など日本全国の主要都市LEDスクリーンに対応しています。各スクリーンは独自の形状、視野角、キャリブレーション要件を持つため、対象スクリーンに合わせて専用に制作します。',
        },
        {
          q: '3Dアナモルフィックビルボード制作にはどのくらいの期間がかかりますか？',
          a: '通常、複雑さに応じて4～8週間の制作期間が必要です。コンセプト、3Dモデリング、アニメーション、アナモルフィックキャリブレーション、最終納品までを含みます。',
        },
        {
          q: 'メディアバイイングも制作と一緒に対応してくれますか？',
          a: 'はい。スクリーン予約、放映スケジュール、キャンペーンタイミングをクリエイティブ制作と並行して調整し、適切な時期に適切な出稿でローンチできるようにします。',
        },
        {
          q: '3Dアナモルフィックキャンペーンからソーシャル向けカットダウンを作れますか？',
          a: 'はい。すべての3Dビルボード案件で、Instagram、TikTok、ペイドソーシャル向けに再利用できる縦型カットダウンを制作し、OOHモーメントを獲得メディアとペイドメディアへ拡張します。',
        },
      ],
    },
  },
  {
    slug: 'live-commerce-growth-japan',
    number: '06',
    title: {
      en: 'Live Commerce & Shopify Growth: Japan to Global',
      ja: 'ライブコマース＆Shopifyグロース：日本からグローバルへ',
    },
    metaTitle: {
      en: 'Live Commerce & Shopify Growth Agency Japan | Streetshow',
      ja: 'ライブコマース＆Shopifyグロースエージェンシー 日本 | Streetshow',
    },
    metaDescription: {
      en: 'Live commerce, Shopify DTC, and cross-border growth systems for Japanese brands scaling globally. Live selling, community, email, Meta and Google Ads, US and EU wholesale.',
      ja: 'グローバル展開を目指す日本ブランドのためのライブコマース、Shopify DTC、越境グロースシステム。ライブセリング、コミュニティ、メール、Meta・Google広告、米欧ホールセール。',
    },
    headline: {
      en: 'Live Commerce, Shopify DTC & Cross-Border Growth Systems',
      ja: 'ライブコマース、Shopify DTC、越境グロースシステム',
    },
    description: {
      en: 'We build full-funnel live commerce and Shopify growth systems for Japanese brands selling domestically and cross-border into the US, EU, and Asia, combining live selling, community, email, paid media, and wholesale acquisition.',
      ja: '国内販売と米・欧・アジアへの越境販売を行う日本ブランドのために、ライブセリング、コミュニティ、メール、ペイドメディア、ホールセール獲得を組み合わせたフルファネルのライブコマース＆Shopifyグロースシステムを構築します。',
    },
    intro: {
      en: 'Live commerce is how modern DTC brands turn audience into revenue in real time. Streetshow builds the full growth system, live selling on Facebook and Instagram, WhatsApp community, Shopify storefront, email lifecycle, Meta and Google Ads, and cross-border wholesale acquisition, operated from Japan, engineered for global buyers.',
      ja: 'ライブコマースは、現代のDTCブランドがオーディエンスをリアルタイムで売上に変える手法です。StreetshowはFacebook・Instagramでのライブセリング、WhatsAppコミュニティ、Shopifyストアフロント、メールライフサイクル、Meta・Google広告、越境ホールセール獲得までを含むフルグロースシステムを、日本から運用し、グローバルバイヤーに向けて設計します。',
    },
    whyTitle: {
      en: 'Why This Matters for Japanese Brands',
      ja: '日本ブランドにとって重要な理由',
    },
    whyBody: {
      en: 'Japanese brands with strong inventory and product credibility often lack the digital sales system to reach international buyers. Live commerce, community, and cross-border paid media are the fastest path from local brand to global revenue, but only when the full stack is built to work together.',
      ja: '優れた在庫と商品信頼性を持つ日本ブランドの多くは、海外バイヤーに届くためのデジタル販売システムを欠いています。ライブコマース、コミュニティ、越境ペイドメディアは、国内ブランドからグローバル売上への最短経路ですが、フルスタックを一体として構築して初めて機能します。',
    },
    mistakesTitle: {
      en: 'Where Brands Usually Get It Wrong',
      ja: 'ブランドが陥りがちな落とし穴',
    },
    mistakes: {
      en: [
        'Running Facebook Lives without a community funnel to retain buyers',
        'Launching Shopify without email lifecycle or paid acquisition to feed it',
        'Targeting only domestic buyers and ignoring higher-margin US and EU wholesale',
        'Outsourcing without training the internal team to operate the system long term',
      ],
      ja: [
        '購入者を囲い込むコミュニティファネルなしでFacebookライブを回している',
        'メールライフサイクルや有料獲得を伴わずにShopifyをローンチしてしまう',
        '国内顧客のみをターゲットにし、利益率の高い米欧ホールセールを無視している',
        '社内チームへのトレーニングを行わず外注任せで長期運用体制を築けない',
      ],
    },
    features: {
      en: [
        'Live commerce strategy and execution (Facebook and Instagram Live)',
        'WhatsApp and Telegram community building',
        'Shopify storefront setup and merchandising',
        'Email lifecycle marketing and upselling flows',
        'Meta and Google Ads (B2C and B2B tracks)',
        'Cross-border wholesale acquisition (US, EU)',
        'Internal team training and content systems handover',
      ],
      ja: [
        'ライブコマース戦略と実行（Facebook・Instagramライブ）',
        'WhatsApp・Telegramコミュニティ構築',
        'Shopifyストアフロント構築とマーチャンダイジング',
        'メールライフサイクルマーケティングとアップセルフロー',
        'Meta・Google広告（B2C／B2B両トラック）',
        '越境ホールセール獲得（米・欧）',
        '社内チームトレーニングとコンテンツシステム引き継ぎ',
      ],
    },
    idealFor: {
      en: [
        'Japanese DTC and resale brands scaling globally',
        'Luxury pre-owned and vintage sellers',
        'Shopify brands with inventory but no growth system',
        'Founders who want to keep the operation in-house long term',
      ],
      ja: [
        'グローバル展開を目指す日本のDTC・リセールブランド',
        'ラグジュアリー中古・ヴィンテージセラー',
        '在庫はあるがグロースシステムを持たないShopifyブランド',
        '長期的に運用を社内で保持したい創業者',
      ],
    },
    relatedProjects: ['jtl-japan-luxury-preowned-live-commerce'],
    relatedServices: ['japan-market-localization', 'video-production-japan', 'photography-cgi-japan'],
    faq: {
      en: [
        {
          q: 'What is live commerce and why does it work for Japanese brands?',
          a: 'Live commerce is real-time selling on platforms like Facebook Live, Instagram Live, and TikTok Live. It works for Japanese brands because it turns product credibility and host trust into immediate conversion, and it scales globally when paired with community, email, and paid acquisition.',
        },
        {
          q: 'Can Streetshow help a Japanese brand sell to the United States and Europe?',
          a: 'Yes. This is a core part of the Live Commerce & Shopify Growth service. We run Meta and Google Ads specifically targeting US and EU consumers and wholesale buyers, alongside cross-border logistics and Shopify storefront optimization.',
        },
        {
          q: 'What results can clients expect from a full live commerce growth system?',
          a: 'Results vary by category and inventory depth. As a reference point, our JTL engagement generated more than 200,000 USD in Shopify revenue in eight months through combined live commerce, community, email, and paid acquisition.',
        },
        {
          q: 'Does Streetshow train the internal client team?',
          a: 'Yes. Every Live Commerce & Shopify Growth engagement includes team training on content creation, live session hosting, and Shopify management so the client operates the system independently after handover.',
        },
      ],
      ja: [
        {
          q: 'ライブコマースとは何で、なぜ日本ブランドに有効なのですか？',
          a: 'ライブコマースとは、Facebookライブ、Instagramライブ、TikTokライブなどでのリアルタイム販売です。商品信頼性とホストの信頼を即時コンバージョンに変換できるため日本ブランドに有効であり、コミュニティ、メール、有料獲得と組み合わせることでグローバルに拡張可能です。',
        },
        {
          q: '日本ブランドの米国・欧州への販売もサポートしてもらえますか？',
          a: 'はい。ライブコマース＆Shopifyグロースサービスの中核です。米欧の消費者およびホールセールバイヤーをターゲットとしたMeta・Google広告を運用し、越境物流とShopifyストアフロント最適化も併せて実施します。',
        },
        {
          q: 'フルライブコマースグロースシステムでどのような成果が期待できますか？',
          a: 'カテゴリーや在庫規模により異なりますが、参考事例としてJTL案件では、ライブコマース、コミュニティ、メール、有料獲得を組み合わせた結果、8ヶ月で20万米ドル以上のShopify売上を生み出しました。',
        },
        {
          q: 'クライアント社内チームへのトレーニングも含まれますか？',
          a: 'はい。ライブコマース＆Shopifyグロース案件には、コンテンツ制作、ライブセッションのホスティング、Shopify運用のトレーニングが常に含まれ、引き継ぎ後はクライアント自身でシステムを運用できます。',
        },
      ],
    },
  },
];

export const projectCatalog: CatalogProject[] = [
  {
    slug: 'charles-keith-shibuya-3d-anamorphic-billboard',
    title: {
      en: 'Charles & Keith: Shibuya 3D Anamorphic Billboard',
      ja: 'Charles & Keith：渋谷3Dアナモルフィックビルボード',
    },
    proofLine: {
      en: '3D Anamorphic · OOH Activation · Shibuya, Tokyo',
      ja: '3Dアナモルフィック・OOHアクティベーション・東京 渋谷',
    },
    client: 'Charles & Keith',
    year: '2024',
    category: '3D Anamorphic',
    metaTitle: {
      en: 'Charles & Keith Shibuya 3D Anamorphic Billboard | Streetshow',
      ja: 'Charles & Keith 渋谷3Dアナモルフィックビルボード | Streetshow',
    },
    metaDescription: {
      en: 'Charles & Keith Shibuya campaign, naked-eye 3D anamorphic billboard production in Tokyo. Streetshow delivered concept, 3D animation, and screen-specific execution for Japan launch.',
      ja: 'Charles & Keithの渋谷キャンペーン、東京での裸眼3Dアナモルフィックビルボード制作。Streetshowが日本ローンチのためのコンセプト、3Dアニメーション、スクリーン特化の実行を担当。',
    },
    intro: {
      en: 'A naked-eye 3D anamorphic billboard activation for Charles & Keith in Shibuya, built to dominate one of Tokyo’s most competitive OOH environments and drive social amplification during the campaign window.',
      ja: '渋谷におけるCharles & Keithの裸眼3Dアナモルフィックビルボードアクティベーション。東京で最も競争の激しいOOH環境を制し、キャンペーン期間中のソーシャル拡散を生み出すために設計されました。',
    },
    description: {
      en: 'A Shibuya 3D billboard execution for Charles & Keith, built for visibility, social shareability, and premium launch impact in Tokyo.',
      ja: 'Charles & Keithのための渋谷3Dビルボード実行。視認性、ソーシャル拡散性、東京でのプレミアムなローンチインパクトを目的としています。',
    },
    media: {
      video: '/videos/shibuya-billboard-anamorphic.mp4',
      image: '/videos/shibuya-billboard-anamorphic.mp4',
      alt: {
        en: 'Charles & Keith 3D anamorphic billboard campaign running on Shibuya LED screen in Tokyo',
        ja: '東京・渋谷のLEDスクリーンで展開されたCharles & Keithの3Dアナモルフィックビルボードキャンペーン',
      },
    },
    servicesProvided: {
      en: ['Concept Development', '3D Modeling & Animation', 'Anamorphic Perspective Design', 'Screen-Specific Optimization', 'Social Cutdown Edits'],
      ja: ['コンセプト開発', '3Dモデリング＆アニメーション', 'アナモルフィックパース設計', 'スクリーン特化の最適化', 'ソーシャル向けカットダウン編集'],
    },
    deliverables: {
      en: ['Full 3D Billboard Content', 'Anamorphic Master File', 'Vertical Social Cutdowns', 'Launch Campaign Assets'],
      ja: ['3Dビルボード本編', 'アナモルフィックマスターファイル', '縦型ソーシャルカットダウン', 'ローンチキャンペーンアセット'],
    },
    projectFocus: {
      en: ['Launch visibility in Shibuya', 'Social shareability and earned media', 'Premium fashion brand positioning', 'OOH-to-social amplification'],
      ja: ['渋谷でのローンチ可視性', 'ソーシャル拡散と獲得メディア', 'プレミアムファッションブランドの位置付け', 'OOHからソーシャルへの拡張'],
    },
    caseStudy: {
      context: {
        en: 'Charles & Keith needed a standout activation in Shibuya that could cut through one of the world’s most saturated outdoor media environments and support brand visibility with a social-ready hero moment.',
        ja: 'Charles & Keithは、世界でも最も過密な屋外メディア環境の一つである渋谷で際立つアクティベーションを必要としており、ソーシャル拡散を前提としたヒーローモーメントによってブランド可視性を支えることが求められていました。',
      },
      challenge: {
        en: 'The creative had to feel premium and on-brand for an international fashion audience while performing technically on the Shibuya LED format, and it had to earn shareability without feeling like a gimmick.',
        ja: 'クリエイティブは、国際的なファッションオーディエンスに対してプレミアムかつブランドらしさを保ちつつ、渋谷のLEDフォーマットで技術的にも機能し、かつ仕掛け臭さを感じさせずに拡散される必要がありました。',
      },
      response: {
        en: 'We built anamorphic creative engineered specifically for the target screen geometry, with 3D motion logic tuned to audience behavior in Shibuya and the cultural expectations of a premium fashion brand in Japan.',
        ja: '対象スクリーンの形状に合わせて設計したアナモルフィッククリエイティブを構築し、渋谷のオーディエンス行動と日本におけるプレミアムファッションブランドへの文化的期待に合わせて3Dモーション設計を調整しました。',
      },
      execution: {
        en: 'Streetshow handled concept, 3D production, anamorphic calibration, and final screen-specific delivery, plus social-ready vertical cutdowns to extend reach beyond the physical OOH placement.',
        ja: 'Streetshowはコンセプト、3D制作、アナモルフィックキャリブレーション、スクリーン特化の最終納品を担当し、物理的なOOH出稿の先へリーチを広げるためのソーシャル向け縦型カットダウンも制作しました。',
      },
      outcome: {
        en: 'The activation delivered a high-visibility launch moment in Shibuya with content designed to amplify organically across social, giving Charles & Keith a premium and culturally aligned entry point into the Tokyo market.',
        ja: 'このアクティベーションは、渋谷で高視認性のローンチモーメントを生み出し、ソーシャル上でオーガニックに拡散される設計のコンテンツを通じて、Charles & Keithに東京市場への文化的に整合したプレミアムな入り口を提供しました。',
      },
    },
    relatedServices: ['3d-anamorphic-billboards-japan', 'photography-cgi-japan', 'japan-market-localization'],
  },
  {
    slug: 'new-balance-japan-ohtani-activation',
    title: {
      en: 'New Balance Japan: Shohei Ohtani Activation',
      ja: 'ニューバランスジャパン：大谷翔平アクティベーション',
    },
    proofLine: {
      en: 'Paid Media · Sports Marketing · Japan',
      ja: 'ペイドメディア・スポーツマーケティング・日本',
    },
    client: 'New Balance Japan',
    year: '2024',
    category: 'Video Production',
    metaTitle: {
      en: 'New Balance Japan Shohei Ohtani Activation | Streetshow',
      ja: 'ニューバランスジャパン 大谷翔平アクティベーション | Streetshow',
    },
    metaDescription: {
      en: 'New Balance Japan x Shohei Ohtani paid media activation produced by Streetshow Productions. Premium sports marketing campaign built for the Japanese market.',
      ja: 'Streetshow Productionsが制作したニューバランスジャパン×大谷翔平のペイドメディアアクティベーション。日本市場向けに構築されたプレミアムスポーツマーケティングキャンペーン。',
    },
    intro: {
      en: 'A paid media activation for New Balance Japan built around a Shohei Ohtani brand moment, produced for Japan-first audience relevance and premium sports marketing performance.',
      ja: '大谷翔平のブランドモーメントを軸にしたニューバランスジャパン向けペイドメディアアクティベーション。日本のオーディエンスを第一に据え、プレミアムなスポーツマーケティングパフォーマンスを目指して制作されました。',
    },
    description: {
      en: 'A paid media activation for New Balance Japan, built around a Shohei Ohtani brand moment with Japan-first cultural context and performance-led execution.',
      ja: 'ニューバランスジャパン向けのペイドメディアアクティベーション。大谷翔平のブランドモーメントを軸に、日本を起点とした文化的文脈とパフォーマンス重視の実行で構築しました。',
    },
    media: {
      video: '/videos/new-balance-ohtani.mp4',
      image: '/videos/new-balance-ohtani.mp4',
      alt: {
        en: 'New Balance Japan Shohei Ohtani paid media activation campaign video',
        ja: 'ニューバランスジャパンの大谷翔平ペイドメディアアクティベーションキャンペーン映像',
      },
    },
    servicesProvided: {
      en: ['Creative Direction', 'Paid Media Campaign Production', 'Video Editing & Motion', 'Japan Audience Localization', 'Platform Optimization'],
      ja: ['クリエイティブディレクション', 'ペイドメディアキャンペーン制作', 'ビデオ編集＆モーション', '日本向けオーディエンスローカライズ', 'プラットフォーム最適化'],
    },
    deliverables: {
      en: ['Hero Campaign Video', 'Paid Media Cutdowns', 'Vertical Social Edits', 'Multi-Format Campaign Assets'],
      ja: ['ヒーローキャンペーン映像', 'ペイドメディア向けカットダウン', '縦型ソーシャル編集', 'マルチフォーマットキャンペーンアセット'],
    },
    projectFocus: {
      en: ['Japan audience relevance', 'Premium sports marketing', 'Paid media performance', 'Cultural alignment with Japanese fans'],
      ja: ['日本オーディエンスへの親和性', 'プレミアムスポーツマーケティング', 'ペイドメディアパフォーマンス', '日本のファンとの文化的整合'],
    },
    caseStudy: {
      context: {
        en: 'New Balance Japan needed a paid media activation tied to a Shohei Ohtani brand moment, with creative built specifically for the Japanese market rather than a regional rollout of global assets.',
        ja: 'ニューバランスジャパンは、大谷翔平のブランドモーメントに連動したペイドメディアアクティベーションを必要としており、グローバルアセットの地域展開ではなく、日本市場専用に構築されたクリエイティブが求められていました。',
      },
      challenge: {
        en: 'The work had to feel credible to Japanese sports audiences, maintain global New Balance brand codes, and perform across paid media placements where attention windows are short and cultural fit is decisive.',
        ja: '本作は、日本のスポーツオーディエンスにとって信頼できるものでありながら、グローバルなニューバランスのブランドコードを保持し、注目時間が短く文化的フィットが成果を左右するペイドメディア配信でも機能する必要がありました。',
      },
      response: {
        en: 'We built creative that leaned into the cultural weight of the Ohtani moment in Japan while holding brand consistency, and structured the edit and delivery for maximum paid media efficiency across target platforms.',
        ja: '日本における大谷のモーメントが持つ文化的重みを活かしつつブランド一貫性を保ち、対象プラットフォームでペイドメディア効率を最大化するように編集と納品を設計しました。',
      },
      execution: {
        en: 'Streetshow managed creative direction, post-production, platform-specific cutdowns, and Japan localization across the paid media rollout.',
        ja: 'Streetshowはクリエイティブディレクション、ポストプロダクション、プラットフォーム別カットダウン、日本向けローカライズまで、ペイドメディアロールアウト全体を統括しました。',
      },
      outcome: {
        en: 'The activation gave New Balance Japan a culturally aligned campaign asset purpose-built for local audience resonance and paid media performance during a high-attention brand moment.',
        ja: 'このアクティベーションにより、ニューバランスジャパンは注目度の高いブランドモーメントにおいて、国内オーディエンスへの共鳴とペイドメディアパフォーマンスのために設計された文化的に整合したキャンペーンアセットを獲得しました。',
      },
    },
    relatedServices: ['video-production-japan', 'japan-market-localization'],
  },
  {
    slug: 'shein-japan-paid-social-campaign',
    title: {
      en: 'SHEIN Japan: Paid Social Activation',
      ja: 'SHEIN JAPAN：ペイドソーシャルアクティベーション',
    },
    proofLine: {
      en: 'Paid Social · Japan Market Localization · 2024',
      ja: 'ペイドソーシャル・日本市場ローカライズ・2024',
    },
    client: 'SHEIN Japan',
    year: '2024',
    category: 'Localization',
    metaTitle: {
      en: 'SHEIN Japan Paid Social Activation | Streetshow Productions',
      ja: 'SHEIN JAPAN ペイドソーシャルアクティベーション | Streetshow Productions',
    },
    metaDescription: {
      en: 'SHEIN Japan paid social campaign produced by Streetshow. Japan-first creative localization, platform-native execution, and culturally aligned content for the Japanese fashion market.',
      ja: 'StreetshowによるSHEIN Japanのペイドソーシャルキャンペーン。日本のファッション市場向けに、日本起点のクリエイティブローカライズとプラットフォームネイティブな実行、文化的に整合したコンテンツを提供。',
    },
    intro: {
      en: 'A paid social activation for SHEIN Japan, creative localization, platform-native production, and Japan-first storytelling designed to outperform translated global assets in the local market.',
      ja: 'SHEIN Japanのためのペイドソーシャルアクティベーション。翻訳されたグローバルアセットを国内市場で上回ることを目指し、クリエイティブローカライズ、プラットフォームネイティブ制作、日本起点のストーリーテリングで設計しました。',
    },
    description: {
      en: 'A paid social activation for SHEIN Japan with Japan-first creative localization and platform-native execution designed for the local fashion audience.',
      ja: '国内のファッションオーディエンス向けに設計された、日本起点のクリエイティブローカライズとプラットフォームネイティブ実行によるSHEIN Japanのペイドソーシャルアクティベーション。',
    },
    media: {
      video: '/videos/shein-japan.mp4',
      image: '/videos/shein-japan.mp4',
      alt: {
        en: 'SHEIN Japan paid social activation campaign video for the Japanese fashion market',
        ja: '日本のファッション市場向けSHEIN Japanペイドソーシャルアクティベーションキャンペーン映像',
      },
    },
    servicesProvided: {
      en: ['Japan Creative Localization', 'Paid Social Production', 'Talent & Casting', 'Platform-Native Editing', 'Cultural Strategy'],
      ja: ['日本向けクリエイティブローカライズ', 'ペイドソーシャル制作', 'タレント・キャスティング', 'プラットフォームネイティブ編集', '文化戦略'],
    },
    deliverables: {
      en: ['Vertical Paid Social Assets', 'Platform-Native Edits', 'Japan-Adapted Creative Variants', 'Campaign Asset Library'],
      ja: ['縦型ペイドソーシャルアセット', 'プラットフォームネイティブ編集', '日本向けクリエイティブバリエーション', 'キャンペーンアセットライブラリ'],
    },
    projectFocus: {
      en: ['Japan audience resonance', 'Paid social performance', 'Cultural localization beyond translation', 'Platform-native creative fit'],
      ja: ['日本オーディエンスへの共鳴', 'ペイドソーシャルパフォーマンス', '翻訳を超えた文化的ローカライズ', 'プラットフォームネイティブなクリエイティブ適合'],
    },
    caseStudy: {
      context: {
        en: 'SHEIN Japan needed paid social creative tuned specifically for Japanese audiences, not a translation of global assets, but content that would feel native on local platforms and behave credibly in-market.',
        ja: 'SHEIN Japanは、グローバルアセットの翻訳ではなく、日本のオーディエンスに合わせて調整されたペイドソーシャルクリエイティブを必要としていました。国内プラットフォーム上でネイティブに感じられ、市場で信頼される挙動を示すコンテンツが求められていました。',
      },
      challenge: {
        en: 'The brand needed to maintain a globally consistent look while adapting tone, talent, styling, and platform formatting to match Japanese user expectations and paid social performance dynamics.',
        ja: 'グローバルに一貫したルックを保ちつつ、トーン、タレント、スタイリング、プラットフォーム形式を日本のユーザー期待とペイドソーシャルのパフォーマンス特性に合わせて調整する必要がありました。',
      },
      response: {
        en: 'We approached the engagement as Japan-first creative development rather than localization-after-the-fact, shaping talent, styling, cadence, and edit pacing around how Japanese users actually consume paid social content.',
        ja: '本案件を後付けのローカライズではなく日本起点のクリエイティブ開発として捉え、日本のユーザーが実際にペイドソーシャルを消費するあり方に合わせて、タレント、スタイリング、テンポ、編集ペースを設計しました。',
      },
      execution: {
        en: 'Streetshow managed cultural direction, casting, shoot production, and platform-native edit delivery across the campaign asset set.',
        ja: 'Streetshowは、キャンペーンアセット全体にわたって文化ディレクション、キャスティング、撮影制作、プラットフォームネイティブ編集の納品を統括しました。',
      },
      outcome: {
        en: 'The campaign gave SHEIN Japan paid social content positioned to outperform translated regional assets by better matching Japanese audience expectations and native platform behavior.',
        ja: 'このキャンペーンにより、SHEIN Japanは日本のオーディエンス期待とネイティブなプラットフォーム挙動により適合し、翻訳された地域アセットを上回る位置付けのペイドソーシャルコンテンツを獲得しました。',
      },
    },
    relatedServices: ['japan-market-localization', 'video-production-japan', 'photography-cgi-japan'],
  },
  {
    slug: 'kuoe-kyoto-brand-campaign',
    title: {
      en: 'KUOE Kyoto: Brand Film Campaign',
      ja: 'KUOE 京都：ブランドフィルムキャンペーン',
    },
    proofLine: {
      en: 'Brand Film · Japanese Microbrand Watches · Kyoto',
      ja: 'ブランドフィルム・日本マイクロブランド時計・京都',
    },
    client: 'KUOE Kyoto',
    year: '2024',
    category: 'Video Production',
    metaTitle: {
      en: 'KUOE Kyoto Brand Film Campaign | Streetshow Productions',
      ja: 'KUOE 京都 ブランドフィルムキャンペーン | Streetshow Productions',
    },
    metaDescription: {
      en: 'KUOE Kyoto brand film campaign by Streetshow Productions. Premium video production for the Japanese microbrand watchmaker founded in 2020 by Kenji Uchimura in Kyoto.',
      ja: 'Streetshow ProductionsによるKUOE 京都のブランドフィルムキャンペーン。2020年に内村健司氏が京都で創業した日本マイクロブランド時計メーカー向けのプレミアム映像制作。',
    },
    intro: {
      en: 'A brand film campaign for KUOE Kyoto, the Japanese microbrand watchmaker founded in Kyoto in 2020 by Kenji Uchimura, produced to communicate classic design heritage, hand-assembled craftsmanship, and the refined mid-20th-century aesthetic at the core of the brand.',
      ja: '2020年に内村健司氏が京都で創業した日本のマイクロブランド時計メーカー、KUOE 京都のブランドフィルムキャンペーン。クラシックデザインの系譜、手組みによるクラフツマンシップ、そしてブランドの核にある20世紀半ばの洗練された美学を伝えるために制作しました。',
    },
    description: {
      en: 'A brand film campaign for KUOE Kyoto, the Japanese microbrand watchmaker founded in 2020, communicating classic design and hand-assembled Kyoto craftsmanship.',
      ja: '2020年創業の日本マイクロブランド時計メーカー、KUOE 京都のブランドフィルムキャンペーン。クラシックデザインと京都で手組みされるクラフツマンシップを伝えます。',
    },
    media: {
      video: '/videos/kuoe-kyoto.mp4',
      image: '/videos/kuoe-kyoto.mp4',
      alt: {
        en: 'KUOE Kyoto brand film: Japanese microbrand watches hand-assembled in Kyoto, founded 2020 by Kenji Uchimura',
        ja: 'KUOE 京都ブランドフィルム：内村健司氏により2020年に京都で創業された、手組みの日本マイクロブランド時計',
      },
    },
    servicesProvided: {
      en: ['Creative Direction', 'Brand Film Production', 'Location Production in Kyoto', 'Product-Led Styling & Art Direction', 'Post-Production & Color'],
      ja: ['クリエイティブディレクション', 'ブランドフィルム制作', '京都ロケーション制作', '商品主導のスタイリング＆アートディレクション', 'ポストプロダクション＆カラー'],
    },
    deliverables: {
      en: ['Hero Brand Film', 'Product-Focused Cutdowns', 'Social & Digital Campaign Assets', 'Launch-Ready Edit Variants'],
      ja: ['ヒーローブランドフィルム', '商品にフォーカスしたカットダウン', 'ソーシャル＆デジタルキャンペーンアセット', 'ローンチ対応編集バリエーション'],
    },
    projectFocus: {
      en: ['Microbrand heritage storytelling', 'Mid-20th-century design aesthetic', 'Hand-assembled Kyoto craftsmanship', 'International watch community reach'],
      ja: ['マイクロブランドの系譜のストーリーテリング', '20世紀半ばのデザイン美学', '京都で手組みされるクラフツマンシップ', '国際的な時計コミュニティへのリーチ'],
    },
    caseStudy: {
      context: {
        en: 'KUOE Kyoto, the Japanese microbrand watchmaker established in Kyoto in 2020 by Kenji Uchimura, needed brand film content that could communicate its classic, hand-assembled design philosophy and the mid-20th-century aesthetic that defines models like the Old Smith 90-001.',
        ja: '2020年に内村健司氏が京都で創業した日本のマイクロブランド時計メーカー、KUOE 京都は、クラシックで手組みのデザイン哲学と、Old Smith 90-001などのモデルに象徴される20世紀半ばの美学を伝えられるブランドフィルムコンテンツを必要としていました。',
      },
      challenge: {
        en: 'The work needed to reach an international watch-enthusiast audience while staying authentically rooted in Kyoto craftsmanship, and it had to communicate heritage and product detail without leaning on tourist shorthand or losing microbrand intimacy.',
        ja: '本作は、京都のクラフツマンシップに本質的に根差しながら、国際的な時計愛好家層へ届く必要があり、観光的な常套句に頼らず、マイクロブランドの親密さを失うことなく、系譜と商品のディテールを伝える必要がありました。',
      },
      response: {
        en: 'We built a creative direction around restraint, material close-ups, and Kyoto workshop atmosphere, production choices designed to let the watches carry the narrative and to position KUOE as a serious classic-design microbrand for global watch collectors.',
        ja: '抑制、素材のクローズアップ、京都の工房の空気感を軸にクリエイティブディレクションを構築しました。時計自体がナラティブを担うように制作上の選択を行い、グローバルな時計コレクターに向けてKUOEを本格的なクラシックデザインのマイクロブランドとして位置付けました。',
      },
      execution: {
        en: 'Streetshow led creative direction, location production in Kyoto, product styling, and post-production, delivering a cohesive brand film asset set aligned with KUOE’s existing visual identity.',
        ja: 'Streetshowはクリエイティブディレクション、京都でのロケーション制作、商品スタイリング、ポストプロダクションまでを主導し、KUOEの既存のビジュアルアイデンティティと整合する一貫したブランドフィルムアセットを納品しました。',
      },
      outcome: {
        en: 'The finished work gave KUOE Kyoto a premium brand film system aligned with its microbrand positioning and ready for rollout across its own channels, retailers, and the international watch enthusiast community.',
        ja: '最終的な成果物は、KUOE 京都にマイクロブランドのポジショニングと整合したプレミアムなブランドフィルムシステムを提供し、自社チャネル、リテーラー、国際的な時計愛好家コミュニティへの展開に対応しました。',
      },
    },
    relatedServices: ['video-production-japan', 'hospitality-creative-strategy-japan', 'photography-cgi-japan'],
  },
  {
    slug: 'ritz-carlton-kyoto-private-dining-campaign',
    title: {
      en: 'The Ritz-Carlton, Kyoto: Private Dining Campaign',
      ja: 'ザ・リッツ・カールトン京都：プライベートダイニングキャンペーン',
    },
    proofLine: {
      en: 'Hospitality · Luxury Hotel Video · Kyoto',
      ja: 'ホスピタリティ・ラグジュアリーホテル映像・京都',
    },
    client: 'The Ritz-Carlton, Kyoto',
    year: '2024',
    category: 'Hospitality',
    metaTitle: {
      en: 'The Ritz-Carlton Kyoto Private Dining Campaign | Streetshow',
      ja: 'ザ・リッツ・カールトン京都 プライベートダイニングキャンペーン | Streetshow',
    },
    metaDescription: {
      en: 'The Ritz-Carlton, Kyoto private dining campaign produced by Streetshow Productions. Luxury hospitality video for hotel marketing, booking conversion, and premium brand perception.',
      ja: 'Streetshow Productionsが制作したザ・リッツ・カールトン京都のプライベートダイニングキャンペーン。ホテルマーケティング、予約転換、プレミアムなブランド認知に向けたラグジュアリーホスピタリティ映像。',
    },
    intro: {
      en: 'A hospitality campaign for The Ritz-Carlton, Kyoto, built around a private dining moment, produced to support premium brand perception, booking intent, and on-brand execution for one of Japan’s most recognized luxury hotel names.',
      ja: 'ザ・リッツ・カールトン京都のためのホスピタリティキャンペーン。プライベートダイニングのひとときを軸に、日本で最も認知されたラグジュアリーホテルの一つに対するプレミアムなブランド認知、予約意向、ブランド整合の実行を支えるために制作されました。',
    },
    description: {
      en: 'A private dining campaign for The Ritz-Carlton, Kyoto, built to support premium perception and booking intent across digital hospitality channels.',
      ja: 'ザ・リッツ・カールトン京都のためのプライベートダイニングキャンペーン。デジタルホスピタリティチャネル全体でプレミアムな認知と予約意向を支える設計です。',
    },
    media: {
      video: '/videos/ritz-carlton-kyoto.mp4',
      image: '/videos/ritz-carlton-kyoto.mp4',
      alt: {
        en: 'The Ritz-Carlton Kyoto private dining hospitality campaign video produced by Streetshow Productions',
        ja: 'Streetshow Productionsが制作したザ・リッツ・カールトン京都プライベートダイニングホスピタリティキャンペーン映像',
      },
    },
    servicesProvided: {
      en: ['Hospitality Creative Strategy', 'On-Property Video Production', 'F&B Styling Direction', 'Post-Production & Color', 'Digital Asset Delivery'],
      ja: ['ホスピタリティクリエイティブ戦略', '館内映像制作', 'F&Bスタイリングディレクション', 'ポストプロダクション＆カラー', 'デジタルアセット納品'],
    },
    deliverables: {
      en: ['Hero Hospitality Video', 'Social Cutdowns', 'Digital Campaign Assets', 'Booking-Channel Optimized Edits'],
      ja: ['ヒーローホスピタリティ映像', 'ソーシャルカットダウン', 'デジタルキャンペーンアセット', '予約チャネル最適化編集'],
    },
    projectFocus: {
      en: ['Premium hospitality perception', 'Booking intent and conversion', 'Luxury F&B storytelling', 'On-brand Ritz-Carlton execution'],
      ja: ['プレミアムなホスピタリティ認知', '予約意向と転換', 'ラグジュアリーF&Bストーリーテリング', 'リッツ・カールトン ブランドに整合した実行'],
    },
    caseStudy: {
      context: {
        en: 'The Ritz-Carlton, Kyoto needed a premium video asset tied to a private dining moment, content that could support brand perception, booking intent, and hospitality marketing across digital channels.',
        ja: 'ザ・リッツ・カールトン京都は、プライベートダイニングのひとときに紐づくプレミアムな映像アセットを必要としており、デジタルチャネル全体でブランド認知、予約意向、ホスピタリティマーケティングを支えるコンテンツが求められていました。',
      },
      challenge: {
        en: 'The production had to meet Ritz-Carlton global brand standards, reflect the refinement of a Kyoto luxury dining experience, and deliver cleanly across social and booking-channel formats.',
        ja: '本制作は、リッツ・カールトンのグローバルブランド基準を満たし、京都のラグジュアリーダイニング体験の洗練を反映し、ソーシャルおよび予約チャネル各フォーマットで明確に機能する必要がありました。',
      },
      response: {
        en: 'We shaped a production approach built on controlled pacing, restrained styling, and guest-experience framing aligned with both global luxury hotel codes and local Japanese hospitality cues.',
        ja: '制御されたペーシング、抑制されたスタイリング、ゲスト体験視点のフレーミングを軸にした制作アプローチを構築し、グローバルラグジュアリーホテルのコードと日本のホスピタリティの文脈の双方に整合させました。',
      },
      execution: {
        en: 'Streetshow delivered creative direction, on-property production, F&B styling coordination, and post-production for a multi-format hospitality asset set.',
        ja: 'Streetshowはクリエイティブディレクション、館内制作、F&Bスタイリング調整、ポストプロダクションまでを担当し、マルチフォーマットのホスピタリティアセットセットを納品しました。',
      },
      outcome: {
        en: 'The finished work gave The Ritz-Carlton, Kyoto a premium hospitality asset engineered to support brand perception, private dining promotion, and hotel marketing performance.',
        ja: '最終的な成果物は、ザ・リッツ・カールトン京都に対し、ブランド認知、プライベートダイニングのプロモーション、ホテルマーケティングパフォーマンスを支えるよう設計されたプレミアムホスピタリティアセットを提供しました。',
      },
    },
    relatedServices: ['hospitality-creative-strategy-japan', 'video-production-japan', 'photography-cgi-japan'],
  },
  {
    slug: 'qc-running-on-japan-activation',
    title: {
      en: 'QC Running × On: Japan Activation',
      ja: 'QC Running × On：ジャパンアクティベーション',
    },
    proofLine: {
      en: 'Paid Social · Running & Sportswear · Japan',
      ja: 'ペイドソーシャル・ランニング＆スポーツウェア・日本',
    },
    client: 'QC Running × On Japan',
    year: '2025',
    category: 'Paid Social',
    metaTitle: {
      en: 'QC Running × On Japan Activation | Streetshow Productions',
      ja: 'QC Running × On Japan アクティベーション | Streetshow Productions',
    },
    metaDescription: {
      en: 'QC Running x On Japan paid social activation produced by Streetshow. Sportswear campaign creative built for Japanese running community engagement and performance-led paid social.',
      ja: 'StreetshowによるQC Running × On Japanのペイドソーシャルアクティベーション。日本のランニングコミュニティのエンゲージメントと成果重視のペイドソーシャルに向けて構築されたスポーツウェアキャンペーンクリエイティブ。',
    },
    intro: {
      en: 'A paid social activation for QC Running and On Japan, built around the local Tokyo running community with vertical-first creative engineered for sportswear brand engagement and paid media performance.',
      ja: 'QC RunningとOn Japanのためのペイドソーシャルアクティベーション。東京のローカルランニングコミュニティを軸に、スポーツウェアブランドのエンゲージメントとペイドメディアのパフォーマンスを狙う縦型ファーストのクリエイティブで構築しました。',
    },
    description: {
      en: 'A paid social activation for QC Running x On Japan, built around the Tokyo running community with vertical-first creative for sportswear engagement.',
      ja: 'QC Running × On Japanのペイドソーシャルアクティベーション。東京のランニングコミュニティを軸に、スポーツウェアエンゲージメント向けの縦型ファーストクリエイティブで構築しました。',
    },
    media: {
      video: '/videos/qc-running-on-japan.mp4',
      image: '/videos/qc-running-on-japan.mp4',
      alt: {
        en: 'QC Running x On Japan paid social activation campaign video for the Japanese running community',
        ja: '日本のランニングコミュニティ向けQC Running × On Japanペイドソーシャルアクティベーションキャンペーン映像',
      },
    },
    servicesProvided: {
      en: ['Creative Direction', 'Paid Social Video Production', 'Community-Led Casting', 'Vertical Edit Delivery', 'Campaign Strategy'],
      ja: ['クリエイティブディレクション', 'ペイドソーシャル映像制作', 'コミュニティ主導キャスティング', '縦型編集納品', 'キャンペーン戦略'],
    },
    deliverables: {
      en: ['Vertical Paid Social Hero', 'Platform-Native Cutdowns', 'Community-Focused Edits', 'Multi-Format Campaign Assets'],
      ja: ['縦型ペイドソーシャルヒーロー', 'プラットフォームネイティブカットダウン', 'コミュニティ重視の編集', 'マルチフォーマットキャンペーンアセット'],
    },
    projectFocus: {
      en: ['Japanese running community relevance', 'Paid social performance', 'Sportswear brand engagement', 'Authentic local execution'],
      ja: ['日本ランニングコミュニティへの親和性', 'ペイドソーシャルパフォーマンス', 'スポーツウェアブランドエンゲージメント', '本質的なローカル実行'],
    },
    caseStudy: {
      context: {
        en: 'QC Running and On Japan needed paid social creative tied to the Tokyo running community, content that could move beyond generic sportswear aesthetics and feel credible to local runners.',
        ja: 'QC RunningとOn Japanは、東京のランニングコミュニティに根差したペイドソーシャルクリエイティブを必要としており、一般的なスポーツウェア美学を超え、ローカルランナーにとって信頼できるコンテンツが求められていました。',
      },
      challenge: {
        en: 'The work had to balance the performance-brand codes of On with the authentic community voice of QC Running while performing across vertical paid social placements where authenticity drives results.',
        ja: '本作は、Onのパフォーマンスブランドコードと、QC Runningのコミュニティとしての本質的な声のバランスを取りつつ、真正性が成果を左右する縦型ペイドソーシャル配信で機能する必要がありました。',
      },
      response: {
        en: 'We centered production on real community context, building creative around runner moments rather than studio polish, and structured the edits for platform-native delivery and paid social efficiency.',
        ja: '制作はリアルなコミュニティの文脈を軸に据え、スタジオ的な磨き上げよりもランナーのモーメントにクリエイティブを置き、プラットフォームネイティブな納品とペイドソーシャルの効率のために編集を設計しました。',
      },
      execution: {
        en: 'Streetshow handled creative direction, production, vertical edit delivery, and platform optimization across the activation.',
        ja: 'Streetshowはアクティベーション全体にわたってクリエイティブディレクション、制作、縦型編集納品、プラットフォーム最適化を担当しました。',
      },
      outcome: {
        en: 'The activation gave QC Running and On Japan paid social content designed to resonate with the local running community and support sportswear brand engagement in the Japanese market.',
        ja: 'このアクティベーションにより、QC RunningとOn Japanは、国内ランニングコミュニティに共鳴し、日本市場でのスポーツウェアブランドエンゲージメントを支えるように設計されたペイドソーシャルコンテンツを獲得しました。',
      },
    },
    relatedServices: ['video-production-japan', 'japan-market-localization'],
  },
  {
    slug: 'fuditalyco-japan-market-entry',
    title: {
      en: 'FUDITALYCO: Puglia to Japan Launch Campaign',
      ja: 'FUDITALYCO：プーリアから日本へのローンチキャンペーン',
    },
    proofLine: {
      en: 'Japan Market Entry · Italian F&B · Puglia Heritage',
      ja: '日本市場進出・イタリアF&B・プーリアの系譜',
    },
    client: 'FUDITALYCO',
    year: '2024',
    category: 'Localization',
    metaTitle: {
      en: 'FUDITALYCO Puglia Japan Launch Campaign | Streetshow',
      ja: 'FUDITALYCO プーリア日本ローンチキャンペーン | Streetshow',
    },
    metaDescription: {
      en: 'FUDITALYCO Japan market entry campaign produced by Streetshow. Authentic Puglia heritage brand, pasta sauce, olive oil, wine, and pasta, brought to Japanese tables across three generations of the Francavilla family.',
      ja: 'Streetshowが制作したFUDITALYCOの日本市場進出キャンペーン。プーリアの伝統を受け継ぐブランドが、パスタソース、オリーブオイル、ワイン、パスタをフランカヴィッラ家三世代にわたる系譜とともに日本の食卓へ。',
    },
    intro: {
      en: 'A Japan market entry campaign for FUDITALYCO, the Puglia-rooted family food brand founded by Matteo Francavilla, built to bring three generations of Italian heritage recipes, pasta sauce, olive oil, wine, and pasta directly to Japanese tables.',
      ja: 'マッテオ・フランカヴィッラによって創業されたプーリア発のファミリーフードブランド、FUDITALYCOの日本市場進出キャンペーン。三世代にわたるイタリアの家族のレシピ——パスタソース、オリーブオイル、ワイン、パスタ——を直接日本の食卓へ届けるために構築しました。',
    },
    description: {
      en: 'A Japan market entry campaign for FUDITALYCO, bringing three generations of Francavilla family heritage from Puglia, pasta sauce, olive oil, wine, and pasta, to Japanese tables.',
      ja: 'FUDITALYCOの日本市場進出キャンペーン。プーリアのフランカヴィッラ家三世代の系譜——パスタソース、オリーブオイル、ワイン、パスタ——を日本の食卓へ届けます。',
    },
    media: {
      video: '/videos/fuditalyco-japan.mp4',
      image: '/videos/fuditalyco-japan.mp4',
      alt: {
        en: 'FUDITALYCO Japan launch campaign: Puglia Italian food brand featuring pasta sauce, olive oil, wine, and pasta from the Francavilla family',
        ja: 'FUDITALYCO 日本ローンチキャンペーン：フランカヴィッラ家によるパスタソース、オリーブオイル、ワイン、パスタを特色とするプーリアのイタリアンフードブランド',
      },
    },
    servicesProvided: {
      en: ['Japan Market Entry Strategy', 'Italian F&B Creative Direction', 'Food-Led Video Production', 'Heritage Brand Storytelling', 'Japan Launch Campaign Assets'],
      ja: ['日本市場進出戦略', 'イタリアF&Bクリエイティブディレクション', 'フード主導の映像制作', '系譜を軸にしたブランドストーリーテリング', '日本ローンチキャンペーンアセット'],
    },
    deliverables: {
      en: ['Japan Launch Brand Film', 'Product-Focused Social Cutdowns', 'Digital Launch Assets', 'Market-Specific Creative Variants'],
      ja: ['日本ローンチブランドフィルム', '商品フォーカスのソーシャルカットダウン', 'デジタルローンチアセット', '市場特化のクリエイティブバリエーション'],
    },
    projectFocus: {
      en: ['Puglia heritage storytelling', 'Three-generation family narrative', 'Japan F&B market entry', 'Authentic Italian positioning for Japanese audiences'],
      ja: ['プーリアの系譜のストーリーテリング', '三世代にわたる家族のナラティブ', '日本F&B市場への参入', '日本のオーディエンス向けの本質的なイタリアンポジショニング'],
    },
    caseStudy: {
      context: {
        en: 'FUDITALYCO needed a Japan market entry campaign that could communicate the authenticity of a Puglia-rooted family food brand, carrying recipes preserved across three generations of the Francavilla family, from founder Matteo Francavilla through to the current generation, and bring its pasta sauce, olive oil, wine, and pasta to Japanese tables with the same heritage cues used in Italy.',
        ja: 'FUDITALYCOは、プーリアに根差したファミリーフードブランドの真正性を伝える日本市場進出キャンペーンを必要としていました。創業者マッテオ・フランカヴィッラから現世代までフランカヴィッラ家三世代にわたって受け継がれるレシピを運び、イタリアで用いられているのと同じ系譜的文脈のもとで、パスタソース、オリーブオイル、ワイン、パスタを日本の食卓へ届けることが求められていました。',
      },
      challenge: {
        en: 'The brand story had to translate across cultures without flattening its Puglia specificity. The work needed to honor the family heritage narrative, preserve the ripe-tomato recipe tradition at the heart of the brand, and adapt tone and food presentation for Japanese audiences who hold high expectations around quality, provenance, and authenticity in imported F&B.',
        ja: 'ブランドストーリーは、プーリアの固有性を平板化することなく文化をまたいで伝わる必要がありました。家族の系譜のナラティブを尊重し、ブランドの核にある完熟トマトのレシピ伝統を守りつつ、輸入F&Bにおける品質、産地、真正性に高い期待を持つ日本のオーディエンスに向けてトーンと料理の表現を適応させる必要がありました。',
      },
      response: {
        en: 'We approached the campaign as a heritage-first launch rather than a generic localization exercise, building creative around the Francavilla family story, the land and products of Puglia, and the direct line from Italian family kitchen to Japanese table, while tuning pacing and food styling to feel credible for a Japanese F&B audience.',
        ja: '本キャンペーンを汎用的なローカライズではなく系譜を起点としたローンチとして捉え、フランカヴィッラ家のストーリー、プーリアの土地と産品、イタリアの家庭の台所から日本の食卓へ直結する線を軸にクリエイティブを構築し、日本のF&Bオーディエンスに対して信頼されるようペーシングとフードスタイリングを調整しました。',
      },
      execution: {
        en: 'Streetshow handled creative direction, production, cultural adaptation, and delivery of launch assets across digital channels, with attention to product presentation for pasta sauce, olive oil, wine, and pasta SKUs.',
        ja: 'Streetshowはクリエイティブディレクション、制作、文化的適応、デジタルチャネルでのローンチアセット納品までを担当し、パスタソース、オリーブオイル、ワイン、パスタ各SKUの商品表現に細心の注意を払いました。',
      },
      outcome: {
        en: 'The campaign gave FUDITALYCO a launch asset set built to carry its Puglia heritage and three-generation Francavilla family story into the Japanese market, supporting market entry visibility and premium positioning in the imported Italian F&B category.',
        ja: 'このキャンペーンにより、FUDITALYCOはプーリアの系譜とフランカヴィッラ家三世代の物語を日本市場へ届けるためのローンチアセットを獲得し、輸入イタリアンF&Bカテゴリーにおける市場参入の可視性とプレミアムなポジショニングを支えました。',
      },
    },
    relatedServices: ['japan-market-localization', 'video-production-japan', 'photography-cgi-japan'],
  },
  {
    slug: 'soumei-champagne-cgi-visualization',
    title: {
      en: 'SOUMEI Champagne: CGI Product Visualization',
      ja: 'SOUMEI シャンパーニュ：CGI商品ビジュアライゼーション',
    },
    proofLine: {
      en: 'CGI · Luxury Beverage · Product Design',
      ja: 'CGI・ラグジュアリービバレッジ・プロダクトデザイン',
    },
    client: 'SOUMEI Champagne',
    year: '2025',
    category: 'CGI',
    metaTitle: {
      en: 'SOUMEI Champagne CGI Product Visualization | Streetshow',
      ja: 'SOUMEI シャンパーニュ CGI商品ビジュアライゼーション | Streetshow',
    },
    metaDescription: {
      en: 'SOUMEI Champagne CGI product visualization by Streetshow Productions. Full bottle design, photoreal 3D rendering, and brand animation for a premium champagne label.',
      ja: 'Streetshow ProductionsによるSOUMEI シャンパーニュのCGI商品ビジュアライゼーション。プレミアムシャンパーニュブランド向けのフルボトルデザイン、フォトリアル3Dレンダリング、ブランドアニメーション。',
    },
    intro: {
      en: 'Full CGI product visualization for SOUMEI Champagne, bottle design, photoreal 3D rendering, and brand animation produced from scratch to support premium product storytelling and launch marketing.',
      ja: 'SOUMEI シャンパーニュのためのフルCGI商品ビジュアライゼーション。ボトルデザイン、フォトリアル3Dレンダリング、ブランドアニメーションをゼロから制作し、プレミアムな商品ストーリーテリングとローンチマーケティングを支えます。',
    },
    description: {
      en: 'Full CGI product visualization for SOUMEI Champagne, bottle design, 3D rendering, and brand animation produced from scratch for premium launch marketing.',
      ja: 'SOUMEI シャンパーニュのフルCGI商品ビジュアライゼーション。ボトルデザイン、3Dレンダリング、ブランドアニメーションをゼロから制作し、プレミアムローンチマーケティングに活用します。',
    },
    media: {
      video: '/videos/soumei-cgi.mp4',
      image: '/videos/soumei-cgi.mp4',
      alt: {
        en: 'SOUMEI Champagne CGI product visualization: 3D bottle rendering and brand animation by Streetshow',
        ja: 'SOUMEI シャンパーニュ CGI商品ビジュアライゼーション：Streetshowによる3Dボトルレンダリングとブランドアニメーション',
      },
    },
    servicesProvided: {
      en: ['Product Design from Scratch', '3D Bottle Modeling', 'Photoreal CGI Rendering', 'Brand Animation', 'Key Visual Creation'],
      ja: ['ゼロからのプロダクトデザイン', '3Dボトルモデリング', 'フォトリアルCGIレンダリング', 'ブランドアニメーション', 'キービジュアル制作'],
    },
    deliverables: {
      en: ['CGI Brand Animation', '3D Bottle Renders', 'Key Visuals', 'Multi-Format Launch Assets'],
      ja: ['CGIブランドアニメーション', '3Dボトルレンダリング', 'キービジュアル', 'マルチフォーマットローンチアセット'],
    },
    projectFocus: {
      en: ['Premium luxury beverage positioning', 'Product storytelling via CGI', 'Launch campaign asset system', 'Photoreal brand refinement'],
      ja: ['プレミアムラグジュアリービバレッジのポジショニング', 'CGIによる商品ストーリーテリング', 'ローンチキャンペーンアセットシステム', 'フォトリアルなブランド洗練'],
    },
    caseStudy: {
      context: {
        en: 'SOUMEI Champagne needed a premium product visualization system, built fully in CGI, including bottle design from scratch, to support brand launch and category positioning in a luxury beverage market where visual refinement directly drives perceived price.',
        ja: 'SOUMEI シャンパーニュは、ビジュアルの洗練が知覚価格を直接左右するラグジュアリービバレッジ市場において、ブランドローンチとカテゴリーポジショニングを支えるため、ボトルデザインをゼロから含むフルCGIのプレミアム商品ビジュアライゼーションシステムを必要としていました。',
      },
      challenge: {
        en: 'The visuals had to reach photoreal quality at launch standards, communicate the premium weight of a champagne label, and work across advertising, digital, and presentation environments without compromise.',
        ja: 'ビジュアルは、ローンチ水準でフォトリアル品質に到達し、シャンパーニュブランドが持つプレミアムな重みを伝え、広告、デジタル、プレゼンテーション環境全体で妥協なく機能する必要がありました。',
      },
      response: {
        en: 'We approached the engagement as end-to-end product design: we built the bottle in 3D, developed the brand aesthetic, and delivered photoreal CGI renders and an animated brand sequence engineered for launch use.',
        ja: '本案件をエンドツーエンドのプロダクトデザインとして捉え、ボトルを3Dで構築し、ブランド美学を開発し、ローンチ用途に設計されたフォトリアルCGIレンダリングとブランドアニメーションを納品しました。',
      },
      execution: {
        en: 'Streetshow handled design, 3D modeling, rendering, animation, and key visual production, delivering a launch-ready asset system for SOUMEI Champagne.',
        ja: 'Streetshowはデザイン、3Dモデリング、レンダリング、アニメーション、キービジュアル制作までを担当し、SOUMEI シャンパーニュ向けのローンチ対応アセットシステムを納品しました。',
      },
      outcome: {
        en: 'The work gave SOUMEI Champagne a premium CGI product visualization system aligned with luxury beverage category standards and usable across launch marketing and brand communication.',
        ja: 'この案件により、SOUMEI シャンパーニュはラグジュアリービバレッジカテゴリー基準に整合したプレミアムなCGI商品ビジュアライゼーションシステムを獲得し、ローンチマーケティングおよびブランドコミュニケーション全体で活用できるようになりました。',
      },
    },
    relatedServices: ['photography-cgi-japan', '3d-anamorphic-billboards-japan', 'video-production-japan'],
  },
  {
    slug: 'tokyo-editorial-photography',
    title: {
      en: 'Editorial Photography in Tokyo',
      ja: '東京でのエディトリアル写真',
    },
    proofLine: {
      en: 'Editorial Photography · Fashion & Lifestyle · Tokyo',
      ja: 'エディトリアル写真・ファッション＆ライフスタイル・東京',
    },
    client: 'Editorial series',
    year: '2024',
    category: 'Photography',
    metaTitle: {
      en: 'Editorial Photography in Tokyo | Streetshow Productions',
      ja: '東京でのエディトリアル写真 | Streetshow Productions',
    },
    metaDescription: {
      en: 'Editorial photography production in Tokyo by Streetshow. Premium fashion and lifestyle shoots for magazines, brand campaigns, and publication-ready visual storytelling across Japan.',
      ja: 'Streetshowによる東京でのエディトリアル写真制作。日本全国の雑誌、ブランドキャンペーン、出版物対応のビジュアルストーリーテリング向けプレミアムファッション＆ライフスタイル撮影。',
    },
    intro: {
      en: 'A premium editorial photography series shot in Tokyo, styled production, art direction, and finishing built for magazine-grade fashion and lifestyle storytelling in Japan.',
      ja: '東京で撮影したプレミアムエディトリアル写真シリーズ。日本における雑誌水準のファッション＆ライフスタイルストーリーテリングのためにスタイリングされた制作、アートディレクション、フィニッシングを提供します。',
    },
    description: {
      en: 'A premium editorial photography series shot in Tokyo, built for magazine-grade fashion and lifestyle visual storytelling in Japan.',
      ja: '東京で撮影したプレミアムエディトリアル写真シリーズ。日本における雑誌水準のファッション＆ライフスタイルビジュアルストーリーテリング向けに構築しました。',
    },
    media: {
      image: '/images/editorial-kimono.webp',
      alt: {
        en: 'Editorial photography in Tokyo: kimono fashion styling with traditional Japanese umbrella',
        ja: '東京でのエディトリアル写真：伝統的な和傘と合わせた着物ファッションスタイリング',
      },
    },
    servicesProvided: {
      en: ['Editorial Photography', 'Art Direction', 'Styling Coordination', 'Location Scouting in Tokyo', 'Post-Production & Retouching'],
      ja: ['エディトリアル写真', 'アートディレクション', 'スタイリング調整', '東京でのロケハン', 'ポストプロダクション＆レタッチ'],
    },
    deliverables: {
      en: ['Editorial Shoot', 'Retouched Master Files', 'Print-Ready Assets', 'Digital Publication Assets'],
      ja: ['エディトリアル撮影', 'レタッチ済みマスターファイル', '印刷対応アセット', 'デジタル出版物アセット'],
    },
    projectFocus: {
      en: ['Premium editorial visual storytelling', 'Japan-specific fashion styling', 'Magazine-standard finishing', 'Print + digital use'],
      ja: ['プレミアムエディトリアルビジュアルストーリーテリング', '日本特有のファッションスタイリング', '雑誌水準のフィニッシング', '印刷＋デジタル両用'],
    },
    caseStudy: {
      context: {
        en: 'An editorial series required premium fashion and lifestyle photography shot in Tokyo, visuals that could hold up against international editorial standards while carrying a clearly Japanese sensibility.',
        ja: 'あるエディトリアルシリーズは、東京で撮影されたプレミアムなファッション＆ライフスタイル写真——国際的なエディトリアル基準に耐えながら、明確に日本的な感性を備えたビジュアル——を必要としていました。',
      },
      challenge: {
        en: 'The production needed styling, art direction, and finishing that could meet premium magazine expectations while keeping each frame emotionally restrained and culturally specific.',
        ja: '本制作には、プレミアム雑誌の期待水準を満たしながら、各フレームが感情的に抑制され、文化的に具体的であるようなスタイリング、アートディレクション、フィニッシングが求められました。',
      },
      response: {
        en: 'We built the shoot around carefully selected Tokyo locations, refined styling direction, and post-production finishing tuned for both print and digital publication use.',
        ja: '厳選された東京のロケーション、洗練されたスタイリングディレクション、印刷とデジタル出版の双方に調整されたポストプロダクションフィニッシングを軸に撮影を構築しました。',
      },
      execution: {
        en: 'Streetshow handled photography, art direction, location coordination, styling support, and retouching for the full series.',
        ja: 'Streetshowはシリーズ全体の写真撮影、アートディレクション、ロケーション調整、スタイリングサポート、レタッチを担当しました。',
      },
      outcome: {
        en: 'The editorial series delivered a premium visual set ready for magazine-standard publication and premium brand use across print and digital channels.',
        ja: 'このエディトリアルシリーズは、雑誌水準の出版およびプレミアムなブランド用途に対応するビジュアルセットを、印刷とデジタル両チャネルで提供しました。',
      },
    },
    relatedServices: ['photography-cgi-japan', 'hospitality-creative-strategy-japan', 'japan-market-localization'],
  },
  {
    slug: 'jtl-japan-luxury-preowned-live-commerce',
    title: {
      en: 'JTL: Japan Luxury Pre-Owned Live Commerce & Shopify Growth',
      ja: 'JTL：日本ラグジュアリー中古品ライブコマース＆Shopifyグロース',
    },
    proofLine: {
      en: 'Live Commerce · Shopify DTC · US & EU Wholesale · $200K+ in 8 Months',
      ja: 'ライブコマース・Shopify DTC・米欧ホールセール・8ヶ月で20万米ドル超',
    },
    client: 'JTL Kabushiki Gaisha',
    year: '2024',
    category: 'E-Commerce',
    metaTitle: {
      en: 'JTL Japan Luxury Pre-Owned Live Commerce Case Study | Streetshow',
      ja: 'JTL 日本ラグジュアリー中古品ライブコマース事例 | Streetshow',
    },
    metaDescription: {
      en: 'How Streetshow scaled JTL, a Fukuoka luxury pre-owned brand, to over $200K Shopify revenue in 8 months, live commerce, WhatsApp community, email, Meta and Google Ads, plus US and EU wholesale acquisition.',
      ja: 'Streetshowが福岡のラグジュアリー中古品ブランドJTLを、8ヶ月で20万米ドル超のShopify売上にスケールした事例。ライブコマース、WhatsAppコミュニティ、メール、Meta・Google広告、米欧ホールセール獲得を組み合わせました。',
    },
    intro: {
      en: 'JTL Kabushiki Gaisha is a Fukuoka-based luxury pre-owned brand selling authenticated Gucci, Chanel, Dior, and Louis Vuitton inventory. Streetshow built their end-to-end growth system, live commerce, community, Shopify, email, paid media, and cross-border wholesale, generating over $200,000 USD in Shopify revenue in eight months.',
      ja: 'JTL株式会社は、正規品認定されたGucci、Chanel、Dior、Louis Vuittonの在庫を取り扱う福岡拠点のラグジュアリー中古品ブランドです。Streetshowはライブコマース、コミュニティ、Shopify、メール、ペイドメディア、越境ホールセールを含むエンドツーエンドのグロースシステムを構築し、8ヶ月で20万米ドル超のShopify売上を生み出しました。',
    },
    description: {
      en: 'Japan luxury pre-owned case study. Streetshow built JTL’s full live commerce and Shopify growth system in eight months, reaching both Japanese buyers and US and EU wholesale resellers.',
      ja: '日本のラグジュアリー中古品事例。StreetshowはJTLのフルライブコマース＆Shopifyグロースシステムを8ヶ月で構築し、日本の購入者と米欧のホールセールバイヤーの双方にリーチしました。',
    },
    media: {
      video: '/videos/jtl-live-commerce.mp4',
      image: '/images/jtl-shopify-grid.webp',
      alt: {
        en: 'JTL Japan luxury pre-owned Shopify storefront: authenticated Gucci, Chanel, Dior, and Louis Vuitton inventory priced in JPY',
        ja: 'JTL 日本ラグジュアリー中古品Shopifyストアフロント：日本円価格の正規品認定Gucci、Chanel、Dior、Louis Vuitton在庫',
      },
    },
    servicesProvided: {
      en: [
        'Live Commerce Strategy & Production',
        'WhatsApp Community Building',
        'Shopify Storefront & Merchandising',
        'Email Lifecycle & Upselling',
        'Meta Ads (B2C & Wholesale Tracks)',
        'Google Ads (Intent & Retargeting)',
        'US & EU Wholesale Acquisition',
        'Internal Team Training',
      ],
      ja: [
        'ライブコマース戦略・制作',
        'WhatsAppコミュニティ構築',
        'Shopifyストアフロント＆マーチャンダイジング',
        'メールライフサイクル＆アップセル',
        'Meta広告（B2C＆ホールセール両トラック）',
        'Google広告（インテント＆リターゲティング）',
        '米欧ホールセール獲得',
        '社内チームトレーニング',
      ],
    },
    deliverables: {
      en: [
        'Live commerce playbook and session cadence',
        'WhatsApp community with direct-to-buyer announcements',
        'Shopify storefront launch and ongoing merchandising',
        'Email lifecycle flows, welcome, upsell, win-back',
        'Meta and Google Ads campaigns (B2C + B2B)',
        'Cross-border wholesale pipeline from US and EU resellers',
        'Full content and Shopify training for the JTL team',
      ],
      ja: [
        'ライブコマースプレイブックとセッション運用サイクル',
        '購入者向け直接告知を行うWhatsAppコミュニティ',
        'Shopifyストアフロントのローンチと継続的なマーチャンダイジング',
        'メールライフサイクルフロー（ウェルカム、アップセル、ウィンバック）',
        'Meta・Google広告キャンペーン（B2C＋B2B）',
        '米欧リセラーからの越境ホールセールパイプライン',
        'JTLチーム向けコンテンツ・Shopifyフルトレーニング',
      ],
    },
    projectFocus: {
      en: [
        'Live commerce as primary revenue engine',
        'Community-led retention via WhatsApp',
        'Cross-border US and EU wholesale acquisition',
        'Shopify DTC scale for luxury pre-owned inventory',
        'Internal team enablement for long-term independence',
      ],
      ja: [
        '主要な収益エンジンとしてのライブコマース',
        'WhatsAppによるコミュニティ主導のリテンション',
        '米欧越境ホールセール獲得',
        'ラグジュアリー中古品在庫のためのShopify DTCスケール',
        '長期的な自立運用に向けた社内チームの内製化',
      ],
    },
    caseStudy: {
      context: {
        en: 'JTL is a Fukuoka-based luxury pre-owned brand with authenticated high-end inventory, Gucci, Chanel, Dior, Hermès, Louis Vuitton, and a strong local presence on Facebook Live. When we began working with them they had product, a basic online presence, and live selling on Facebook only. No Shopify system, no email list, no community infrastructure, and no structured path to consistent digital revenue.',
        ja: 'JTLは、Gucci、Chanel、Dior、Hermès、Louis Vuittonなど正規品認定されたハイエンド在庫と、Facebookライブでの強固なローカルプレゼンスを持つ福岡拠点のラグジュアリー中古品ブランドです。協業開始時点では、商品、基本的なオンラインプレゼンス、そしてFacebook上でのライブセリングのみが存在し、Shopifyシステム、メールリスト、コミュニティインフラ、継続的なデジタル売上への構造化された道筋はありませんでした。',
      },
      challenge: {
        en: 'JTL needed to turn a single-channel live selling operation into a full growth system, one that could retain buyers between lives, move higher-value inventory through paid channels, reach international wholesale buyers in the US and Europe, and stay operable by the internal team after the engagement ended.',
        ja: 'JTLは、単一チャネルのライブセリング運用を、ライブ間で購入者を囲い込み、高単価在庫を有料チャネルで動かし、米欧の海外ホールセールバイヤーに届き、協業終了後も社内チームで運用可能な完全なグロースシステムへ転換する必要がありました。',
      },
      response: {
        en: 'We built the complete multi-channel system from the ground up. We scaled live commerce across Facebook and Instagram with a regular session cadence, then built a WhatsApp community as a direct channel to announce upcoming lives, new arrivals, and exclusive drops before they went public. In parallel we built an email list and used it as an upselling engine, targeted flows that converted one-time buyers into repeat customers and moved higher-value inventory.',
        ja: '完全なマルチチャネルシステムをゼロから構築しました。FacebookとInstagramでライブコマースを定期的なセッションサイクルでスケールさせ、さらにWhatsAppコミュニティを構築して、今後のライブ、新着入荷、限定ドロップを公開前に直接告知する直販チャネルとして活用しました。並行してメールリストを構築し、一度きりの購入者をリピーターへ転換し高単価在庫を動かすためのターゲット型フローをアップセルエンジンとして運用しました。',
      },
      execution: {
        en: 'On the paid side we ran Meta Ads and Google Ads on two tracks simultaneously. Track one targeted end consumers with seasonal promotions and product-specific campaigns timed around demand peaks. Track two targeted wholesale buyers and resellers in the United States and Europe, acquiring B2B clients who would purchase inventory in volume. We also trained the internal JTL team on content creation and Shopify management so the operation could run independently after handover.',
        ja: '有料側では、Meta広告とGoogle広告を2トラックで並行運用しました。トラック1はシーズンプロモーションと需要ピークに合わせた商品別キャンペーンでエンドコンシューマーをターゲットにし、トラック2は米国および欧州のホールセールバイヤー・リセラーをターゲットにし、在庫をまとめて購入するB2Bクライアントを獲得しました。併せて、引き継ぎ後に社内で運用が独立して回るよう、JTL社内チームへコンテンツ制作とShopify運用のトレーニングを実施しました。',
      },
      outcome: {
        en: 'Over eight months JTL generated more than $200,000 USD in Shopify revenue through the combined system, live commerce, WhatsApp community, email lifecycle, Meta and Google paid campaigns, and wholesale acquisition from US and European resellers. The system handed back to JTL is fully operational and team-owned.',
        ja: '8ヶ月の間に、JTLはライブコマース、WhatsAppコミュニティ、メールライフサイクル、Meta・Google有料キャンペーン、米欧リセラーからのホールセール獲得を組み合わせたシステムを通じて、20万米ドル超のShopify売上を生み出しました。JTLに引き渡されたシステムは完全に運用可能で、社内チームが所有しています。',
      },
    },
    relatedServices: ['live-commerce-growth-japan', 'japan-market-localization', 'video-production-japan'],
  },
];

export function getCatalogService(slug: string) {
  return serviceCatalog.find((item) => item.slug === slug);
}

export function getCatalogProject(slug: string) {
  return projectCatalog.find((item) => item.slug === slug);
}
