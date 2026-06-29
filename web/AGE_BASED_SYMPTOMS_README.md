# Age-Based Symptom Assessment System

## Overview

The MedDziwa application now includes a comprehensive age-based symptom assessment system that presents signs and symptoms specifically tailored to different age groups. This replaces the generic chief-complaint-based questionnaire for clinicians using the platform.

## Age Groups

The system divides patients into 7 age groups:

1. **Neonate** (0-28 days)
2. **Infant** (1-12 months)
3. **Young Child** (1-4 years)
4. **Child** (5-12 years)
5. **Adolescent** (13-19 years)
6. **Adult** (20-64 years)
7. **Elderly** (65+ years and above)

## Architecture

### Core Files

#### 1. **Types** (`src/types/case.ts`)
- `AgeGroup` - Type for age group values
- `AgeGroupDefinition` - Metadata for each age group
- `SymptomCategory` - Organization of symptoms into categories
- `SymptomChecklistItem` - Individual symptom with danger sign flagging
- `AgeGroupSymptoms` - Complete symptom data structure for an age group

#### 2. **Data** (`src/data/ageBasedSymptoms.ts`)
- `AGE_GROUP_DEFINITIONS` - Metadata for all age groups with age ranges
- `NEONATE_SYMPTOMS` - Full symptom checklist for neonates (from clinical guidelines)
- Dummy symptoms for infant, young child, child, adolescent, adult, and elderly groups
- Helper functions:
  - `getSymptomsByAgeGroup()` - Retrieve symptoms for a specific age group
  - `calculateAgeGroup()` - Determine age group from patient age

#### 3. **Components**

**SymptomChecklist** (`src/components/symptoms/SymptomChecklist.tsx`)
- Displays symptoms organized by category
- Expandable/collapsible categories
- Highlights danger signs with warnings
- Shows follow-up questions for multi-part symptoms
- Real-time danger sign counter at the top

#### 4. **Pages**

**AgeBasedSymptomPage** (`src/pages/clinician/AgeBasedSymptomPage.tsx`)
- Main interface for symptom assessment
- Age/age-group selector with automatic detection
- Displays appropriate symptoms for the selected age group
- Shows progress counter and danger sign warnings
- Routes to diagnosis page when complete

### Updated Files

- **AppRoutes** - New route `/clinician/symptoms` added
- **PatientIntakePage** - Now navigates to `/clinician/symptoms` instead of `/clinician/questionnaire`

## Symptom Structure

### For Neonates (Complete)

**Column 1: Systemic & Vital**
- Temperature signs (warm, cold, extremities, shivering, sweating)
- Breathing indicators (fast breathing, retractions, grunting, apnea, cyanosis, noisy)
- Feeding concerns (reduced feeding, refusal, vomiting, difficulty)
- Stool/Urine output (watery, blood, hard, constipation, output)
- Growth/General (weight gain, appearance, fontanelle)

**Column 2: Neurological & Pain**
- Level of Consciousness (sleepiness, movement, muscle tone, responsiveness)
- Crying/Pain (crying patterns, inconsolability, different cry, pain signs)
- Movements/Tone (stiffness, jerking, twitching, seizures, asymmetry)

**Column 3: Skin & External**
- Skin Changes (jaundice, rash, pale/blue skin, blisters, bruising)
- Umbilicus (redness, discharge, smell, bleeding)
- Eyes (discharge, redness, cloudiness, reflex)

### Symptom Features

Each symptom item includes:
- **ID** - Unique identifier
- **Text** - Description of the symptom
- **isDangerSign** - Boolean flag for critical symptoms requiring urgent attention
- **hasFollowUp** - Whether there are additional questions
- **followUpQuestion** - The clarifying question to ask
- **followUpOptions** - Multiple choice options for the follow-up

## User Flow

1. **Patient Intake Page** → User enters patient age and gender
2. **Age-Based Symptom Page** → System automatically selects age group; user can override
3. **Symptom Checklist** → User reviews symptoms organized by category
4. **Selection & Validation** → System highlights danger signs in real-time
5. **Diagnosis Page** → Symptoms submitted to inference engine

## Key Features

### Danger Sign Warnings
- Symptoms marked with ⚠️ are critical
- Prominent warning banner appears when danger signs are selected
- Shows count of detected danger signs

### Category Organization
- Symptoms organized into 3 logical columns for easy scanning
- Collapsible categories for better UX
- Shows count of selected symptoms per category

### Flexible Age Input
- Users can type exact age or select from age group dropdown
- System automatically detects appropriate age group
- Can manually override age group if needed

### Follow-up Questions
- Multi-part symptoms with contextual questions
- Options displayed only when parent symptom is selected
- Radio buttons for follow-up selection

## Example Data Structure

```typescript
// Neonate symptoms example
const NEONATE_SYMPTOMS: AgeGroupSymptoms = {
  ageGroup: 'neonate',
  categories: [
    {
      category: {
        id: 'systemic_vital',
        label: 'Systemic & Vital',
        description: 'General health indicators and vital functions',
        order: 1,
      },
      items: [
        {
          id: 'neo_temp_warm',
          text: 'Baby feels warm or hot (if measured: ___°C rectal)',
          isDangerSign: false,
        },
        // ... more items
      ]
    }
  ]
}
```

## Next Steps

1. **Replace Dummy Data** - Update symptoms for infant, young child, child, adolescent, adult, and elderly groups with clinical guidelines
2. **Implement Inference** - Connect symptoms to ML inference engine
3. **Add Treatment Protocols** - Link diagnosis results to age-appropriate treatment recommendations
4. **Testing** - QA testing with clinical team

## Files Created/Modified

**New Files:**
- `src/data/ageBasedSymptoms.ts` - Symptom data and definitions
- `src/components/symptoms/SymptomChecklist.tsx` - Symptom display component
- `src/pages/clinician/AgeBasedSymptomPage.tsx` - Main symptom assessment page

**Modified Files:**
- `src/types/case.ts` - Updated AgeGroup type and added new interfaces
- `src/routes/AppRoutes.tsx` - Added `/clinician/symptoms` route
- `src/pages/clinician/PatientIntakePage.tsx` - Updated navigation

## Integration Notes

- Age-based symptoms fully integrated into patient consultation flow
- Backward compatible with existing diagnosis/treatment infrastructure
- Uses same consultation store for symptom storage
- Maintains consistency with existing UI components and styling
