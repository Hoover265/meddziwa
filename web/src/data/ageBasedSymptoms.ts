import type { AgeGroupDefinition, AgeGroupSymptoms, SymptomCategory } from '@/types/case'

export const AGE_GROUP_DEFINITIONS: AgeGroupDefinition[] = [
  {
    value: 'neonate',
    label: 'Neonate',
    ageRange: '0-28 days',
    minDays: 0,
    maxDays: 28,
  },
  {
    value: 'infant',
    label: 'Infant',
    ageRange: '1-12 months',
    minDays: 29,
    maxDays: 365,
  },
  {
    value: 'young_child',
    label: 'Young Child',
    ageRange: '1-4 years',
    minDays: 366,
    maxDays: 1461,
  },
  {
    value: 'child',
    label: 'Child',
    ageRange: '5-12 years',
    minDays: 1462,
    maxDays: 4383,
  },
  {
    value: 'adolescent',
    label: 'Adolescent',
    ageRange: '13-19 years',
    minDays: 4384,
    maxDays: 6939,
  },
  {
    value: 'adult',
    label: 'Adult',
    ageRange: '20-64 years',
    minDays: 6940,
    maxDays: 23725,
  },
  {
    value: 'elderly',
    label: 'Elderly',
    ageRange: '65+ years',
    minDays: 23726,
    maxDays: 36500,
  },
]

// Symptom categories for organization
const SYSTEMIC_VITAL: SymptomCategory = {
  id: 'systemic_vital',
  label: 'Systemic & Vital',
  description: 'General health indicators and vital functions',
  order: 1,
}

const NEUROLOGICAL_PAIN: SymptomCategory = {
  id: 'neurological_pain',
  label: 'Neurological & Pain',
  description: 'Consciousness, activity, and pain indicators',
  order: 2,
}

const SKIN_EXTERNAL: SymptomCategory = {
  id: 'skin_external',
  label: 'Skin & External',
  description: 'Visible skin and external features',
  order: 3,
}

