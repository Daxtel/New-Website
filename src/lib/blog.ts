import type { Localized } from './i18n';

export type BlogSection = {
  heading?: Localized;
  paragraphs: Localized<string[]>;
};

export type BlogPost = {
  slug: string;
  title: Localized;
  metaTitle: Localized;
  metaDescription: Localized;
  excerpt: Localized;
  author: string;
  datePublished: string;
  dateModified?: string;
  readingTime: Localized;
  heroImage?: string;
  category: Localized;
  tags: string[];
  sections: BlogSection[];
  cta: {
    heading: Localized;
    body: Localized;
    linkLabel: Localized;
    linkHref: string;
  };
  relatedServices: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'japan-market-entry-guide-2026',
    title: {
      en: 'Japan Market Entry in 2026: What Premium Brands Need to Know',
      ja: '2026年の日本市場進出：プレミアムブランドが知っておくべきこと',
    },
    metaTitle: {
      en: 'Japan Market Entry 2026: Premium Brand Guide | Streetshow',
      ja: '2026年 日本市場進出：プレミアムブランドガイド | Streetshow',
    },
    metaDescription: {
      en: 'A 2026 guide to Japan market entry for premium brands. Inbound tourism, consumer behavior, localization pitfalls, and the operating model that actually works.',
      ja: 'プレミアムブランド向け、2026年の日本市場進出ガイド。インバウンド需要、消費者行動、ローカライズの落とし穴、そして実際に機能するオペレーティングモデル。',
    },
    excerpt: {
      en: 'Japan is on track for its strongest year of inbound demand in history. For premium brands, 2026 is the window to enter, but only if positioning, localization, and launch execution are treated as one system.',
      ja: '日本は史上最高のインバウンド需要を迎えようとしています。プレミアムブランドにとって2026年は参入の好機ですが、ポジショニング・ローカライズ・ローンチ実行を一つのシステムとして扱った場合に限られます。',
    },
    author: 'Daxtel Jackson',
    datePublished: '2026-04-10',
    readingTime: {
      en: '9 min read',
      ja: '9分で読了',
    },
    category: {
      en: 'Japan Market Entry',
      ja: '日本市場進出',
    },
    tags: [
      'Japan market entry',
      'Japan localization',
      'luxury brands Japan',
      'inbound tourism Japan',
      'premium market Japan',
      'Tokyo launch strategy',
    ],
    sections: [
      {
        paragraphs: {
          en: [
            'Japan is entering 2026 with the strongest inbound demand it has ever recorded. For premium international brands, this is the clearest window in a decade to enter, and the clearest window in a decade to fail.',
            'The failure pattern is not strategic misjudgement. It is operational. Brands treat positioning, localization, and launch execution as separate projects instead of one system, and the gaps between them absorb most of the budget.',
            'This guide covers what is actually happening in the Japanese market right now, why most foreign launches underperform, and the operating model we use at Streetshow to get premium brands into Japan with their brand equity intact.',
          ],
          ja: [
            '日本は過去最高水準のインバウンド需要とともに2026年を迎えます。海外のプレミアムブランドにとって、これはこの10年で最も明確な参入機会であり、同時にこの10年で最も明確な失敗のリスクでもあります。',
            '失敗のパターンは戦略的な判断ミスではなく、オペレーション上の問題です。ブランドはポジショニング、ローカライズ、ローンチ実行をひとつのシステムとしてではなく、別々のプロジェクトとして扱い、その隙間に予算の大半が吸い込まれていきます。',
            '本ガイドでは、いま日本市場で何が起きているのか、なぜ多くの海外ブランドのローンチが期待を下回るのか、そしてStreetshowがブランドエクイティを損なわずにプレミアムブランドを日本に送り込むために用いているオペレーティングモデルを解説します。',
          ],
        },
      },
      {
        heading: {
          en: 'The 2026 Japan market opportunity in numbers',
          ja: '数字で見る2026年の日本市場機会',
        },
        paragraphs: {
          en: [
            "Japan recorded 31.65 million international visitors in the first nine months of 2025 alone, the fastest pace in the country's tourism history. JTB forecasts inbound arrivals will pass 40 million by year-end 2025 and reach 41.4 million in 2026.",
            'Inbound spending hit an all-time high of roughly ¥8.1 trillion (around USD 53.3 billion) in 2024, with per-capita spend near ¥227,000 (around USD 1,493). That is not a tourist number. That is a premium consumer number, and it is the clearest signal of the willingness to pay that premium brands are entering Japan to capture.',
            "At the same time, Japan's domestic consumer market in 2026 is expanding at a projected 0.8 to 1.0 percent in real GDP terms, supported by firm private consumption. Moderate domestic growth combined with record inbound demand is the exact conditions that favor well-positioned premium launches.",
            'Tokyo remains a regional signal hub. Success in Japan consistently shapes demand patterns in Korea, Taiwan, Hong Kong, and parts of Southeast Asia. For brands planning an Asia strategy, a strong Japan entry is still the highest-leverage starting point.',
          ],
          ja: [
            '日本は2025年の1月から9月だけで3,165万人の訪日外国人客を記録し、観光史上最速のペースとなっています。JTBは2025年末までに訪日客数が4,000万人を超え、2026年には4,140万人に達すると予測しています。',
            '2024年のインバウンド消費額は過去最高の約8.1兆円（約533億米ドル）に達し、一人当たりの消費額は約22万7,000円（約1,493米ドル）となりました。これは観光客の数字ではなく、プレミアム消費者の数字です。プレミアムブランドが日本市場で取りに行くべき購買意欲の、最も明確なシグナルです。',
            '同時に、2026年の日本国内の消費市場は実質GDPベースで0.8〜1.0％の成長が見込まれ、底堅い個人消費に支えられています。緩やかな国内成長と記録的なインバウンド需要の組み合わせは、適切にポジショニングされたプレミアムローンチにとって理想的な条件です。',
            '東京は依然としてアジア地域のシグナルハブです。日本での成功は、韓国、台湾、香港、東南アジア一部の需要パターンに一貫して影響を与えます。アジア戦略を計画するブランドにとって、強力な日本参入は今も最もレバレッジの効く出発点です。',
          ],
        },
      },
      {
        heading: {
          en: 'Why most foreign brands underperform in Japan',
          ja: 'なぜ多くの海外ブランドは日本で期待を下回るのか',
        },
        paragraphs: {
          en: [
            'After more than a decade producing for international brands launching in Japan, the failure modes are remarkably consistent. They rarely involve the product. They involve how the brand is being delivered to the Japanese audience.',
            'The first failure is treating Japan as a regional rollout. Global campaign assets get re-cut, re-captioned, and shipped. Positioning, messaging, and visual tone are left untouched because "the creative already works." In Japan, that usually means the creative lands flat, culturally legible but emotionally neutral, and paid media has to work twice as hard to compensate.',
            'The second failure is mistaking translation for localization. Translation converts words. Localization reshapes meaning, pace, restraint, and visual cadence for Japanese expectations. A luxury brand launching with polished English-to-Japanese translation still reads as foreign when every cue around it, the pacing, the silences, the framing, belongs to a Western campaign.',
            "The third failure is fragmenting the operation across disconnected vendors. Strategy in New York, translation in Singapore, production in Tokyo, media buying somewhere else. Each vendor does their piece correctly and the launch still underperforms because nobody owns the brand's journey through the Japanese market.",
          ],
          ja: [
            '海外ブランドの日本ローンチを10年以上手がけてきた経験から言えるのは、失敗のモードが驚くほど一貫しているということです。それは商品そのものの問題ではなく、ブランドが日本のオーディエンスにどう届けられるかの問題です。',
            '最初の失敗は、日本を地域ロールアウトの一環として扱うことです。グローバルキャンペーンの素材が再編集・字幕差し替えされて送り込まれ、「クリエイティブはすでに機能している」という理由でポジショニング、メッセージング、ビジュアルトーンには手が入りません。日本では、これはたいてい文化的には読めるけれど感情的にはニュートラルな、フラットな着地を生み、その分ペイドメディアが倍以上働かなくてはならなくなります。',
            '二つ目の失敗は、翻訳をローカライズと取り違えることです。翻訳は言葉を変換しますが、ローカライズは意味、テンポ、抑制、ビジュアルのリズムを日本の期待値に合わせて再構築します。高品質な日英翻訳でローンチしたラグジュアリーブランドも、その周りの全ての要素（テンポ、間、フレーミング）が西洋のキャンペーンのものであれば、依然として「外国のもの」として映ります。',
            '三つ目の失敗は、オペレーションを分断されたベンダーに散らすことです。戦略はニューヨーク、翻訳はシンガポール、制作は東京、メディアバイイングはまた別の場所。各ベンダーは自分の担当を正しくこなしますが、誰もブランドが日本市場を渡る一連の旅路を持っていないために、ローンチは期待を下回ります。',
          ],
        },
      },
      {
        heading: {
          en: 'The operating model we use at Streetshow',
          ja: 'Streetshowが用いるオペレーティングモデル',
        },
        paragraphs: {
          en: [
            'The model that works is the opposite of fragmentation. Strategy, localization, and production are treated as one connected operation from the first meeting.',
            'We start with business goals, not deliverables. Before any creative conversation, we ask what the brand needs Japan to do for it, first-year revenue, category credibility, Asia signal, or all three. That answer shapes everything downstream.',
            'Then we handle positioning and messaging adaptation in Japanese from the inside. This is not a translation pass, it is a rebuild of how the brand talks about itself to a Japanese audience, with original copy in Japanese and a reconciled English equivalent.',
            'Production happens locally in Japan with bilingual crew and international quality standards, which keeps cultural context tight and protects brand equity through every frame. And because strategy, localization, and production are running as one operation, the feedback loops that normally break between vendors stay intact.',
            'The result, consistently, is a launch that feels native in Japan and on-brand globally, instead of one or the other.',
          ],
          ja: [
            '機能するモデルは分断の反対です。戦略、ローカライズ、制作を最初の打ち合わせから一つのつながったオペレーションとして扱います。',
            '私たちは成果物ではなく、事業目標から始めます。いかなるクリエイティブの議論よりも先に、ブランドが日本に何を求めるのか（初年度売上、カテゴリ内での信頼構築、アジア向けのシグナル、またはその全て）を確認します。その答えが下流の全てを形作ります。',
            'そのうえで、ポジショニングとメッセージングの日本語への適応を内側から行います。これは翻訳作業ではなく、ブランドが日本のオーディエンスに対して自らをどう語るかの再構築であり、日本語でのオリジナルコピーと、それに整合する英語版を同時に作り上げます。',
            '制作はバイリンガルクルーと国際基準の品質で日本国内で行われ、文化的コンテクストを緊密に保ち、全てのフレームでブランドエクイティを守ります。戦略、ローカライズ、制作が一つのオペレーションとして動くため、通常はベンダー間で途切れるフィードバックループが一貫して保たれます。',
            '結果として、日本でネイティブに感じられながら、グローバルにもオンブランドなローンチが、一貫して実現します。',
          ],
        },
      },
      {
        heading: {
          en: 'What a premium Japan market entry actually involves',
          ja: 'プレミアム日本市場進出の実際の中身',
        },
        paragraphs: {
          en: [
            'A structured premium entry typically runs in three overlapping phases over three to nine months, depending on category and distribution model.',
            "Phase one is positioning and localization. This is where the brand's messaging, visual tone, and cultural references are rebuilt for Japan. It includes market research, competitive mapping against Japanese incumbents, and Japanese-first creative copy development. For hospitality, real estate, and luxury goods, this phase often includes a brand voice audit in Japanese before any production begins.",
            "Phase two is production and creative system build. This is where the brand's visual and video identity for Japan is produced, campaign photography, video content, 3D and CGI visualization where needed, and social-ready cutdowns. We think of this as building a visual system, not a single campaign, because the assets need to keep working across the full launch window and beyond.",
            'Phase three is launch activation and optimization. This covers media strategy, high-visibility placements where relevant (3D anamorphic billboards in Shibuya or Shinjuku are still one of the highest-leverage launch formats in Japan), paid media on the platforms Japanese audiences actually use, and continuous optimization on performance data from week one.',
            'The key discipline is that all three phases are scoped as one engagement. Splitting them across vendors is the single most common reason premium Japan launches leak budget and brand equity.',
          ],
          ja: [
            '構造化されたプレミアム参入は通常、カテゴリと流通モデルに応じて3〜9ヶ月にわたる、重なり合う3つのフェーズで進みます。',
            'フェーズ1はポジショニングとローカライズです。ブランドのメッセージング、ビジュアルトーン、文化的リファレンスを日本向けに再構築します。市場調査、日本の既存プレーヤーに対する競合マッピング、日本語ファーストのクリエイティブコピー開発を含みます。ホスピタリティ、不動産、ラグジュアリー領域では、制作開始前に日本語でのブランドボイス監査を実施することが多いフェーズです。',
            'フェーズ2は制作とクリエイティブシステムの構築です。日本市場向けのブランドのビジュアル・映像アイデンティティを制作します。キャンペーン撮影、映像コンテンツ、必要に応じた3D・CGIビジュアライゼーション、ソーシャル向けカットダウンまで。単一のキャンペーンではなく、ビジュアルシステムの構築として捉えます。素材はローンチ期間全体、そしてその後も機能し続ける必要があるからです。',
            'フェーズ3はローンチアクティベーションと最適化です。メディア戦略、必要に応じた高視認性プレースメント（渋谷や新宿の3Dアナモルフィック広告は、今も日本で最もレバレッジの効くローンチフォーマットの一つです）、日本のオーディエンスが実際に使うプラットフォームでのペイドメディア、そして初週からのパフォーマンスデータに基づく継続的な最適化をカバーします。',
            '重要な規律は、3つのフェーズすべてを一つのエンゲージメントとしてスコープすることです。ベンダー間でこれを分割することが、プレミアムな日本ローンチが予算とブランドエクイティを漏らす最も一般的な理由です。',
          ],
        },
      },
      {
        heading: {
          en: 'How to evaluate a Japan market entry partner',
          ja: '日本市場進出パートナーの見極め方',
        },
        paragraphs: {
          en: [
            'If you are evaluating partners for a Japan launch in 2026, three questions separate operators from order-takers.',
            'First, can they work in Japanese as a primary language, not as a translation layer? Ask to see Japanese-first copy they have written, not translated. If every example comes with an English original, that is a translation shop.',
            'Second, do they operate strategy, localization, and production under one roof, or do they coordinate vendors? Coordination is not operation. Integrated partners make faster decisions and protect brand equity more effectively through the launch window.',
            "Third, can they show proven premium work in Japan with real clients? Premium brands should expect premium references. Streetshow's work in Japan includes campaigns for Charles & Keith, New Balance Japan, SHEIN Japan, The Ritz-Carlton Kyoto, The Ritz-Carlton Osaka, KUOE Kyoto, and FUDITALYCO, among others, selected work is available in our case studies.",
          ],
          ja: [
            '2026年の日本ローンチに向けてパートナーを評価しているのであれば、3つの質問がオペレーターと受発注業者を切り分けます。',
            '第一に、日本語を翻訳レイヤーではなく、プライマリ言語として扱えるか。翻訳ではなく、日本語で直接書かれたコピーを見せてもらってください。全ての例に英語原稿が付いているなら、それは翻訳会社です。',
            '第二に、戦略・ローカライズ・制作を同じ屋根の下で運営しているのか、それともベンダーを調整しているだけなのか。調整はオペレーションではありません。統合型パートナーは意思決定が早く、ローンチ期間を通じてブランドエクイティをより効果的に守ります。',
            '第三に、日本における実際のクライアントとのプレミアムな実績を示せるか。プレミアムブランドはプレミアムなリファレンスを期待すべきです。Streetshowの日本における仕事には、Charles & Keith、ニューバランス ジャパン、SHEIN JAPAN、ザ・リッツ・カールトン京都、ザ・リッツ・カールトン大阪、KUOE京都、FUDITALYCOなどのキャンペーンが含まれており、選定された実績はケーススタディでご覧いただけます。',
          ],
        },
      },
      {
        heading: {
          en: 'Bottom line for 2026',
          ja: '2026年の結論',
        },
        paragraphs: {
          en: [
            'Japan in 2026 is the strongest inbound market the country has ever had, combined with a domestic consumer environment that rewards well-positioned premium entries. For brands that get positioning, localization, and execution operating as one system, the return profile is unusually favorable.',
            'For brands that treat Japan as a regional rollout, the same market conditions will mostly produce expensive launches with thin results.',
            'If you are planning a Japan entry in 2026, whether you are a luxury hospitality property, a fashion or automotive brand, a premium F&B label, or an international retailer, the next ninety days is the window to align strategy and production before peak launch seasons hit.',
          ],
          ja: [
            '2026年の日本は、同国史上最も強いインバウンド市場であり、かつ適切にポジショニングされたプレミアム参入を評価する国内消費環境と組み合わさっています。ポジショニング・ローカライズ・実行をひとつのシステムとして機能させられるブランドにとって、リターンのプロファイルは異例なほど有利です。',
            '一方、日本を地域ロールアウトとして扱うブランドにとっては、同じ市場条件が、薄い成果の高額なローンチをほぼそのまま生み出すことになります。',
            '2026年の日本参入を計画しているなら（ラグジュアリーホスピタリティ、ファッションや自動車、プレミアムF&Bブランド、インターナショナルリテールのいずれであっても）、次の90日間がピークのローンチシーズンを迎える前に戦略と制作を整合させる窓となります。',
          ],
        },
      },
    ],
    cta: {
      heading: {
        en: 'Planning a Japan launch in 2026?',
        ja: '2026年の日本ローンチを計画中ですか？',
      },
      body: {
        en: 'Streetshow Productions supports Japan market entry, localization, and premium campaign execution for international brands from Fukuoka and Tokyo. Let us help you protect brand equity through your launch window.',
        ja: 'Streetshow Productionsは、福岡と東京から、海外ブランドの日本市場進出、ローカライズ、プレミアムキャンペーンの実行を支援します。ローンチ期間を通じてブランドエクイティを守るお手伝いをさせてください。',
      },
      linkLabel: {
        en: "Let's Talk",
        ja: 'ご相談する',
      },
      linkHref: '/contact',
    },
    relatedServices: [
      'japan-market-localization',
      'video-production-japan',
      'hospitality-creative-strategy-japan',
    ],
  },


  {
    slug: 'restaurant-visibility-japan-google-maps-playbook',
    title: {
      en: 'Why Your Restaurant in Japan Is Invisible on Google Maps (And the 2026 Playbook That Fixes It)',
      ja: 'あなたの日本のレストランがGoogleマップで見えない理由（そして2026年に効くプレイブック）',
    },
    metaTitle: {
      en: 'Restaurant Visibility Japan: 2026 Google Maps Playbook',
      ja: '日本のレストラン集客：2026年Googleマップ完全ガイド',
    },
    metaDescription: {
      en: "Restaurant visibility Japan is the difference between a full Friday and an empty one. Restaurant operators: here's the 2026 Google Maps playbook that works.",
      ja: '日本のレストラン集客はGoogleマップで決まる。金曜日に満席か空席か、その差を生む2026年版プレイブックを公開。',
    },
    excerpt: {
      en: 'At 7:43 PM on a Friday in Itoshima, four tourists from Hong Kong stand at an intersection with their phones out. Two restaurants sit within forty meters. The older venue does not appear on their screens. This scene plays out thousands of times a night across Japan.',
      ja: '金曜日の午後7時43分、糸島。香港から来た4人の観光客が交差点でスマートフォンを見ている。40メートル以内に2軒のレストラン。老舗の方は画面に表示されない。この光景は毎晩、日本中で何千回も繰り返されている。',
    },
    author: 'Daxtel Jackson',
    datePublished: '2026-04-30',
    dateModified: '2026-04-30',
    readingTime: {
      en: '8 min read',
      ja: '8分で読了',
    },
    category: {
      en: 'Hospitality Strategy',
      ja: 'ホスピタリティ戦略',
    },
    tags: [
      'restaurant visibility Japan',
      'Google Maps Japan',
      'Google Business Profile',
      'Japan inbound tourism 2026',
      'Itoshima restaurants',
    ],
    sections: [
      {
        paragraphs: {
          en: [
            'At 7:43 PM on a Friday in Itoshima, four tourists from Hong Kong stand at an intersection with their phones out. Two restaurants sit within forty meters. The older venue — better food, a twenty-year reputation with locals — does not appear on their screens. They walk into the newer place because it shows up with ten photos, 127 Google reviews, and an English booking link. This scene plays out thousands of times a night across Japan, and it quietly decides which restaurants capture the inbound tourism boom and which watch it walk past.',
            'Restaurant visibility Japan is no longer a Tabelog problem. In 2026, Google Maps is the primary discovery surface for foreign diners in Japan, and most Japanese restaurants are still optimized for a customer who no longer dominates — the domestic diner who opens Tabelog. The foreign diner opens Google. If your venue is not ranking in the map pack for their search, you are not competing.',
          ],
          ja: [
            '金曜日の午後7時43分、糸島の交差点で香港からの観光客4人がスマートフォンを見ている。40メートル以内に2軒のレストランがある。老舗の方は料理も評判も上だが、画面には表示されない。新しい方の店がGoogle写真10枚、レビュー127件、英語の予約リンク付きで表示されたため、彼らはそちらに入った。この光景は毎晩、日本中で何千回も繰り返されており、インバウンド観光ブームの恩恵を受けるレストランとそうでないレストランを静かに決めている。',
            '日本のレストラン集客は、もはや食べログの問題ではない。2026年、Googleマップは訪日外国人にとって主要な飲食店発見の場であり、ほとんどの日本のレストランは、もはや主流ではない顧客——食べログを開く国内の食事客——向けに最適化されたままだ。外国人客が開くのはGoogleだ。マップパックに表示されていなければ、競争の土俵にすら立っていない。',
          ],
        },
      },
      {
        heading: {
          en: 'Why are foreign diners in Japan walking past perfectly good restaurants?',
          ja: 'なぜ外国人客は日本の優良レストランを素通りするのか？',
        },
        paragraphs: {
          en: [
            'JNTO projects over 40 million foreign visitors for 2026, a figure that dwarfs the pre-pandemic peak. Spend-per-visitor on dining is up sharply, driven by a weak yen that makes an ¥8,000 kaiseki feel like a discount to a Singapore or Sydney diner. This is the largest foreign-revenue window Japanese hospitality has ever had.',
            'Most restaurants are not capturing it. The gap is not food. It is discovery. A foreign visitor in Kyoto, Shibuya, or Fukuoka does not ask a local for a Tabelog recommendation. They ask their phone, and nine times out of ten the phone opens Google Maps.',
            'When the map opens, three restaurants appear in what Google calls the local pack. Everyone else is invisible. The difference between those three slots and page two is not subtle. It is roughly the difference between a fully booked Friday and an empty one.',
          ],
          ja: [
            'JNTOは2026年に4,000万人以上の訪日外国人を予測しており、これはコロナ前のピークを大きく上回る数字だ。円安の影響で8,000円の懐石料理がシンガポールやシドニーの食事客にとってはお得に感じられ、飲食への一人当たり支出は急増している。これは日本のホスピタリティ業界にとって過去最大の外国人収益の窓だ。',
            'しかし、ほとんどのレストランはこれを取りこぼしている。問題は料理ではない。発見されるかどうかだ。京都、渋谷、福岡を訪れる外国人は、地元の人に食べログのおすすめを聞かない。スマートフォンに尋ね、10回中9回はGoogleマップが開く。',
            'マップを開くと、Googleが「ローカルパック」と呼ぶ枠に3軒のレストランが表示される。それ以外は見えない。この3枠と2ページ目の差は微妙なものではない。金曜日に満席か空席かの差に等しい。',
          ],
        },
      },
      {
        heading: {
          en: 'What actually decides restaurant visibility Japan in the Google Maps local pack?',
          ja: 'Googleマップのローカルパックで日本のレストランの表示順位を決めるものは何か？',
        },
        paragraphs: {
          en: [
            'Google Maps ranks restaurants in Japan on three signals, in this order.',
            'First, the Google Business Profile itself: hours, categories, phone, address, website, menu link, and whether the profile responds in the user’s language. A profile with separate English and Japanese descriptions outranks a Japanese-only profile for non-Japanese users. Most Japanese restaurants have never added an English description at all.',
            'Second, signal density: Google reviews count, review recency, photo volume (owner and user), and update frequency. A restaurant that posted four photos last week outranks a better restaurant that last updated in 2019.',
            'Third, proximity and intent. A diner searching “dinner near me” from a hotel in Hakata weights proximity above all. A diner searching “omakase sushi Fukuoka” weights review quality far higher than proximity. Most local SEO Japan restaurants work ignores this distinction entirely.',
            'A Japanese restaurant with no English description, fewer than 20 Google reviews, and no photos uploaded in the past 90 days is effectively invisible to the inbound diner — regardless of food quality, price, or domestic reputation.',
          ],
          ja: [
            'Googleマップは日本のレストランを3つのシグナルで、この順序でランク付けする。',
            '第一に、Googleビジネスプロフィール自体：営業時間、カテゴリ、電話番号、住所、ウェブサイト、メニューリンク、そしてプロフィールがユーザーの言語で対応しているかどうか。英語と日本語の両方の説明があるプロフィールは、日本語のみのプロフィールよりも外国人ユーザーに対して上位に表示される。ほとんどの日本のレストランは英語の説明を追加したことすらない。',
            '第二に、シグナル密度：Googleレビュー数、レビューの新しさ、写真の量（オーナーとユーザー）、更新頻度。先週4枚の写真を投稿したレストランは、2019年に最後の更新をしたより良いレストランよりも上位に表示される。',
            '第三に、近接性と意図。博多のホテルから「近くのディナー」と検索する客は、近接性を最も重視する。「おまかせ寿司 福岡」と検索する客は、近接性よりもレビューの質をはるかに重視する。日本のほとんどのローカルSEO対策は、この区別を完全に無視している。',
            '英語の説明がなく、Googleレビューが20件未満、過去90日間に写真がアップロードされていない日本のレストランは、料理の質、価格、国内での評判に関係なく、インバウンド客にとって事実上見えない存在だ。',
          ],
        },
      },
      {
        heading: {
          en: 'Why is Tabelog the wrong battlefield for international revenue?',
          ja: 'なぜ食べログはインバウンド収益を狙う場として間違っているのか？',
        },
        paragraphs: {
          en: [
            'Tabelog (食べログ, food log) remains the dominant platform for Japanese domestic diners. For a Fukuoka salaryman choosing between two izakayas on a weeknight, Tabelog decides. This is the battle most Japanese restaurants still pay to fight.',
            'Foreign diners bypass Tabelog for three structural reasons. The interface intimidates, even when translated — it reads as a local directory written for someone who already knows the neighborhoods. The 3.5-star scoring anchor confuses non-Japanese users accustomed to 5-star norms. And Tabelog’s discovery model is search-first: a user has to know what category to look for. The inbound diner does not. They drop a pin on a map and ask what’s close.',
            'A restaurant spending on Tabelog ads to reach foreign customers Japan restaurants actually need is paying for a channel those customers do not use. The Google Business Profile is the channel the paying customer opens.',
          ],
          ja: [
            '食べログ（たべログ）は、日本国内の食事客にとって依然として支配的なプラットフォームだ。平日の夜に2軒の居酒屋で迷う福岡のサラリーマンにとっては、食べログが決める。これがほとんどの日本のレストランがいまだに戦っている戦場だ。',
            '外国人客が食べログをスキップする構造的な理由は3つある。翻訳されていても、インターフェースが威圧的——地元の土地勘がある人向けに書かれたローカルディレクトリのように見える。3.5点を基準とする採点が、5段階評価に慣れた外国人ユーザーを混乱させる。そして食べログの発見モデルは検索ファースト：ユーザーが探すカテゴリを知っている必要がある。インバウンド客はそうではない。地図にピンを落として「近くに何がある？」と聞く。',
            '外国人客を獲得するために食べログ広告に費やしているレストランは、その客が使わないチャネルに支払っている。外国人客が開くチャネルはGoogleビジネスプロフィールだ。',
          ],
        },
      },
      {
        heading: {
          en: 'What does a Google Business Profile Japan restaurants should actually look like in 2026?',
          ja: '2026年に日本のレストランのGoogleビジネスプロフィールはどうあるべきか？',
        },
        paragraphs: {
          en: [
            'A properly built profile handles nine things most Japanese venues never touch.',
            'Separate bilingual descriptions, written natively in each language, not machine-translated. Accurate primary and secondary category tags. A menu uploaded as clear photos, not a blurry PDF. Ten or more owner-uploaded images covering food, interior, and exterior, rotated quarterly. Google Posts refreshed weekly with seasonal updates, closures, and events — the single most underused feature on Japanese Google Business Profile pages. Review responses within 24 hours, in the language of the review. Geo-tagged images confirming location authority. Full attribute fields: English menu, vegetarian options, wheelchair access, reservation method. And a booking link that does not dump English-speaking customers into a Japanese-only form.',
            'Venues that execute all nine consistently rank in the local map pack within 90 days. Venues that hit six of nine win about half the time. Venues that hit none stay invisible, regardless of the quality of the food inside.',
          ],
          ja: [
            '適切に構築されたプロフィールは、ほとんどの日本の飲食店が手をつけない9つのことに対応する。',
            'それぞれの言語でネイティブに書かれたバイリンガル説明文（機械翻訳ではない）。正確なプライマリ・セカンダリカテゴリタグ。ぼやけたPDFではなく、クリアな写真としてアップロードされたメニュー。料理、内装、外観をカバーする10枚以上のオーナー投稿写真（四半期ごとに更新）。季節の情報、休業日、イベントを含む毎週のGoogleポスト更新——日本のGoogleビジネスプロフィールで最も活用されていない機能。レビューの言語でのレビュー返信（24時間以内）。位置権限を確認するジオタグ付き画像。英語メニュー、ベジタリアンオプション、車椅子アクセス、予約方法などの属性フィールドの完全な入力。そして英語話者を日本語のみのフォームに送り込まない予約リンク。',
            '9つすべてを実行している飲食店は、90日以内にローカルマップパックにランクインする。9つ中6つを達成している飲食店は約半数の確率で表示される。何も対応していない飲食店は、料理の質に関係なく、見えないままだ。',
          ],
        },
      },
      {
        heading: {
          en: 'How is one Itoshima restaurant closing the foreign-diner gap right now?',
          ja: '糸島のレストランがいま、外国人客との溝をどう埋めているか',
        },
        paragraphs: {
          en: [
            'Streetshow Productions is building a live case of this with Restaurant Palm Beach, a seafood venue on the Kyushu coast that had been losing inbound traffic to competitors with weaker food and stronger Google presence. The fix is a system, not a tactic: a rebuilt Google Business Profile with separately written bilingual descriptions, a 5-language AI voice booking agent handling Japanese, English, Korean, Mandarin, and French, a monthly content cadence feeding Google Posts and Instagram in parallel, and a review-response protocol that hits every review within 24 hours. The projected six-month net impact runs to seven figures. The cost of not fixing it — measured in Hong Kong families walking into the competitor next door — was roughly the same number, annually.',
            'The next twelve months will decide which restaurants in Japan own their share of inbound dining revenue, and which do not. Japan inbound tourism 2026 will push 40 million visitors through the country. Every one of them will open Google Maps before they open their wallet. Restaurants that understand this as a discovery problem — not a translation problem, not a Tabelog problem, not a food-quality problem — will capture the boom. The rest will watch it walk past their door.',
          ],
          ja: [
            'Streetshow Productionsは、Restaurant Palm Beachでこのライブケースを構築中だ。九州の海岸沿いにあるシーフードレストランで、料理では劣るがGoogleでの存在感が強い競合にインバウンド客を奪われていた。修正策は戦術ではなくシステムだ：バイリンガルの説明文を個別に作成したGoogleビジネスプロフィールの再構築、日本語・英語・韓国語・中国語・フランス語に対応する5言語AI音声予約エージェント、GoogleポストとInstagramを並行して更新する月次コンテンツ運用、そして全レビューに24時間以内に返信するレビュー対応プロトコル。6ヶ月の予想純効果は7桁に上る。対策しないコストは——隣の競合に入る香港のファミリーで測定すると——年間でほぼ同額だった。',
            '今後12ヶ月が、日本のどのレストランがインバウンド飲食収益を獲得し、どのレストランがそうでないかを決める。2026年のインバウンド観光は4,000万人の訪問者を日本に送り込む。その全員が財布を開く前にGoogleマップを開く。これを発見の問題——翻訳の問題でも、食べログの問題でも、料理の質の問題でもない——として理解するレストランがブームを捉える。残りは、ブームが店の前を通り過ぎるのを眺めることになる。',
          ],
        },
      },
    ],
    cta: {
      heading: {
        en: 'Request a Confidential Discovery Audit',
        ja: 'ディスカバリー診断のご相談',
      },
      body: {
        en: "We'll review your Google Business Profile, map-pack ranking, review signals, and booking-conversion path, then walk you through what it would take to own your category in 90 days. Streetshow Productions builds and operates the exact systems this post describes.",
        ja: 'Googleビジネスプロフィール、マップパックランキング、レビューシグナル、予約コンバージョンパスを診断し、90日でカテゴリを制するために何が必要かをご説明します。Streetshow Productionsは、この記事で説明しているシステムを実際に構築・運用しています。',
      },
      linkLabel: {
        en: 'Book the Strategy Call',
        ja: '戦略相談を予約',
      },
      linkHref: '/contact',
    },
    relatedServices: [
      'hospitality-creative-strategy-japan',
      'japan-market-localization',
      'video-production-japan',
    ],
  },

];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
