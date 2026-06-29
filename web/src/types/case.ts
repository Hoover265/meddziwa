export type Gender = 'male' | 'female' | 'other'
export type AgeGroup = 'neonate' | 'infant' | 'young_child' | 'child' | 'adolescent' | 'adult' | 'elderly'

export interface AgeGroupDefinition {
  value: AgeGroup
  label: string
  ageRange: string
  minDays: number
  maxDays: number
}

export interface SymptomCategory {
  id: string
  label: string
  description: string
  order: number
}

export interface SymptomChecklistItem {
  id: string
  text: string
  isDangerSign?: boolean
  hasFollowUp?: boolean
  followUpQuestion?: string
  followUpOptions?: { value: string; label: string }[]
}

export interface AgeGroupSymptoms {
  ageGroup: AgeGroup
  categories: {
    category: SymptomCategory
    items: SymptomChecklistItem[]
  }[]
}

export interface PatientProfile {
  age: number
  gender: Gender
  chiefComplaint: string
  chiefComplaintFreeText?: string
}

export interface SymptomAnswer {
  questionId: string
  value: string | string[] | boolean
}

export interface DiagnosisResult {
  disease: string
  probability: number
  icdCode?: string
}

export interface TreatmentRecommendation {
  drug: string
  adultDose: string
  paediatricDose: string
  route: string
  duration: string
  referralCriteria?: string[]
  dangerSigns?: string[]
}

export interface CaseRecord {
  id: string
  patient: PatientProfile
  symptoms: SymptomAnswer[]
  diagnoses: DiagnosisResult[]
  selectedDiagnosis?: string
  treatment?: TreatmentRecommendation
  clinicianId: string
  facilityId: string
  createdAt: string
  synced: boolean
}

export interface ConsultationDraft {
  patient?: PatientProfile
  symptoms: SymptomAnswer[]
  diagnoses: DiagnosisResult[]
  selectedDiagnosis?: string
  aiAssistNote?: string
}