// ============================================
// NEONATE (0-28 days) SYMPTOMS
// ============================================
export const NEONATE_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'neonate',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'neo_temp_warm',
          text: 'Baby feels warm or hot (if measured: ___°C rectal)',
          isDangerSign: false,
        },
        {
          id: 'neo_temp_cold',
          text: 'Baby feels cold to touch (if measured: ___°C rectal)',
          isDangerSign: false,
        },
        {
          id: 'neo_temp_extremities',
          text: 'Hands and feet feel cold, but chest is warm',
          isDangerSign: false,
        },
        {
          id: 'neo_temp_shiver',
          text: 'Baby is shivering or trembling',
          isDangerSign: false,
        },
        {
          id: 'neo_temp_sweat',
          text: 'Baby is sweating',
          isDangerSign: false,
        },
        {
          id: 'neo_breathing_fast',
          text: 'Breathing faster than normal',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'More than 60 breaths per minute?',
          followUpOptions: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        {
          id: 'neo_breathing_retractions',
          text: 'Chest or ribs pull in when breathing',
          isDangerSign: true,
          hasFollowUp: true,
          followUpQuestion: 'Where do you see pulling?',
          followUpOptions: [
            { value: 'under_ribs', label: 'Under ribs' },
            { value: 'between_ribs', label: 'Between ribs' },
            { value: 'above_breastbone', label: 'Above breastbone' },
          ],
        },
        {
          id: 'neo_breathing_grunt',
          text: 'Baby makes a grunting sound when breathing out',
          isDangerSign: true,
        },
        {
          id: 'neo_breathing_flare',
          text: 'Nostrils flare open while breathing',
          isDangerSign: true,
        },
        {
          id: 'neo_breathing_apnea',
          text: 'Baby stops breathing for a moment',
          isDangerSign: true,
          hasFollowUp: true,
          followUpQuestion: 'Longer than 20 seconds?',
          followUpOptions: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          id: 'neo_breathing_cyanosis',
          text: 'Lips, tongue, or face turn blue',
          isDangerSign: true,
        },
        {
          id: 'neo_breathing_noisy',
          text: 'Breathing is noisy',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'What kind of noise?',
          followUpOptions: [
            { value: 'wheezing', label: 'Wheezing' },
            { value: 'stridor', label: 'Stridor (harsh sound)' },
            { value: 'rattling', label: 'Rattling/gurgling' },
          ],
        },
        {
          id: 'neo_breathing_struggle',
          text: 'Baby struggles to breathe, using belly or neck muscles',
          isDangerSign: true,
        },
        {
          id: 'neo_breathing_irregular',
          text: 'Breathing pattern is irregular with short pauses (less than 10 seconds)',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_reduced',
          text: 'Baby is not feeding as much as usual',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_refuses',
          text: 'Baby refuses to feed or turns away',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_tires',
          text: 'Baby tires or falls asleep quickly while feeding',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_vomit',
          text: 'Baby vomits after feeding',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'Please describe:',
          followUpOptions: [
            { value: 'projectile', label: 'Forceful (projectile)' },
            { value: 'white_milk', label: 'White/milk color' },
            { value: 'yellow_green', label: 'Yellow/green (bile)' },
            { value: 'bloody', label: 'Bloody' },
          ],
        },
        {
          id: 'neo_feeding_spit',
          text: 'Baby spits up small amounts (positing)',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_choke',
          text: 'Baby chokes or coughs during feeding',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_difficulty',
          text: 'Baby has difficulty sucking or swallowing',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_not_waking',
          text: 'Baby is not waking up to feed',
          isDangerSign: true,
        },
        {
          id: 'neo_feeding_hungry_cry',
          text: 'Baby seems hungry but cries when feeding',
          isDangerSign: false,
        },
        {
          id: 'neo_feeding_weight',
          text: 'Baby has not regained birth weight',
          isDangerSign: true,
        },
        {
          id: 'neo_stool_watery',
          text: 'Watery stool (diarrhoea)',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'How many times per day?',
          followUpOptions: [
            { value: '1_3', label: '1-3' },
            { value: '4_6', label: '4-6' },
            { value: 'gt_6', label: 'More than 6' },
          ],
        },
        {
          id: 'neo_stool_blood',
          text: 'Blood or mucus in stool',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'Does it look like red currant jelly?',
          followUpOptions: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          id: 'neo_stool_hard',
          text: 'Hard, pellet-like stools (constipation)',
          isDangerSign: false,
        },
        {
          id: 'neo_stool_no_pass',
          text: 'Not passed stool for more than 2 days',
          isDangerSign: false,
        },
        {
          id: 'neo_stool_pale',
          text: 'Stool is pale or clay-coloured',
          isDangerSign: true,
        },
        {
          id: 'neo_stool_tarry',
          text: 'Blood in stool (red or black tarry)',
          isDangerSign: true,
        },
        {
          id: 'neo_stool_frothy',
          text: 'Stool is frothy or foul-smelling',
          isDangerSign: false,
        },
        {
          id: 'neo_urine_output',
          text: 'Not wetting nappies (less than 6 wet nappies in 24 hours)',
          isDangerSign: true,
        },
        {
          id: 'neo_urine_dark',
          text: 'Urine is dark or concentrated',
          isDangerSign: false,
        },
        {
          id: 'neo_urine_blood',
          text: 'Blood in urine (pink/red stain in nappy)',
          isDangerSign: false,
        },
        {
          id: 'neo_urine_strain',
          text: 'Baby strains or cries when passing urine/stool',
          isDangerSign: false,
        },
        {
          id: 'neo_growth_weight_loss',
          text: 'Not gaining weight or losing weight',
          isDangerSign: true,
        },
        {
          id: 'neo_growth_wasted',
          text: 'Looks thin or wasted',
          isDangerSign: true,
        },
        {
          id: 'neo_growth_two_weeks',
          text: 'Has not regained birth weight by 2 weeks',
          isDangerSign: true,
        },
        {
          id: 'neo_growth_small',
          text: 'Seems smaller than expected',
          isDangerSign: false,
        },
        {
          id: 'neo_growth_head_large',
          text: 'Head seems too large or growing too fast',
          isDangerSign: true,
        },
        {
          id: 'neo_growth_fontanelle_sunken',
          text: 'Soft spot on head is sunken',
          isDangerSign: true,
        },
        {
          id: 'neo_growth_fontanelle_bulging',
          text: 'Soft spot is bulging',
          isDangerSign: true,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'neo_consciousness_sleepy',
          text: 'Very sleepy, difficult to wake up',
          isDangerSign: true,
        },
        {
          id: 'neo_consciousness_movement',
          text: 'Not moving arms and legs as much as before',
          isDangerSign: false,
        },
        {
          id: 'neo_consciousness_floppy',
          text: 'Seems floppy (poor muscle tone)',
          isDangerSign: true,
        },
        {
          id: 'neo_consciousness_stiff',
          text: 'Unusually stiff or rigid',
          isDangerSign: false,
        },
        {
          id: 'neo_consciousness_not_responding',
          text: 'Not responding to voice or touch',
          isDangerSign: true,
        },
        {
          id: 'neo_consciousness_less_alert',
          text: 'Less alert than usual',
          isDangerSign: false,
        },
        {
          id: 'neo_consciousness_jerky',
          text: 'Jerky or jittery movements',
          isDangerSign: false,
        },
        {
          id: 'neo_crying_more',
          text: 'Cries more than usual',
          isDangerSign: false,
        },
        {
          id: 'neo_crying_inconsolable',
          text: 'Cannot be comforted (inconsolable crying)',
          isDangerSign: true,
        },
        {
          id: 'neo_crying_different',
          text: 'Cry sounds different: high-pitched or weak',
          isDangerSign: true,
        },
        {
          id: 'neo_crying_pain',
          text: 'Seems to be in pain (facial grimace, drawing up legs)',
          isDangerSign: false,
        },
        {
          id: 'neo_crying_touch',
          text: 'Cries when touched or moved',
          isDangerSign: false,
        },
        {
          id: 'neo_crying_arch',
          text: 'Arches back or stiffens while crying',
          isDangerSign: false,
        },
        {
          id: 'neo_crying_irritable',
          text: 'Very irritable and fussy',
          isDangerSign: false,
        },
        {
          id: 'neo_crying_gas',
          text: 'Crying associated with passing stool or gas',
          isDangerSign: false,
        },
        {
          id: 'neo_movement_stiff',
          text: 'Arms and legs are stiff and hard to bend',
          isDangerSign: false,
        },
        {
          id: 'neo_movement_jerking',
          text: 'Jerking or shaking of arms/legs (not related to crying)',
          isDangerSign: false,
        },
        {
          id: 'neo_movement_twitching',
          text: 'Twitching of face or mouth',
          isDangerSign: false,
        },
        {
          id: 'neo_movement_seizure',
          text: 'Rhythmic, repeated jerking (possible seizure)',
          isDangerSign: true,
          hasFollowUp: true,
          followUpQuestion: 'How long did it last?',
          followUpOptions: [
            { value: 'seconds', label: 'Seconds' },
            { value: 'minutes', label: 'Minutes' },
          ],
        },
        {
          id: 'neo_movement_asymmetric',
          text: 'One arm or leg moves less than the other',
          isDangerSign: true,
        },
        {
          id: 'neo_movement_posture',
          text: 'Unusual postures (arching back, head turned to one side)',
          isDangerSign: false,
        },
        {
          id: 'neo_movement_tremor',
          text: 'Trembling or jitteriness of chin or limbs',
          isDangerSign: false,
        },
        {
          id: 'neo_movement_inactive',
          text: 'Not moving much overall',
          isDangerSign: false,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'neo_skin_jaundice',
          text: 'Yellowing of skin or eyes (jaundice)',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'When did it start?',
          followUpOptions: [
            { value: 'first_24h', label: 'First 24 hours' },
            { value: '2_3_days', label: '2-3 days old' },
            { value: 'after_3_days', label: 'After 3 days' },
          ],
        },
        {
          id: 'neo_skin_rash_red',
          text: 'Red spots or rash',
          isDangerSign: false,
          hasFollowUp: true,
          followUpQuestion: 'What does it look like?',
          followUpOptions: [
            { value: 'pinpoint', label: 'Pinpoint dots' },
            { value: 'blotchy', label: 'Blotchy patches' },
            { value: 'blisters', label: 'Blisters/fluid-filled' },
            { value: 'pimple', label: 'Pimple-like' },
          ],
        },
        {
          id: 'neo_skin_nappy_rash',
          text: 'Nappy area rash',
          isDangerSign: false,
        },
        {
          id: 'neo_skin_petechiae',
          text: 'Purple spots that don\'t fade when pressed',
          isDangerSign: true,
        },
        {
          id: 'neo_skin_blisters',
          text: 'Blisters on skin',
          isDangerSign: false,
        },
        {
          id: 'neo_skin_pale',
          text: 'Skin looks pale or grey',
          isDangerSign: true,
        },
        {
          id: 'neo_skin_blue',
          text: 'Skin looks blue or dusky',
          isDangerSign: true,
        },
        {
          id: 'neo_skin_peeling',
          text: 'Skin is dry and peeling',
          isDangerSign: false,
        },
        {
          id: 'neo_skin_pus',
          text: 'Rash with pus or oozing',
          isDangerSign: false,
        },
        {
          id: 'neo_skin_bruising',
          text: 'Bruising or tiny red/purple spots that don\'t fade',
          isDangerSign: true,
        },
        {
          id: 'neo_umbilicus_red',
          text: 'Umbilical stump is red or swollen',
          isDangerSign: true,
        },
        {
          id: 'neo_umbilicus_discharge',
          text: 'Pus or discharge from the stump',
          isDangerSign: true,
        },
        {
          id: 'neo_umbilicus_smell',
          text: 'Foul smell from the cord area',
          isDangerSign: true,
        },
        {
          id: 'neo_umbilicus_bleeding',
          text: 'Bleeding from the stump',
          isDangerSign: false,
        },
        {
          id: 'neo_umbilicus_attached',
          text: 'Cord stump still attached after 3 weeks',
          isDangerSign: false,
        },
        {
          id: 'neo_umbilicus_navel_red',
          text: 'Skin around the navel is red',
          isDangerSign: false,
        },
        {
          id: 'neo_umbilicus_touch_pain',
          text: 'Baby cries when cord area is touched',
          isDangerSign: false,
        },
        {
          id: 'neo_eye_discharge',
          text: 'Eye discharge (yellow or green pus)',
          isDangerSign: false,
        },
        {
          id: 'neo_eye_redness',
          text: 'Redness or swelling of eyes/eyelids',
          isDangerSign: false,
        },
        {
          id: 'neo_eye_cloudy',
          text: 'Cloudy spot on the eye (cornea)',
          isDangerSign: true,
        },
        {
          id: 'neo_eye_size',
          text: 'One eye looks bigger than the other',
          isDangerSign: false,
        },
        {
          id: 'neo_eye_open',
          text: 'Eyes do not open or seem sensitive to light',
          isDangerSign: false,
        },
        {
          id: 'neo_eye_reflex',
          text: 'White pupil instead of normal red reflex',
          isDangerSign: true,
        },
        {
          id: 'neo_eye_watery',
          text: 'Eyes are watery without discharge',
          isDangerSign: false,
        },
        {
          id: 'neo_eye_crossed',
          text: 'Crossed eyes (beyond normal wandering)',
          isDangerSign: false,
        },
      ],
    },
  ],
}

