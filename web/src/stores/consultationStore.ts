import { create } from 'zustand'
import type { ConsultationDraft, DiagnosisResult, PatientProfile, SymptomAnswer } from '@/types'

interface ConsultationState {
  draft: ConsultationDraft
  setPatient: (patient: PatientProfile) => void
  addSymptomAnswer: (answer: SymptomAnswer) => void
  setSymptomAnswers: (answers: SymptomAnswer[]) => void
  setDiagnoses: (diagnoses: DiagnosisResult[]) => void
  selectDiagnosis: (disease: string) => void
  setAiAssistNote: (note: string) => void
  reset: () => void
}

const emptyDraft: ConsultationDraft = {
  symptoms: [],
  diagnoses: [],
}

export const useConsultationStore = create<ConsultationState>((set) => ({
  draft: { ...emptyDraft },

  setPatient: (patient) =>
    set((state) => ({ draft: { ...state.draft, patient } })),

  addSymptomAnswer: (answer) =>
    set((state) => {
      const filtered = state.draft.symptoms.filter((s) => s.questionId !== answer.questionId)
      return { draft: { ...state.draft, symptoms: [...filtered, answer] } }
    }),

  setSymptomAnswers: (answers) =>
    set((state) => ({ draft: { ...state.draft, symptoms: answers } })),

  setDiagnoses: (diagnoses) =>
    set((state) => ({ draft: { ...state.draft, diagnoses } })),

  selectDiagnosis: (disease) =>
    set((state) => ({ draft: { ...state.draft, selectedDiagnosis: disease } })),

  setAiAssistNote: (note) =>
    set((state) => ({ draft: { ...state.draft, aiAssistNote: note } })),

  reset: () => set({ draft: { ...emptyDraft } }),
}))
