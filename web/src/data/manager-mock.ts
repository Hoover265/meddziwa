import type { AnalyticsSummary, DistrictCaseCount, OutbreakAlert, StockItem } from '@/types'

export const MOCK_STOCK: StockItem[] = [
  { id: 's1', drugName: 'Artemether-Lumefantrine', quantity: 120, unit: 'tablets', threshold: 50, facilityId: 'fac-mponela', lastUpdated: '2026-06-15' },
  { id: 's2', drugName: 'Amoxicillin 250mg', quantity: 35, unit: 'capsules', threshold: 40, facilityId: 'fac-mponela', lastUpdated: '2026-06-16' },
  { id: 's3', drugName: 'ORS sachets', quantity: 200, unit: 'sachets', threshold: 80, facilityId: 'fac-mponela', lastUpdated: '2026-06-16' },
  { id: 's4', drugName: 'Ciprofloxacin 500mg', quantity: 18, unit: 'tablets', threshold: 30, facilityId: 'fac-ntchisi', lastUpdated: '2026-06-14' },
  { id: 's5', drugName: 'Zinc tablets', quantity: 90, unit: 'tablets', threshold: 40, facilityId: 'fac-ntchisi', lastUpdated: '2026-06-15' },
]

export const MOCK_ALERTS: OutbreakAlert[] = [
  {
    id: 'a1',
    disease: 'Cholera',
    district: 'Nsanje',
    caseCount: 14,
    threshold: 10,
    windowDays: 7,
    createdAt: '2026-06-14T08:00:00Z',
    status: 'active',
  },
  {
    id: 'a2',
    disease: 'Malaria',
    district: 'Ntchisi',
    caseCount: 48,
    threshold: 40,
    windowDays: 7,
    createdAt: '2026-06-13T14:30:00Z',
    status: 'active',
  },
]

export const MOCK_DISTRICT_COUNTS: DistrictCaseCount[] = [
  { district: 'Lilongwe', disease: 'Malaria', count: 124, lat: -13.9626, lng: 33.7741 },
  { district: 'Ntchisi', disease: 'Malaria', count: 48, lat: -13.3753, lng: 34.0034 },
  { district: 'Dedza', disease: 'Malaria', count: 31, lat: -14.3774, lng: 34.3332 },
  { district: 'Nsanje', disease: 'Cholera', count: 14, lat: -16.9196, lng: 35.2619 },
  { district: 'Blantyre', disease: 'Pneumonia', count: 22, lat: -15.7861, lng: 35.0058 },
  { district: 'Mzuzu', disease: 'TB', count: 8, lat: -11.4526, lng: 34.0134 },
]

export const MOCK_ANALYTICS: AnalyticsSummary = {
  totalCases: 1847,
  casesThisWeek: 312,
  topDiagnoses: [
    { disease: 'Malaria', count: 892 },
    { disease: 'ARI', count: 341 },
    { disease: 'Diarrhoeal disease', count: 218 },
    { disease: 'Typhoid fever', count: 156 },
    { disease: 'Pneumonia', count: 124 },
  ],
  casesByDistrict: [
    { district: 'Lilongwe', count: 412 },
    { district: 'Blantyre', count: 298 },
    { district: 'Ntchisi', count: 187 },
    { district: 'Mzuzu', count: 164 },
    { district: 'Dedza', count: 142 },
  ],
}