// ============================================
// INFANT (1-12 months) SYMPTOMS - Dummy data based on Neonate structure
// ============================================
export const INFANT_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'infant',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'inf_temp_warm',
          text: 'Baby feels warm or hot (if measured: ___°C)',
          isDangerSign: false,
        },
        {
          id: 'inf_temp_cold',
          text: 'Baby feels cold to touch',
          isDangerSign: false,
        },
        {
          id: 'inf_breathing_fast',
          text: 'Breathing faster than normal',
          isDangerSign: false,
        },
        {
          id: 'inf_breathing_difficulty',
          text: 'Difficulty breathing or shortness of breath',
          isDangerSign: true,
        },
        {
          id: 'inf_breathing_noisy',
          text: 'Noisy breathing (wheezing, stridor)',
          isDangerSign: false,
        },
        {
          id: 'inf_feeding_reduced',
          text: 'Reduced feeding or appetite',
          isDangerSign: false,
        },
        {
          id: 'inf_feeding_refuses',
          text: 'Refuses to eat or drink',
          isDangerSign: false,
        },
        {
          id: 'inf_feeding_vomit',
          text: 'Vomiting after meals',
          isDangerSign: false,
        },
        {
          id: 'inf_stool_watery',
          text: 'Watery stools (diarrhoea)',
          isDangerSign: false,
        },
        {
          id: 'inf_stool_frequency',
          text: 'Increased stool frequency',
          isDangerSign: false,
        },
        {
          id: 'inf_stool_blood',
          text: 'Blood or mucus in stool',
          isDangerSign: true,
        },
        {
          id: 'inf_urine_reduced',
          text: 'Reduced urination',
          isDangerSign: true,
        },
        {
          id: 'inf_growth_weight',
          text: 'Poor weight gain or weight loss',
          isDangerSign: true,
        },
        {
          id: 'inf_growth_lethargy',
          text: 'General lethargy or weakness',
          isDangerSign: true,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'inf_conscious_sleepy',
          text: 'Excessive sleepiness or unresponsiveness',
          isDangerSign: true,
        },
        {
          id: 'inf_conscious_irritable',
          text: 'Irritability or unusual fussiness',
          isDangerSign: false,
        },
        {
          id: 'inf_crying_high_pitched',
          text: 'High-pitched cry',
          isDangerSign: true,
        },
        {
          id: 'inf_crying_inconsolable',
          text: 'Inconsolable crying',
          isDangerSign: true,
        },
        {
          id: 'inf_pain_signs',
          text: 'Signs of pain or discomfort',
          isDangerSign: false,
        },
        {
          id: 'inf_seizures',
          text: 'Seizures or convulsions',
          isDangerSign: true,
        },
        {
          id: 'inf_movement_jerky',
          text: 'Jerky or abnormal movements',
          isDangerSign: false,
        },
        {
          id: 'inf_movement_stiffness',
          text: 'Muscle stiffness or rigidity',
          isDangerSign: false,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'inf_skin_jaundice',
          text: 'Yellowing of skin or eyes (jaundice)',
          isDangerSign: false,
        },
        {
          id: 'inf_skin_rash',
          text: 'Skin rash or spots',
          isDangerSign: false,
        },
        {
          id: 'inf_skin_pale',
          text: 'Pale or grey-looking skin',
          isDangerSign: true,
        },
        {
          id: 'inf_skin_blue',
          text: 'Blue or dusky-looking skin',
          isDangerSign: true,
        },
        {
          id: 'inf_skin_swelling',
          text: 'Swelling (edema) in face, hands, or feet',
          isDangerSign: false,
        },
        {
          id: 'inf_eye_discharge',
          text: 'Eye discharge or redness',
          isDangerSign: false,
        },
        {
          id: 'inf_eye_swelling',
          text: 'Eye swelling or puffiness',
          isDangerSign: false,
        },
      ],
    },
  ],
}

