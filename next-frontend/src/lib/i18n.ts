export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export type Localized<T = string> = {
  en: T;
  ja: T;
};

export function pick<T>(value: Localized<T>, locale: Locale = 'en'): T {
  return value[locale];
}

export const ui = {
  nav: {
    work: { en: 'Work', ja: '実績' },
    services: { en: 'Services', ja: 'サービス' },
    about: { en: 'About', ja: '会社情報' },
    contact: { en: 'Contact', ja: 'お問い合わせ' },
    japanMarketEntry: { en: 'Japan Market Entry', ja: '日本市場進出' },
  },
  cta: {
    viewSelectedWork: { en: 'View Selected Work', ja: '制作実績を見る' },
    viewAllWork: { en: 'View All Work', ja: 'すべての実績を見る' },
    viewCaseStudy: { en: 'View Case Study', ja: 'ケーススタディを見る' },
    bookStrategicCall: { en: 'Book a Strategic Call', ja: '戦略コールを予約する' },
    sendInquiry: { en: 'Send Inquiry', ja: '問い合わせを送る' },
  },
  sections: {
    navigation: { en: 'Navigation', ja: 'ナビゲーション' },
    contact: { en: 'Contact', ja: 'お問い合わせ' },
    discussProject: { en: 'Discuss Your Project', ja: 'プロジェクトについて相談する' },
    discussSimilarProject: { en: 'Discuss a Similar Project', ja: '類似プロジェクトについて相談する' },
    relatedProjects: { en: 'Related Projects', ja: '関連プロジェクト' },
    relatedServices: { en: 'Related Services', ja: '関連サービス' },
    allServices: { en: 'All Services', ja: 'すべてのサービス' },
    backToWork: { en: 'Back to Work', ja: '実績一覧に戻る' },
    servicesProvided: { en: 'Services Provided', ja: '提供内容' },
    deliverables: { en: 'Deliverables', ja: '納品物' },
    projectFocus: { en: 'Project Focus', ja: 'プロジェクトフォーカス' },
    caseStudy: { en: 'Case Study', ja: 'ケーススタディ' },
    idealFor: { en: 'Ideal For', ja: '最適な用途' },
    whatWeDeliver: { en: 'What We Deliver', ja: '提供内容' },
    client: { en: 'Client', ja: 'クライアント' },
    year: { en: 'Year', ja: '年' },
    category: { en: 'Category', ja: 'カテゴリー' },
    filterByFocus: { en: 'Filter by focus', ja: '領域で絞り込む' },
  },
} as const;
