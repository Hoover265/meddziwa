export type NeonatalQuestionType = 'choice' | 'number'

export interface NeonatalOption {
  value: string
  label: string
  danger?: boolean
}

export interface NeonatalQuestion {
  id: string
  prompt: string
  type: NeonatalQuestionType
  unit?: string
  placeholder?: string
  options?: NeonatalOption[]
}

export interface NeonatalSection {
  id: string
  title: string
  icon: string
  description: string
  questions: NeonatalQuestion[]
}

const yesNo = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

const yesNoUnknown = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown' },
]

const durationOptions = [
  { value: 'lt_24h', label: 'Less than 24 hours' },
  { value: '1_3_days', label: '1-3 days' },
  { value: '4_7_days', label: '4-7 days' },
  { value: 'gt_7_days', label: 'More than 7 days' },
]

export const NEONATAL_SECTIONS: NeonatalSection[] = [
  {
    id: 'general_condition',
    title: 'General Condition & Activity',
    icon: 'GA',
    description: 'Activity, movement, tone, and response to stimulation.',
    questions: [
      {
        id: 'activity',
        prompt: 'How active is the baby?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Active normally' },
          { value: 'less_active', label: 'Less active than usual' },
          { value: 'very_sleepy', label: 'Very sleepy', danger: true },
          { value: 'difficult_wake', label: 'Difficult to wake', danger: true },
          { value: 'unresponsive', label: 'Unresponsive', danger: true },
        ],
      },
      {
        id: 'movement',
        prompt: 'How does the baby move?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Moves all limbs normally' },
          { value: 'reduced', label: 'Reduced movements' },
          { value: 'one_arm_less', label: 'One arm moves less', danger: true },
          { value: 'one_leg_less', label: 'One leg moves less', danger: true },
          { value: 'none', label: 'No spontaneous movements', danger: true },
        ],
      },
      {
        id: 'tone',
        prompt: "How does the baby's body feel?",
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal muscle tone' },
          { value: 'floppy', label: 'Floppy', danger: true },
          { value: 'stiff', label: 'Stiff' },
          { value: 'variable', label: 'Sometimes floppy and sometimes stiff' },
        ],
      },
      {
        id: 'response',
        prompt: 'How does the baby respond when stimulated?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal response' },
          { value: 'reduced', label: 'Reduced response' },
          { value: 'none', label: 'No response', danger: true },
        ],
      },
    ],
  },
  {
    id: 'feeding',
    title: 'Feeding',
    icon: 'FD',
    description: 'Feeding effort, suck strength, choking, sweating, and onset.',
    questions: [
      {
        id: 'feeding_status',
        prompt: "How is the baby's feeding?",
        type: 'choice',
        options: [
          { value: 'normal', label: 'Feeding normally' },
          { value: 'less', label: 'Feeding less than usual' },
          { value: 'poor', label: 'Poor feeding', danger: true },
          { value: 'refusing', label: 'Refusing feeds completely', danger: true },
        ],
      },
      {
        id: 'suck_strength',
        prompt: "How strong is the baby's suck?",
        type: 'choice',
        options: [
          { value: 'strong', label: 'Strong suck' },
          { value: 'weak', label: 'Weak suck', danger: true },
          { value: 'none', label: 'No suck', danger: true },
        ],
      },
      { id: 'tires_feeding', prompt: 'Does the baby tire during feeding?', type: 'choice', options: yesNo },
      { id: 'sweats_feeding', prompt: 'Does the baby sweat during feeding?', type: 'choice', options: yesNo },
      { id: 'chokes_feeding', prompt: 'Does the baby choke during feeding?', type: 'choice', options: yesNo },
      { id: 'since_birth', prompt: 'Has this feeding problem existed since birth?', type: 'choice', options: yesNoUnknown },
    ],
  },
  {
    id: 'crying_temperature',
    title: 'Crying & Temperature',
    icon: 'CT',
    description: 'Cry character, consolability, fever, coldness, and duration.',
    questions: [
      {
        id: 'cry',
        prompt: "How would you describe the baby's cry?",
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal cry' },
          { value: 'weak', label: 'Weak cry', danger: true },
          { value: 'excessive', label: 'Excessive crying' },
          { value: 'continuous', label: 'Continuous crying' },
          { value: 'high_pitched', label: 'High-pitched cry', danger: true },
          { value: 'none', label: 'No cry', danger: true },
        ],
      },
      {
        id: 'comforted',
        prompt: 'Can the baby be comforted?',
        type: 'choice',
        options: [
          { value: 'easy', label: 'Easily comforted' },
          { value: 'difficult', label: 'Difficult to comfort' },
          { value: 'cannot', label: 'Cannot be comforted', danger: true },
        ],
      },
      { id: 'felt_hot', prompt: 'Has the baby felt hot?', type: 'choice', options: yesNo },
      { id: 'felt_cold', prompt: 'Has the baby felt unusually cold?', type: 'choice', options: yesNo },
      { id: 'highest_temp', prompt: 'What is the highest recorded temperature?', type: 'number', unit: 'C', placeholder: '37.5' },
      { id: 'temperature_duration', prompt: 'How long has the temperature problem been present?', type: 'choice', options: durationOptions },
      {
        id: 'temperature_pattern',
        prompt: 'How does the temperature occur?',
        type: 'choice',
        options: [
          { value: 'constant', label: 'Constant' },
          { value: 'intermittent', label: 'Comes and goes' },
        ],
      },
    ],
  },
  {
    id: 'breathing_airway',
    title: 'Breathing, Cough & Airway',
    icon: 'BR',
    description: 'Respiratory distress, rate, cough, blood, and noisy breathing.',
    questions: [
      { id: 'difficulty_breathing', prompt: 'Does the baby have difficulty breathing?', type: 'choice', options: yesNo },
      { id: 'respiratory_rate', prompt: 'What is the respiratory rate?', type: 'number', unit: 'breaths/min', placeholder: '60' },
      {
        id: 'chest_indrawing',
        prompt: 'Does the chest pull inward during breathing?',
        type: 'choice',
        options: [
          { value: 'no', label: 'No' },
          { value: 'mild', label: 'Mildly', danger: true },
          { value: 'severe', label: 'Severely', danger: true },
        ],
      },
      { id: 'grunting', prompt: 'Does the baby grunt while breathing?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'apnea', prompt: 'Does the baby stop breathing?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'nasal_flaring', prompt: 'Do the nostrils widen during breathing?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'worse_feeding', prompt: 'Does breathing difficulty worsen during feeding?', type: 'choice', options: yesNo },
      { id: 'cough', prompt: 'Does the baby have a cough?', type: 'choice', options: yesNo },
      {
        id: 'cough_type',
        prompt: 'What type of cough is present?',
        type: 'choice',
        options: [
          { value: 'dry', label: 'Dry cough' },
          { value: 'wet', label: 'Wet cough' },
          { value: 'unknown', label: 'Unknown' },
        ],
      },
      { id: 'cough_duration', prompt: 'How long has the cough been present?', type: 'choice', options: durationOptions },
      { id: 'blood_coughing', prompt: 'Is blood seen during coughing?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      {
        id: 'noisy_breathing',
        prompt: 'Is noisy breathing present?',
        type: 'choice',
        options: [
          { value: 'wheezing', label: 'Wheezing' },
          { value: 'stridor', label: 'Stridor', danger: true },
          { value: 'snoring', label: 'Snoring' },
          { value: 'gurgling', label: 'Gurgling' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
  },
  {
    id: 'colour_jaundice',
    title: 'Colour Changes & Jaundice',
    icon: 'CJ',
    description: 'Pallor, cyanosis, jaundice timing, urine colour, and stool colour.',
    questions: [
      {
        id: 'colour',
        prompt: 'What colour best describes the baby?',
        type: 'choice',
        options: [
          { value: 'pink', label: 'Normal pink' },
          { value: 'pale', label: 'Pale', danger: true },
          { value: 'blue', label: 'Blue', danger: true },
          { value: 'grey', label: 'Grey', danger: true },
          { value: 'mottled', label: 'Mottled' },
        ],
      },
      {
        id: 'blue_location',
        prompt: 'If blue, where is the blue colour seen?',
        type: 'choice',
        options: [
          { value: 'lips', label: 'Lips', danger: true },
          { value: 'tongue', label: 'Tongue', danger: true },
          { value: 'hands_feet', label: 'Hands and feet' },
          { value: 'whole_body', label: 'Whole body', danger: true },
        ],
      },
      {
        id: 'blue_timing',
        prompt: 'If blue, when is the blue colour noticed?',
        type: 'choice',
        options: [
          { value: 'constant', label: 'Constantly', danger: true },
          { value: 'feeding', label: 'During feeding' },
          { value: 'crying', label: 'During crying' },
          { value: 'activity', label: 'During activity' },
        ],
      },
      { id: 'jaundice', prompt: "Has the baby's skin or eyes become yellow?", type: 'choice', options: yesNo },
      {
        id: 'jaundice_onset',
        prompt: 'When was the yellow colour first noticed?',
        type: 'choice',
        options: [
          { value: 'within_24h', label: 'Within 24 hours after birth', danger: true },
          { value: 'day_2_3', label: 'Day 2-3' },
          { value: 'day_4_7', label: 'Day 4-7' },
          { value: 'after_day_7', label: 'After day 7' },
        ],
      },
      { id: 'jaundice_increasing', prompt: 'Is the yellow colour increasing?', type: 'choice', options: yesNo },
      { id: 'yellow_palms_soles', prompt: 'Are the palms or soles yellow?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      {
        id: 'jaundice_urine_colour',
        prompt: 'What is the urine colour?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'dark_yellow', label: 'Dark yellow' },
          { value: 'brown', label: 'Brown', danger: true },
        ],
      },
      {
        id: 'jaundice_stool_colour',
        prompt: 'What is the stool colour?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'pale', label: 'Pale', danger: true },
          { value: 'white', label: 'White', danger: true },
        ],
      },
    ],
  },
  {
    id: 'digestion_output',
    title: 'Vomiting, Stool & Urination',
    icon: 'DU',
    description: 'Vomiting, abdominal swelling, first stool, stool changes, and urine.',
    questions: [
      { id: 'vomited', prompt: 'Has the baby vomited?', type: 'choice', options: yesNo },
      {
        id: 'vomit_appearance',
        prompt: 'What does the vomit look like?',
        type: 'choice',
        options: [
          { value: 'milk', label: 'Milk' },
          { value: 'curdled', label: 'Curdled milk' },
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green', danger: true },
          { value: 'blood', label: 'Blood-stained', danger: true },
        ],
      },
      { id: 'forceful_vomiting', prompt: 'Is the vomiting forceful?', type: 'choice', options: yesNo },
      {
        id: 'vomit_frequency',
        prompt: 'How often does vomiting occur?',
        type: 'choice',
        options: [
          { value: 'once', label: 'Once' },
          { value: 'occasionally', label: 'Occasionally' },
          { value: 'frequently', label: 'Frequently' },
          { value: 'every_feed', label: 'After every feed', danger: true },
        ],
      },
      {
        id: 'abdomen_swollen',
        prompt: 'Does the abdomen appear swollen?',
        type: 'choice',
        options: [
          { value: 'no', label: 'No' },
          { value: 'mild', label: 'Mildly swollen' },
          { value: 'moderate', label: 'Moderately swollen' },
          { value: 'severe', label: 'Severely swollen', danger: true },
        ],
      },
      { id: 'passed_stool', prompt: 'Has the baby passed stool?', type: 'choice', options: yesNo },
      { id: 'first_stool_24h', prompt: 'Was the first stool passed within 24 hours after birth?', type: 'choice', options: yesNoUnknown },
      {
        id: 'stool_consistency',
        prompt: 'What is the stool consistency?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'loose', label: 'Loose' },
          { value: 'watery', label: 'Watery' },
          { value: 'hard', label: 'Hard' },
        ],
      },
      { id: 'blood_stool', prompt: 'Is blood present in the stool?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'mucus_stool', prompt: 'Is mucus present in the stool?', type: 'choice', options: yesNo },
      {
        id: 'urine_normal',
        prompt: 'Is the baby passing urine normally?',
        type: 'choice',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No', danger: true },
          { value: 'reduced', label: 'Reduced', danger: true },
        ],
      },
      {
        id: 'urine_colour',
        prompt: 'What colour is the urine?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'dark_yellow', label: 'Dark yellow' },
          { value: 'red', label: 'Red', danger: true },
          { value: 'brown', label: 'Brown', danger: true },
        ],
      },
      { id: 'blood_urine', prompt: 'Is blood visible in the urine?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
    ],
  },
  {
    id: 'neurological_skin_cord',
    title: 'Neurological, Skin & Cord',
    icon: 'NS',
    description: 'Convulsions, tremors, fontanelle, rash, infection, and umbilical cord.',
    questions: [
      { id: 'convulsions', prompt: 'Has the baby had convulsions or fits?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'lip_smacking', prompt: 'Has the baby had lip-smacking movements?', type: 'choice', options: yesNo },
      { id: 'abnormal_eye_movements', prompt: 'Has the baby had abnormal eye movements?', type: 'choice', options: yesNo },
      { id: 'tremors', prompt: 'Does the baby have tremors or shaking?', type: 'choice', options: yesNo },
      {
        id: 'fontanelle',
        prompt: 'How does the soft spot (fontanelle) appear?',
        type: 'choice',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'bulging', label: 'Bulging', danger: true },
          { value: 'sunken', label: 'Sunken', danger: true },
        ],
      },
      { id: 'rash_present', prompt: 'Is a rash present?', type: 'choice', options: yesNo },
      {
        id: 'rash_type',
        prompt: 'What type of rash is present?',
        type: 'choice',
        options: [
          { value: 'flat', label: 'Flat rash' },
          { value: 'raised', label: 'Raised rash' },
          { value: 'blisters', label: 'Blisters' },
          { value: 'pus', label: 'Pus-filled lesions' },
          { value: 'purple', label: 'Purple spots', danger: true },
        ],
      },
      { id: 'skin_infection', prompt: 'Is there evidence of skin infection?', type: 'choice', options: yesNo },
      { id: 'cord_redness', prompt: 'Is there redness around the cord?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'cord_pus', prompt: 'Is pus coming from the cord?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'cord_bleeding', prompt: 'Is there bleeding from the cord?', type: 'choice', options: yesNo },
      { id: 'cord_smell', prompt: 'Is there a bad smell from the cord?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
    ],
  },
  {
    id: 'history_growth',
    title: 'Cardiac, Birth History & Growth',
    icon: 'HG',
    description: 'Cardiovascular signs, congenital findings, delivery, maternal history, and measurements.',
    questions: [
      { id: 'blue_feeding', prompt: 'Does the baby become blue during feeding?', type: 'choice', options: yesNo.map((option) => option.value === 'yes' ? { ...option, danger: true } : option) },
      { id: 'tires_easily_feeding', prompt: 'Does the baby tire easily during feeding?', type: 'choice', options: yesNo },
      { id: 'sweats_feeding_cardiac', prompt: 'Does the baby sweat during feeding?', type: 'choice', options: yesNo },
      { id: 'heart_murmur', prompt: 'Has a healthcare worker ever mentioned a heart murmur?', type: 'choice', options: yesNoUnknown },
      { id: 'body_swelling', prompt: 'Is there swelling of the body, feet, or legs?', type: 'choice', options: yesNo },
      { id: 'abnormality_birth', prompt: 'Was any abnormality noticed at birth?', type: 'choice', options: yesNo },
      {
        id: 'abnormality_type',
        prompt: 'What abnormality was noticed?',
        type: 'choice',
        options: [
          { value: 'head', label: 'Head abnormality' },
          { value: 'face', label: 'Face abnormality' },
          { value: 'mouth', label: 'Mouth abnormality' },
          { value: 'spine', label: 'Spine abnormality' },
          { value: 'limb', label: 'Limb abnormality' },
          { value: 'genital', label: 'Genital abnormality' },
          { value: 'multiple', label: 'Multiple abnormalities' },
        ],
      },
      {
        id: 'delivery_place',
        prompt: 'Where was the baby delivered?',
        type: 'choice',
        options: [
          { value: 'hospital', label: 'Hospital' },
          { value: 'health_centre', label: 'Health centre' },
          { value: 'home', label: 'Home' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 'delivery_mode',
        prompt: 'What was the mode of delivery?',
        type: 'choice',
        options: [
          { value: 'vaginal', label: 'Vaginal delivery' },
          { value: 'assisted', label: 'Assisted vaginal delivery' },
          { value: 'caesarean', label: 'Caesarean section' },
        ],
      },
      { id: 'cried_birth', prompt: 'Did the baby cry immediately after birth?', type: 'choice', options: yesNoUnknown },
      { id: 'resuscitation', prompt: 'Was resuscitation required after birth?', type: 'choice', options: yesNoUnknown },
      { id: 'neonatal_unit', prompt: 'Was the baby admitted to a neonatal unit?', type: 'choice', options: yesNoUnknown },
      { id: 'mother_fever', prompt: 'Did the mother have fever during pregnancy or labour?', type: 'choice', options: yesNoUnknown },
      { id: 'waters_18h', prompt: "Did the mother's water break more than 18 hours before delivery?", type: 'choice', options: yesNoUnknown },
      {
        id: 'hiv_status',
        prompt: "What is the mother's HIV status?",
        type: 'choice',
        options: [
          { value: 'positive', label: 'Positive' },
          { value: 'negative', label: 'Negative' },
          { value: 'unknown', label: 'Unknown' },
        ],
      },
      { id: 'syphilis', prompt: 'Was the mother diagnosed with syphilis during pregnancy?', type: 'choice', options: yesNoUnknown },
      { id: 'tuberculosis', prompt: 'Did the mother have tuberculosis during pregnancy?', type: 'choice', options: yesNoUnknown },
      { id: 'malaria', prompt: 'Did the mother have malaria during pregnancy?', type: 'choice', options: yesNoUnknown },
      { id: 'diabetes', prompt: 'Did the mother have diabetes during pregnancy?', type: 'choice', options: yesNoUnknown },
      { id: 'hypertension', prompt: 'Did the mother have hypertension during pregnancy?', type: 'choice', options: yesNoUnknown },
      { id: 'current_weight', prompt: 'Current weight', type: 'number', unit: 'kg', placeholder: '3.2' },
      { id: 'birth_weight', prompt: 'Birth weight', type: 'number', unit: 'kg', placeholder: '3.0' },
      { id: 'length', prompt: 'Length', type: 'number', unit: 'cm', placeholder: '50' },
      { id: 'head_circumference', prompt: 'Head circumference', type: 'number', unit: 'cm', placeholder: '35' },
    ],
  },
]

export const NEONATAL_QUESTION_COUNT = NEONATAL_SECTIONS.reduce(
  (total, section) => total + section.questions.length,
  0,
)