// ============================================
// YOUNG CHILD (1-4 years) SYMPTOMS - Dummy data
// ============================================
export const YOUNG_CHILD_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'young_child',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'yc_temp_fever',
          text: 'Fever (temperature >38°C)',
          isDangerSign: false,
        },
        {
          id: 'yc_temp_high_fever',
          text: 'Very high fever (>39.5°C)',
          isDangerSign: true,
        },
        {
          id: 'yc_breathing_fast',
          text: 'Rapid breathing',
          isDangerSign: false,
        },
        {
          id: 'yc_breathing_difficulty',
          text: 'Difficulty breathing',
          isDangerSign: true,
        },
        {
          id: 'yc_cough_severe',
          text: 'Severe cough',
          isDangerSign: false,
        },
        {
          id: 'yc_eating_reduced',
          text: 'Reduced appetite or eating',
          isDangerSign: false,
        },
        {
          id: 'yc_drinking_reduced',
          text: 'Reduced drinking',
          isDangerSign: true,
        },
        {
          id: 'yc_vomiting',
          text: 'Vomiting',
          isDangerSign: false,
        },
        {
          id: 'yc_diarrhoea',
          text: 'Diarrhoea',
          isDangerSign: false,
        },
        {
          id: 'yc_abdominal_pain',
          text: 'Abdominal pain or cramping',
          isDangerSign: false,
        },
        {
          id: 'yc_urination_reduced',
          text: 'Reduced urination',
          isDangerSign: true,
        },
        {
          id: 'yc_dehydration',
          text: 'Signs of dehydration (dry mouth, sunken eyes)',
          isDangerSign: true,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'yc_energy_low',
          text: 'Low energy or lethargy',
          isDangerSign: false,
        },
        {
          id: 'yc_responsive',
          text: 'Not responding normally',
          isDangerSign: true,
        },
        {
          id: 'yc_irritable',
          text: 'Very irritable or fussy',
          isDangerSign: false,
        },
        {
          id: 'yc_headache',
          text: 'Complaining of headache',
          isDangerSign: false,
        },
        {
          id: 'yc_neck_stiff',
          text: 'Stiff neck',
          isDangerSign: true,
        },
        {
          id: 'yc_seizures',
          text: 'Seizures or convulsions',
          isDangerSign: true,
        },
        {
          id: 'yc_confusion',
          text: 'Confusion or altered mental state',
          isDangerSign: true,
        },
        {
          id: 'yc_pain_complaint',
          text: 'Complaint of pain',
          isDangerSign: false,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'yc_rash',
          text: 'Skin rash',
          isDangerSign: false,
        },
        {
          id: 'yc_petechiae',
          text: 'Red or purple spots that don\'t fade',
          isDangerSign: true,
        },
        {
          id: 'yc_pale',
          text: 'Pale appearance',
          isDangerSign: false,
        },
        {
          id: 'yc_cyanosis',
          text: 'Blue lips or fingernails',
          isDangerSign: true,
        },
        {
          id: 'yc_jaundice',
          text: 'Yellowing of skin or eyes',
          isDangerSign: false,
        },
        {
          id: 'yc_swelling',
          text: 'Swelling in face, hands, or feet',
          isDangerSign: false,
        },
        {
          id: 'yc_wounds',
          text: 'Open wounds or cuts',
          isDangerSign: false,
        },
      ],
    },
  ],
}

