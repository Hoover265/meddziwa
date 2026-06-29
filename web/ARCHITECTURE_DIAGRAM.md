# Architecture Diagram - Age-Based Symptom System

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     MedDziwa Application                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Clinician Routes (/clinician)                   │
├─────────────────────────────────────────────────────────────────┤
│  └─ /intake              → PatientIntakePage                     │
│  └─ /symptoms ✨ NEW     → AgeBasedSymptomPage (NEW!)            │
│  └─ /questionnaire       → SymptomQuestionnairePage (legacy)    │
│  └─ /diagnosis           → DiagnosisPage                         │
│  └─ /treatment           → TreatmentPage                         │
└─────────────────────────────────────────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
    ┌──────────────────────────┐  ┌──────────────────────────┐
    │ PatientIntakePage        │  │ Legacy Questionnaire     │
    │ ────────────────────────  │  │ (still available)        │
    │ • Age input              │  │                          │
    │ • Gender selection       │  │ • Chief complaint flow   │
    │ • Chief complaint        │  │ • Generic questions      │
    │                          │  │                          │
    │ navigate to /symptoms ✨ │  │ navigate to /diagnosis   │
    └──────────────────────────┘  └──────────────────────────┘
                │                               
                ▼                               
    ┌──────────────────────────────────────────────────────────┐
    │       AgeBasedSymptomPage (NEW!) ✨                      │
    ├──────────────────────────────────────────────────────────┤
    │                                                           │
    │  1. AUTO-DETECT AGE GROUP FROM PATIENT AGE              │
    │     (0-28 days → Neonate)                                │
    │     (1-12 months → Infant)                               │
    │     (1-4 years → Young Child)                            │
    │     (5-12 years → Child)                                 │
    │     (13-19 years → Adolescent)                           │
    │     (20-64 years → Adult)                                │
    │     (65+ years → Elderly)                                │
    │                                                           │
    │  2. DISPLAY AGE GROUP SELECTOR                           │
    │     [Age: ____] [Age Group: Neonate ▼]                   │
    │                                                           │
    │  3. SHOW DANGER SIGN WARNING (if present)                │
    │     ⚠️ X Danger Signs Detected                           │
    │     Patient requires urgent evaluation                   │
    │                                                           │
    │  4. DISPLAY SYMPTOM CHECKLIST                            │
    │     └─ SymptomChecklist Component                        │
    │                                                           │
    │  5. SUBMIT & CONTINUE                                    │
    │     navigate to /diagnosis                               │
    │                                                           │
    └──────────────────────────────────────────────────────────┘
                        │
                        ▼
    ┌──────────────────────────────────────────────────────────┐
    │     SymptomChecklist Component (NEW!) ✨                 │
    ├──────────────────────────────────────────────────────────┤
    │                                                           │
    │  ┌─ CATEGORY 1: Systemic & Vital                        │
    │  │ [▼] Systemic & Vital (3 selected)                    │
    │  │     ├─ ☐ Temperature warm/hot                         │
    │  │     ├─ ☑ Breathing faster than normal                │
    │  │     │    └─ ◉ Yes  ○ No  ○ Not sure                  │
    │  │     ├─ ☑ Chest or ribs pull in ⚠️                    │
    │  │     │    └─ ◉ Under ribs  ○ Between ribs              │
    │  │     └─ ☐ Feeding reduced                              │
    │  │                                                       │
    │  ├─ CATEGORY 2: Neurological & Pain                     │
    │  │ [▼] Neurological & Pain (1 selected)                 │
    │  │     ├─ ☑ Inconsolable crying ⚠️                      │
    │  │     ├─ ☐ High-pitched cry                            │
    │  │     └─ ☐ Seizures ⚠️                                 │
    │  │                                                       │
    │  └─ CATEGORY 3: Skin & External                         │
    │    [►] Skin & External (0 selected)                     │
    │        ├─ ☐ Jaundice                                    │
    │        ├─ ☐ Rash                                        │
    │        └─ ☐ Blue lips ⚠️                                │
    │                                                           │
    │  Legend:                                                 │
    │  ☐ = Unchecked    ☑ = Checked    ⚠️ = Danger Sign       │
    │  [▼] = Expanded   [►] = Collapsed                        │
    │                                                           │
    └──────────────────────────────────────────────────────────┘
                        │
                        ▼
    ┌──────────────────────────────────────────────────────────┐
    │              DiagnosisPage (existing)                    │
    ├──────────────────────────────────────────────────────────┤
    │ • ML inference with selected symptoms                   │
    │ • Display differential diagnoses                        │
    │ • Select primary diagnosis                              │
    │ • Continue to treatment planning                        │
    └──────────────────────────────────────────────────────────┘
```

## Data Flow

```
Patient Age (years)
        │
        ▼
