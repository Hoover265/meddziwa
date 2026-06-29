import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { ClinicianLayout } from '@/components/layout/ClinicianLayout'
import { ManagerLayout } from '@/components/layout/ManagerLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ClinicianHomePage } from '@/pages/clinician/ClinicianHomePage'
import { PatientIntakePage } from '@/pages/clinician/PatientIntakePage'
import { SymptomQuestionnairePage } from '@/pages/clinician/SymptomQuestionnairePage'
import { AgeBasedSymptomPage } from '@/pages/clinician/AgeBasedSymptomPage'
import { DiagnosisPage } from '@/pages/clinician/DiagnosisPage'
import { TreatmentPage } from '@/pages/clinician/TreatmentPage'
import { ManagerOverviewPage } from '@/pages/manager/ManagerOverviewPage'
import { OutbreakMapPage } from '@/pages/manager/OutbreakMapPage'
import { StockPage } from '@/pages/manager/StockPage'
import { AnalyticsPage } from '@/pages/manager/AnalyticsPage'
import { UsersPage } from '@/pages/manager/UsersPage'
import { useAuthStore } from '@/stores/authStore'

function HomeRedirect() {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'manager' || user.role === 'admin') {
    return <Navigate to="/manager" replace />
  }
  return <Navigate to="/clinician" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<ProtectedRoute allowedRoles={['clinician']} />}>
        <Route path="/clinician" element={<ClinicianLayout />}>
          <Route index element={<ClinicianHomePage />} />
          <Route path="intake" element={<PatientIntakePage />} />
          <Route path="questionnaire" element={<SymptomQuestionnairePage />} />
          <Route path="symptoms" element={<AgeBasedSymptomPage />} />
          <Route path="diagnosis" element={<DiagnosisPage />} />
          <Route path="treatment" element={<TreatmentPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['manager', 'admin']} />}>
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerOverviewPage />} />
          <Route path="outbreaks" element={<OutbreakMapPage />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