// ============================================
// CHILD (5-12 years) SYMPTOMS - Dummy data
// ============================================
export const CHILD_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'child',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'ch_fever',
          text: 'Fever',
          isDangerSign: false,
        },
        {
          id: 'ch_high_fever',
          text: 'High fever (>39.5°C)',
          isDangerSign: true,
        },
        {
          id: 'ch_cough',
          text: 'Cough',
          isDangerSign: false,
        },
        {
          id: 'ch_sore_throat',
          text: 'Sore throat',
          isDangerSign: false,
        },
        {
          id: 'ch_difficulty_breathing',
          text: 'Difficulty breathing',
          isDangerSign: true,
        },
        {
          id: 'ch_chest_pain',
          text: 'Chest pain',
          isDangerSign: true,
        },
        {
          id: 'ch_appetite_loss',
          text: 'Loss of appetite',
          isDangerSign: false,
        },
        {
          id: 'ch_nausea',
          text: 'Nausea or vomiting',
          isDangerSign: false,
        },
        {
          id: 'ch_abdominal_pain',
          text: 'Abdominal pain',
          isDangerSign: false,
        },
        {
          id: 'ch_diarrhoea',
          text: 'Diarrhoea',
          isDangerSign: false,
        },
        {
          id: 'ch_constipation',
          text: 'Constipation',
          isDangerSign: false,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'ch_fatigue',
          text: 'Fatigue or weakness',
          isDangerSign: false,
        },
        {
          id: 'ch_headache',
          text: 'Headache',
          isDangerSign: false,
        },
        {
          id: 'ch_severe_headache',
          text: 'Severe headache with neck stiffness',
          isDangerSign: true,
        },
        {
          id: 'ch_dizziness',
          text: 'Dizziness or vertigo',
          isDangerSign: false,
        },
        {
          id: 'ch_body_aches',
          text: 'Body aches',
          isDangerSign: false,
        },
        {
          id: 'ch_joint_pain',
          text: 'Joint pain or swelling',
          isDangerSign: false,
        },
        {
          id: 'ch_irritability',
          text: 'Irritability',
          isDangerSign: false,
        },
        {
          id: 'ch_confusion',
          text: 'Confusion',
          isDangerSign: true,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'ch_rash',
          text: 'Skin rash',
          isDangerSign: false,
        },
        {
          id: 'ch_severe_rash',
          text: 'Severe or spreading rash',
          isDangerSign: true,
        },
        {
          id: 'ch_itching',
          text: 'Itching or skin irritation',
          isDangerSign: false,
        },
        {
          id: 'ch_wounds',
          text: 'Wounds or cuts',
          isDangerSign: false,
        },
        {
          id: 'ch_boils',
          text: 'Boils or abscesses',
          isDangerSign: false,
        },
        {
          id: 'ch_swelling',
          text: 'Swelling in lymph nodes',
          isDangerSign: false,
        },
      ],
    },
  ],
}

