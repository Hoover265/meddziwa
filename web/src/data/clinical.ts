export interface SymptomQuestion {
  id: string
  text: string
  type: 'single' | 'multi' | 'boolean' | 'duration'
  options?: { value: string; label: string }[]
  dependsOn?: { questionId: string; value: string }
}

export const CHIEF_COMPLAINTS = [
  { value: 'fever', label: 'Fever' },
  { value: 'cough', label: 'Cough' },
  { value: 'diarrhoea', label: 'Diarrhoea' },
  { value: 'headache', label: 'Headache' },
  { value: 'abdominal_pain', label: 'Abdominal pain' },
  { value: 'skin_rash', label: 'Skin rash' },
  { value: 'difficulty_breathing', label: 'Difficulty breathing' },
  { value: 'other', label: 'Other (describe below)' },
] as const

export const QUESTION_TREE: Record<string, SymptomQuestion[]> = {
  fever: [
    {
      id: 'fever_duration',
      text: 'How long has the patient had fever?',
      type: 'single',
      options: [
        { value: 'lt_24h', label: 'Less than 24 hours' },
        { value: '1_3d', label: '1–3 days' },
        { value: '4_7d', label: '4–7 days' },
        { value: 'gt_7d', label: 'More than 7 days' },
      ],
    },
    {
      id: 'fever_pattern',
      text: 'Fever pattern',
      type: 'single',
      options: [
        { value: 'constant', label: 'Constant' },
        { value: 'intermittent', label: 'Intermittent' },
      ],
    },
    {
      id: 'fever_chills',
      text: 'Does the patient have chills or rigors?',
      type: 'boolean',
    },
    {
      id: 'fever_sweating',
      text: 'Night sweats or excessive sweating?',
      type: 'boolean',
    },
  ],
  cough: [
    {
      id: 'cough_type',
      text: 'Type of cough',
      type: 'single',
      options: [
        { value: 'dry', label: 'Dry cough' },
        { value: 'productive', label: 'Productive (with phlegm)' },
      ],
    },
    {
      id: 'cough_duration',
      text: 'Cough duration',
      type: 'single',
      options: [
        { value: 'acute', label: 'Less than 2 weeks' },
        { value: 'subacute', label: '2–4 weeks' },
        { value: 'chronic', label: 'More than 4 weeks' },
      ],
    },
    {
      id: 'cough_chest_pain',
      text: 'Associated chest pain?',
      type: 'boolean',
    },
  ],
  diarrhoea: [
    {
      id: 'diarrhoea_duration',
      text: 'Duration of diarrhoea',
      type: 'single',
      options: [
        { value: 'acute', label: 'Less than 14 days' },
        { value: 'persistent', label: '14 days or more' },
      ],
    },
    {
      id: 'diarrhoea_blood',
      text: 'Blood in stool?',
      type: 'boolean',
    },
    {
      id: 'diarrhoea_dehydration',
      text: 'Signs of dehydration (sunken eyes, dry mouth, reduced urine)?',
      type: 'boolean',
    },
  ],
  default: [
    {
      id: 'general_duration',
      text: 'How long have symptoms been present?',
      type: 'single',
      options: [
        { value: 'lt_24h', label: 'Less than 24 hours' },
        { value: '1_3d', label: '1–3 days' },
        { value: '4_7d', label: '4–7 days' },
        { value: 'gt_7d', label: 'More than 7 days' },
      ],
    },
    {
      id: 'general_severity',
      text: 'Overall symptom severity',
      type: 'single',
      options: [
        { value: 'mild', label: 'Mild' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'severe', label: 'Severe' },
      ],
    },
  ],
}

export function getQuestionsForComplaint(complaint: string): SymptomQuestion[] {
  return QUESTION_TREE[complaint] ?? QUESTION_TREE.default
}

/** Phase 0 mock inference — replaced by ONNX / API in Phase 1 */
export function mockDiagnose(complaint: string): { diagnoses: { disease: string; probability: number }[]; lowConfidence: boolean } {
  const maps: Record<string, { disease: string; probability: number }[]> = {
    fever: [
      { disease: 'Malaria', probability: 0.68 },
      { disease: 'Typhoid fever', probability: 0.22 },
      { disease: 'Pneumonia', probability: 0.06 },
      { disease: 'UTI', probability: 0.03 },
      { disease: 'HIV-related illness', probability: 0.01 },
    ],
    cough: [
      { disease: 'Acute respiratory infection', probability: 0.55 },
      { disease: 'Pneumonia', probability: 0.28 },
      { disease: 'TB', probability: 0.12 },
      { disease: 'Asthma exacerbation', probability: 0.03 },
      { disease: 'COVID-19', probability: 0.02 },
    ],
    diarrhoea: [
      { disease: 'Acute watery diarrhoea', probability: 0.52 },
      { disease: 'Cholera', probability: 0.18 },
      { disease: 'Dysentery', probability: 0.15 },
      { disease: 'Typhoid fever', probability: 0.1 },
      { disease: 'Malnutrition-related', probability: 0.05 },
    ],
  }

  const diagnoses = maps[complaint] ?? [
    { disease: 'Undifferentiated febrile illness', probability: 0.45 },
    { disease: 'Malaria', probability: 0.25 },
    { disease: 'Typhoid fever', probability: 0.15 },
    { disease: 'ARI', probability: 0.1 },
    { disease: 'Other', probability: 0.05 },
  ]

  return {
    diagnoses,
    lowConfidence: diagnoses[0].probability < 0.5,
  }
}

export const STG_TREATMENTS: Record<string, {
  drug: string
  adultDose: string
  paediatricDose: string
  route: string
  duration: string
  referralCriteria?: string[]
  dangerSigns?: string[]
}> = {
  Malaria: {
    drug: 'Artemether-Lumefantrine (Coartem)',
    adultDose: '4 tablets twice daily (day 0, 1, 2)',
    paediatricDose: 'Weight-based per STG malaria table',
    route: 'Oral',
    duration: '3 days',
    referralCriteria: ['Unable to tolerate oral medication', 'Severe malaria signs'],
    dangerSigns: ['Convulsions', 'Prostration', 'Unable to drink', 'Persistent vomiting'],
  },
  'Typhoid fever': {
    drug: 'Ciprofloxacin',
    adultDose: '500mg twice daily',
    paediatricDose: '15mg/kg twice daily (max 500mg)',
    route: 'Oral',
    duration: '7–10 days',
    referralCriteria: ['Suspected perforation', 'Severe dehydration'],
    dangerSigns: ['Abdominal rigidity', 'Altered consciousness', 'Haemorrhage'],
  },
  Pneumonia: {
    drug: 'Amoxicillin',
    adultDose: '500mg three times daily',
    paediatricDose: '40mg/kg/day in 3 divided doses',
    route: 'Oral',
    duration: '5 days',
    referralCriteria: ['Chest indrawing', 'SpO2 < 90%', 'Unable to feed'],
    dangerSigns: ['Central cyanosis', 'Grunting', 'Convulsions'],
  },
}
