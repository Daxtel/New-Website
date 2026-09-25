// Japan Execution enquiry: step definitions.
//
// Six qualifying questions, then contact. Contact details are deliberately last:
// nothing is asked for until the visitor has already invested six answers.
// Kept separate from the page copy so the form can be reused or backported.

export type StepField =
  | 'delivering'
  | 'timing'
  | 'size'
  | 'region'
  | 'budget'
  | 'needs';

export type QuestionStep = {
  field: StepField;
  /** Rendered as the <legend> of the step's fieldset. */
  question: string;
  /** Step 6 allows several answers; the rest are single-select and auto-advance. */
  multi?: boolean;
  options: string[];
};

export const questionSteps: QuestionStep[] = [
  {
    field: 'delivering',
    question: 'What are you delivering in Japan?',
    options: [
      'Conference or keynote',
      'Brand activation or experiential',
      'Product launch',
      'Exhibition or trade show',
      'Film or content production',
      'Something else',
    ],
  },
  {
    field: 'timing',
    question: 'When?',
    options: [
      'Within 3 months',
      '3 to 6 months',
      '6 to 12 months',
      'Over 12 months',
      'Not fixed yet',
    ],
  },
  {
    field: 'size',
    question: 'Roughly how many people?',
    options: [
      'Under 200',
      '200 to 500',
      '500 to 1,000',
      '1,000 to 3,000',
      'Over 3,000',
      'Not defined yet',
    ],
  },
  {
    field: 'region',
    question: 'Where in Japan?',
    options: ['Tokyo', 'Osaka or Kansai', 'Kyushu', 'Multiple cities', 'Not decided yet'],
  },
  {
    field: 'budget',
    question: 'Budget range for Japan delivery',
    options: [
      'Under ¥10M',
      '¥10M to ¥30M',
      '¥30M to ¥60M',
      '¥60M to ¥100M',
      'Over ¥100M',
      'Not defined yet',
    ],
  },
  {
    field: 'needs',
    question: 'What do you need from us?',
    multi: true,
    options: [
      'Costing and feasibility',
      'Technical production',
      'Fabrication and scenic',
      'Bilingual coordination on site',
      'Screen and LED content',
      'Full Japan-side execution',
      'Not sure yet',
    ],
  },
];

export const contactStep = {
  question: 'Contact',
  helper: 'Where should the answer go?',
  fields: {
    name: 'Name',
    company: 'Company',
    email: 'Work email',
    notes: 'Anything else we should know?',
  },
};

/** Total steps including the contact step, for the progress indicator. */
export const TOTAL_STEPS = questionSteps.length + 1;