// ============================================
// ADOLESCENT (13-19 years) SYMPTOMS - Dummy data
// ============================================
export const ADOLESCENT_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'adolescent',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'ad_fever',
          text: 'Fever',
          isDangerSign: false,
        },
        {
          id: 'ad_chills',
          text: 'Chills or sweating',
          isDangerSign: false,
        },
        {
          id: 'ad_cough',
          text: 'Cough',
          isDangerSign: false,
        },
        {
          id: 'ad_shortness_breath',
          text: 'Shortness of breath',
          isDangerSign: true,
        },
        {
          id: 'ad_chest_pain',
          text: 'Chest pain or discomfort',
          isDangerSign: true,
        },
        {
          id: 'ad_sore_throat',
          text: 'Sore throat or difficulty swallowing',
          isDangerSign: false,
        },
        {
          id: 'ad_appetite_loss',
          text: 'Loss of appetite',
          isDangerSign: false,
        },
        {
          id: 'ad_nausea',
          text: 'Nausea or vomiting',
          isDangerSign: false,
        },
        {
          id: 'ad_abdominal_pain',
          text: 'Abdominal pain or cramping',
          isDangerSign: false,
        },
        {
          id: 'ad_diarrhoea',
          text: 'Diarrhoea',
          isDangerSign: false,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'ad_fatigue',
          text: 'Fatigue or weakness',
          isDangerSign: false,
        },
        {
          id: 'ad_headache',
          text: 'Headache',
          isDangerSign: false,
        },
        {
          id: 'ad_severe_headache',
          text: 'Severe headache with neck stiffness',
          isDangerSign: true,
        },
        {
          id: 'ad_body_aches',
          text: 'Body or muscle aches',
          isDangerSign: false,
        },
        {
          id: 'ad_joint_pain',
          text: 'Joint pain or swelling',
          isDangerSign: false,
        },
        {
          id: 'ad_anxiety',
          text: 'Anxiety or panic attacks',
          isDangerSign: false,
        },
        {
          id: 'ad_depression',
          text: 'Depression or mood changes',
          isDangerSign: false,
        },
        {
          id: 'ad_confusion',
          text: 'Confusion or difficulty concentrating',
          isDangerSign: false,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'ad_rash',
          text: 'Skin rash or spots',
          isDangerSign: false,
        },
        {
          id: 'ad_acne',
          text: 'Acne or skin breakouts',
          isDangerSign: false,
        },
        {
          id: 'ad_swelling',
          text: 'Swelling in lymph nodes or joints',
          isDangerSign: false,
        },
        {
          id: 'ad_wounds',
          text: 'Wounds or cuts',
          isDangerSign: false,
        },
        {
          id: 'ad_hair_loss',
          text: 'Hair loss',
          isDangerSign: false,
        },
      ],
    },
  ],
}