calculateAgeGroup(age)
        │
        ├─ 0-28 days      → 'neonate'
        ├─ 29-365 days    → 'infant'
        ├─ 1-4 years      → 'young_child'
        ├─ 5-12 years     → 'child'
        ├─ 13-19 years    → 'adolescent'
        ├─ 20-64 years    → 'adult'
        └─ 65+ years      → 'elderly'
                │
                ▼
    getSymptomsByAgeGroup(ageGroup)
                │
                ├─ neonate     → NEONATE_SYMPTOMS (full clinical)
                ├─ infant      → INFANT_SYMPTOMS (placeholder)
                ├─ young_child → YOUNG_CHILD_SYMPTOMS (placeholder)
                ├─ child       → CHILD_SYMPTOMS (placeholder)
                ├─ adolescent  → ADOLESCENT_SYMPTOMS (placeholder)
                ├─ adult       → ADULT_SYMPTOMS (placeholder)
                └─ elderly     → ELDERLY_SYMPTOMS (placeholder)
                        │
                        ▼
        AgeGroupSymptoms object
                │
                ├─ ageGroup: 'neonate'
                └─ categories: [
                    {
                      category: SymptomCategory,
                      items: SymptomChecklistItem[]
                    },
                    ...
                  ]
                        │
                        ▼
            User selects symptoms
                        │
                ┌───────┴───────┐
                ▼               ▼
        Symptom selected?   Danger sign?
                ▼               ▼
        Store in answers   Show warning
                │
                ▼
        Submit to consultation store
                │
                ▼
        ML Inference / Diagnosis
```

## Component Hierarchy

```
ClinicianLayout
  │
  └─ AgeBasedSymptomPage ✨ NEW
     │
     ├─ Select (Age Group dropdown)
     ├─ Input (Age input field)
     ├─ Card (Danger warning banner)
     ├─ SymptomChecklist ✨ NEW
     │  │
     │  ├─ Card (per category)
     │  └─ ChecklistItem (per symptom)
     │     ├─ Input (checkbox)
     │     ├─ Badge (danger sign label)
     │     └─ Radio buttons (follow-up options)
     │
     └─ Button (Continue to Diagnosis)
```

## Type Structure

```
AgeGroup
├─ 'neonate'
├─ 'infant'
├─ 'young_child'
├─ 'child'
├─ 'adolescent'
├─ 'adult'
└─ 'elderly'

AgeGroupDefinition
├─ value: AgeGroup
├─ label: string
├─ ageRange: string
├─ minDays: number
└─ maxDays: number

SymptomCategory
├─ id: string
├─ label: string
├─ description: string
└─ order: number

SymptomChecklistItem
├─ id: string
├─ text: string
├─ isDangerSign?: boolean
├─ hasFollowUp?: boolean
├─ followUpQuestion?: string
└─ followUpOptions?: Array<{value, label}>

AgeGroupSymptoms
├─ ageGroup: AgeGroup
└─ categories: Array<{
    category: SymptomCategory,
    items: SymptomChecklistItem[]
  }>
```

## Storage & State Management

```
useConsultationStore
└─ draft
   ├─ patient
   │  ├─ age: number (from PatientIntakePage)
   │  ├─ gender: Gender
   │  ├─ chiefComplaint: string
   │  └─ chiefComplaintFreeText?: string
   │
   └─ symptoms: SymptomAnswer[] (added via addSymptomAnswer)
      └─ SymptomAnswer
         ├─ questionId: string (e.g., 'neo_breathing_retractions')
         └─ value: string | boolean (selected symptom or follow-up answer)
```

## Flow Example: 5-Day-Old Baby with Breathing Issues

```
1. PatientIntakePage
   Input: age=5 (days)
         gender=male
         chiefComplaint=difficulty_breathing
   
2. AgeBasedSymptomPage (AUTO)
   Auto-detect: calculateAgeGroup(5/365) → 'neonate'
   Display: "Neonate (0-28 days)" ✓
   
3. SymptomChecklist
   Show: All neonate symptoms
   
4. User checks:
   ✓ Breathing faster than normal
     → Follow-up: "More than 60 breaths per minute?" → Yes
   ✓ Chest or ribs pull in ⚠️ DANGER SIGN
     → Follow-up: "Where?" → "Between ribs"
   ✓ Lips turn blue ⚠️ DANGER SIGN
   
5. Warning Banner
   ⚠️ 2 Danger Signs Detected
   "Patient requires urgent evaluation and referral"
   
6. Submit
   Symptoms sent to diagnosis engine
   
7. DiagnosisPage
   Differential diagnoses considering:
   - Respiratory distress in neonate
   - Possible conditions: RDS, meconium aspiration, pneumonia
```

---

**Key Innovation**: Age-specific symptoms with danger sign detection ensure clinicians see the most relevant clinical indicators for each patient age group.
