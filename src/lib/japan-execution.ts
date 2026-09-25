// Japan Execution: page content.
//
// This page is ENGLISH ONLY by decision: the audience is international agency and
// brand teams, so a Japanese track serves nobody who would read it. The /ja render
// canonicals to the EN URL and is noindexed (see the route's generateMetadata),
// and the sitemap lists the EN URL with no ja alternate.
//
// Copy is owner-supplied and verbatim. Do not rewrite, shorten or "improve" it.
//
// Image and video assets are not in the repo yet. Every slot below carries its
// intended path, aspect ratio and alt text; until the file exists the page renders
// a reserved block at the right dimensions (no stock, no broken images, no CLS).

export type ImageSlot = {
  /** Intended local path. The file may not exist yet. */
  src: string;
  alt: string;
  /** Source credit or context line, shown very small and low contrast. */
  caption: string;
  width: number;
  height: number;
  /** Flip to true once the asset has been added to the repo. */
  ready: boolean;
};

export type CaseEntry = {
  title: string;
  venue: string;
  body: string;
  image: ImageSlot;
};

export const japanExecution = {
  path: '/japan-execution',

  meta: {
    title: 'Japan Event Production and Execution Partner | Streetshow Productions',
    description:
      'Japan-side production, fabrication, bilingual coordination and technical execution for international agencies and brands. Delivered at Kyocera Dome Osaka, TGC Kitakyushu and Asia Fashion Fair Osaka.',
  },

  hero: {
    h1: 'Your show, delivered in Japan the way you designed it.',
    subhead:
      'Japan-side production, fabrication, bilingual coordination and technical execution for international agency and brand teams.',
    proof: [
      'PayPay Dome Fukuoka',
      'Kyocera Dome Osaka',
      'The Ritz-Carlton Fukuoka',
      'West Japan General Exhibition Center',
    ],
    cta: 'Talk to us about your Japan brief',
    /** Anchor target for the hero CTA. */
    ctaHref: '#japan-brief',
    /**
     * Muted autoplay loop. Until it exists, `still` renders instead.
     *
     * `src` is intentionally empty rather than pointing at a missing file: the
     * qa video guard requires every referenced /videos/*.mp4 to ship with a
     * poster and a mobile transcode, so naming the path early fails the build.
     * To switch the hero to video, add all three files and set:
     *   src: /videos/japan-execution-hero.mp4
     *   poster: /videos/posters/japan-execution-hero.jpg
     *   mobile: /videos/mobile/japan-execution-hero.mp4   (keep under 6MB)
     * then set src below and flip ready to true.
     */
    video: {
      src: '',
      ready: false,
    },
    still: {
      src: '/images/japan-execution/hero.webp',
      alt: 'Full arena in Japan mid-show, stage LED and lighting rig running to a standing crowd',
      caption: '',
      width: 1920,
      height: 1080,
      ready: true,
    } as ImageSlot,
  },

  problem: {
    h2: 'The vendor said yes. The schedule said Tuesday. On Tuesday it was not done.',
    body: [
      'Nobody lied to you. Something was agreed in a room you were not in, in a language you did not follow, and by the time it reached you in English it had become a problem.',
      'That is not a Japan problem. That is a translation-of-intent problem, and it costs more than any line in your budget.',
    ],
  },

  intent: {
    h2: 'A translator carries words. We carry intent.',
    body: 'We are not here to replace your creative lead or your production structure. We sit underneath it, on the Japan side, so your decisions survive the journey from your team to the venue floor.',
    items: [
      'Specs, riders, schedules and safety documents moving accurately in both directions.',
      'Meetings where your position gets argued, not relayed.',
      'Written follow-ups in the Japanese business format that actually gets vendors to commit.',
      'Problems caught and settled in Japanese before they reach you in English.',
    ],
  },

  scope: {
    h2: 'Know exactly what you are buying before anyone is on a call sheet.',
    columns: [
      {
        heading: 'We perform in-house',
        body: 'Fabrication management and production of scenic, signage and custom builds. LED and screen content, produced end to end. Motion graphics, brand integration and creative adaptation. On-site production management across load-in, show days and wrap. Technical planning and venue scheduling. Bilingual production liaison sitting inside our team, not brokered from outside.',
      },
      {
        heading: 'We contract and manage',
        body: 'LED hardware, staging, rigging and power. Live streaming and projection operation. Local crew beyond our core team. Venue-side technical suppliers and safety documentation.',
      },
    ],
    closing:
      'Most agencies will not tell you where their line sits. We would rather you knew on day one than found out on show day.',
  },

  work: {
    h2: 'Six venues. One job.',
    entries: [
      {
        title: 'Fukuoka SoftBank Hawks',
        venue: 'PayPay Dome Fukuoka',
        body: "Ongoing since 2025 and now in a second contract. We run the in-stadium LED advertising for the club's international audience, producing and operating screen content in English, French and Spanish across all home games.",
        image: {
          src: '/images/japan-execution/paypay-dome-hawks.webp',
          alt: 'In-stadium LED advertising boards at PayPay Dome Fukuoka carrying multilingual screen content during a home game',
          caption: '',
          width: 1600,
          height: 1000,
          ready: false,
        },
      },
      {
        title: 'Kusama Yayoi auction',
        venue: 'The Ritz-Carlton Fukuoka, for JTL Auctions',
        body: "Production delivered directly for the auction house, inside one of Kyushu's most demanding luxury venues.",
        image: {
          src: '/images/japan-execution/kusama-auction-jtl.webp',
          alt: 'Auction floor production for JTL Auctions staged inside a luxury hotel ballroom in Fukuoka',
          caption: '',
          width: 1600,
          height: 1000,
          ready: false,
        },
      },
      {
        title: 'Kansai Collection 2026 A/W',
        venue: 'Kyocera Dome Osaka',
        body: "LED content produced in-house, running across six screen surfaces on the main stage. Brand integration for international partners including SHEIN, Casamigos and G's Up.",
        image: {
          src: '/images/japan-execution/kansai-collection-kyocera-dome.webp',
          alt: 'Kansai Collection finale at Kyocera Dome Osaka, runway lit under six LED surfaces carrying the show artwork',
          caption: '',
          width: 1600,
          height: 1000,
          ready: true,
        },
      },
      {
        title: 'TGC Kitakyushu 2025',
        venue: 'West Japan General Exhibition Center',
        body: "Brand integration and screen content for SHEIN. Our on-site team reported directly to SHEIN's APAC lead in English while running Japanese vendors in Japanese. Five crew days on site.",
        image: {
          src: '/images/japan-execution/tgc-kitakyushu-shein.webp',
          alt: 'Runway and screen content at TGC Kitakyushu inside the West Japan General Exhibition Center, brand integration running for SHEIN',
          caption: '',
          width: 1600,
          height: 1000,
          ready: false,
        },
      },
      {
        title: 'Asia Fashion Fair Osaka 2025',
        venue: 'Mydome Osaka',
        body: "Four foreign brand booths managed end to end. Live streaming content on the venue's LED screens, booth and Japanese payment coordination, five crew days on site.",
        image: {
          src: '/images/japan-execution/asia-fashion-fair-osaka.webp',
          alt: 'Foreign brand booths on the Asia Fashion Fair floor at Mydome Osaka, with live streaming feeding the venue LED screens',
          caption: '',
          width: 1600,
          height: 1000,
          ready: false,
        },
      },
    ] as CaseEntry[],
    pullQuote:
      'An international brand on one side. Local production on the other. Streetshow in between.',
  },

  groundTruth: {
    h2: 'Four things about Japan that are not in your production bible.',
    items: [
      {
        lead: 'Your wireless packages cannot legally be operated here.',
        body: 'Every microphone and comms unit needs Japanese technical conformity certification. Units shipped from the US or EU are not a workaround, they are a fine.',
      },
      {
        lead: 'Japan runs 100V. Tokyo runs 50Hz, Osaka runs 60Hz.',
        body: 'Equipment travelling with you needs conversion, and the frequency changes depending on which half of the country you are in.',
      },
      {
        lead: 'Many venues here appoint their own technical supplier.',
        body: 'Convention halls, arenas, hotels and event spaces frequently require you to work through their nominated contractor for rigging and power. It can reshape your entire cost base, and it is a question worth asking before you build a budget, not after.',
      },
      {
        lead: 'Japan closes properly.',
        body: 'Golden Week, Obon, Silver Week, New Year. A supplier will not hand you a ballpark to bridge the gap, because here a quoted number is a committed number.',
      },
    ],
    closing:
      'We know these because we work here. Your schedule does not have to learn them the expensive way.',
  },

  plugIn: {
    h2: 'How we plug in',
    columns: [
      {
        heading: 'Planning',
        body: 'Creative feasibility, venue and vendor communication, local supplier sourcing, fabrication lead times, technical planning, schedule coordination.',
      },
      {
        heading: 'Show weeks',
        body: 'Bilingual production liaison on site, vendor management, technical troubleshooting, screen and content coordination.',
      },
      {
        heading: 'After',
        body: 'Content delivery, vendor close-out, asset management, local follow-through.',
      },
    ],
    closing:
      'You keep creative ownership and global production control. We are the Japan-side execution layer.',
  },

  form: {
    h2: 'Tell us what you are delivering in Japan. We will tell you what it actually takes.',
    subhead:
      'Six questions. Ninety seconds. No brief required, no deck required. You get a straight answer on feasibility, timing and realistic cost range from people who work here, whether or not you end up working with us.',
    submitLabel: 'Send it over',
    confirmation: 'Thank you. We will come back to you within one business day, Japan time.',
  },

  closingLine: 'EN / JP / FR in-house · Fukuoka and Tokyo · Japan-wide',
};