// ============================================
// ADULT (20-64 years) SYMPTOMS - Dummy data
// ============================================
export const ADULT_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'adult',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'ad_fever',
          text: 'Fever (>38°C)',
          isDangerSign: false,
        },
        {
          id: 'ad_chills',
          text: 'Chills or night sweats',
          isDangerSign: false,
        },
        {
          id: 'ad_cough',
          text: 'Persistent cough',
          isDangerSign: false,
        },
        {
          id: 'ad_shortness_breath',
          text: 'Shortness of breath',
          isDangerSign: true,
        },
        {
          id: 'ad_chest_pain',
          text: 'Chest pain or pressure',
          isDangerSign: true,
        },
        {
          id: 'ad_rapid_heart',
          text: 'Rapid or irregular heartbeat',
          isDangerSign: true,
        },
        {
          id: 'ad_sore_throat',
          text: 'Sore throat',
          isDangerSign: false,
        },
        {
          id: 'ad_appetite_loss',
          text: 'Loss of appetite or weight',
          isDangerSign: false,
        },
        {
          id: 'ad_nausea',
          text: 'Nausea or vomiting',
          isDangerSign: false,
        },
        {
          id: 'ad_abdominal_pain',
          text: 'Abdominal pain',
          isDangerSign: false,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'ad_fatigue',
          text: 'Severe fatigue',
          isDangerSign: false,
        },
        {
          id: 'ad_headache',
          text: 'Headache',
          isDangerSign: false,
        },
        {
          id: 'ad_severe_headache',
          text: 'Severe headache',
          isDangerSign: true,
        },
        {
          id: 'ad_body_aches',
          text: 'Body aches',
          isDangerSign: false,
        },
        {
          id: 'ad_joint_pain',
          text: 'Joint or muscle pain',
          isDangerSign: false,
        },
        {
          id: 'ad_back_pain',
          text: 'Back pain',
          isDangerSign: false,
        },
        {
          id: 'ad_numbness',
          text: 'Numbness or tingling',
          isDangerSign: false,
        },
        {
          id: 'ad_dizziness',
          text: 'Dizziness or loss of balance',
          isDangerSign: true,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'ad_rash',
          text: 'Skin rash',
          isDangerSign: false,
        },
        {
          id: 'ad_itching',
          text: 'Itching or skin irritation',
          isDangerSign: false,
        },
        {
          id: 'ad_wounds',
          text: 'Wounds or cuts',
          isDangerSign: false,
        },
        {
          id: 'ad_swelling',
          text: 'Swelling in hands, feet, or face',
          isDangerSign: false,
        },
        {
          id: 'ad_bruising',
          text: 'Easy bruising',
          isDangerSign: false,
        },
        {
          id: 'ad_pallor',
          text: 'Pale or yellowish complexion',
          isDangerSign: false,
        },
      ],
    },
  ],
}

// ============================================
// ELDERLY (65+ years) SYMPTOMS - Dummy data
// ============================================
export const ELDERLY_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'elderly',
  categories: [
    {
      category: SYSTEMIC_VITAL,
      items: [
        {
          id: 'el_fever',
          text: 'Fever',
          isDangerSign: false,
        },
        {
          id: 'el_chills',
          text: 'Chills or sweating',
          isDangerSign: false,
        },
        {
          id: 'el_cough',
          text: 'Persistent cough',
          isDangerSign: false,
        },
        {
          id: 'el_shortness_breath',
          text: 'Shortness of breath',
          isDangerSign: true,
        },
        {
          id: 'el_chest_pain',
          text: 'Chest pain or tightness',
          isDangerSign: true,
        },
        {
          id: 'el_rapid_heart',
          text: 'Rapid or irregular heartbeat',
          isDangerSign: true,
        },
        {
          id: 'el_high_blood_pressure',
          text: 'Very high blood pressure',
          isDangerSign: true,
        },
        {
          id: 'el_appetite_loss',
          text: 'Loss of appetite',
          isDangerSign: false,
        },
        {
          id: 'el_nausea',
          text: 'Nausea or vomiting',
          isDangerSign: false,
        },
        {
          id: 'el_constipation',
          text: 'Constipation or irregular bowel movements',
          isDangerSign: false,
        },
      ],
    },
    {
      category: NEUROLOGICAL_PAIN,
      items: [
        {
          id: 'el_fatigue',
          text: 'Extreme fatigue or weakness',
          isDangerSign: true,
        },
        {
          id: 'el_confusion',
          text: 'Confusion or memory problems',
          isDangerSign: true,
        },
        {
          id: 'el_headache',
          text: 'Headache',
          isDangerSign: false,
        },
        {
          id: 'el_severe_headache',
          text: 'Severe headache',
          isDangerSign: true,
        },
        {
          id: 'el_joint_pain',
          text: 'Joint or muscle pain',
          isDangerSign: false,
        },
        {
          id: 'el_back_pain',
          text: 'Back or abdominal pain',
          isDangerSign: false,
        },
        {
          id: 'el_dizziness',
          text: 'Dizziness or loss of balance',
          isDangerSign: true,
        },
        {
          id: 'el_falls',
          text: 'Recent falls or loss of consciousness',
          isDangerSign: true,
        },
      ],
    },
    {
      category: SKIN_EXTERNAL,
      items: [
        {
          id: 'el_rash',
          text: 'Skin rash or changes',
          isDangerSign: false,
        },
        {
          id: 'el_pressure_sores',
          text: 'Pressure sores or bedsores',
          isDangerSign: true,
        },
        {
          id: 'el_wounds',
          text: 'Wounds or cuts',
          isDangerSign: false,
        },
        {
          id: 'el_swelling',
          text: 'Swelling in legs or feet',
          isDangerSign: false,
        },
        {
          id: 'el_bruising',
          text: 'Easy bruising or bleeding',
          isDangerSign: true,
        },
        {
          id: 'el_pallor',
          text: 'Pale or ashen appearance',
          isDangerSign: true,
        },
      ],
    },
  ],
}

// Export all symptoms as a map for easy lookup
export const ALL_SYMPTOMS: Record<string, AgeGroupSymptoms> = {
  neonate: NEONATE_SYMPTOMS,
  infant: INFANT_SYMPTOMS,
  young_child: YOUNG_CHILD_SYMPTOMS,
  child: CHILD_SYMPTOMS,
  adolescent: ADOLESCENT_SYMPTOMS,
  adult: ADULT_SYMPTOMS,
  elderly: ELDERLY_SYMPTOMS,
}

/**
 * Get symptoms for a specific age group
 */
export function getSymptomsByAgeGroup(ageGroup: string): AgeGroupSymptoms | undefined {
  return ALL_SYMPTOMS[ageGroup as keyof typeof ALL_SYMPTOMS]
}

/**
 * Calculate age group from age in years
 */
export function calculateAgeGroup(ageInYears: number): string {
  if (ageInYears < 1 / 12) return 'neonate' // Less than 1 month
  if (ageInYears < 1) return 'infant'
  if (ageInYears < 5) return 'young_child'
  if (ageInYears < 13) return 'child'
  if (ageInYears < 20) return 'adolescent'
  if (ageInYears < 65) return 'adult'
  return 'elderly'
}
