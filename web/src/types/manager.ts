export interface Facility {
  id: string
  name: string
  district: string
  code: string
}

export interface StockItem {
  id: string
  drugName: string
  quantity: number
  unit: string
  threshold: number
  facilityId: string
  lastUpdated: string
}

export interface OutbreakAlert {
  id: string
  disease: string
  district: string
  caseCount: number
  threshold: number
  windowDays: number
  createdAt: string
  status: 'active' | 'resolved'
}

export interface DistrictCaseCount {
  district: string
  disease: string
  count: number
  lat: number
  lng: number
}

export interface AnalyticsSummary {
  totalCases: number
  casesThisWeek: number
  topDiagnoses: { disease: string; count: number }[]
  casesByDistrict: { district: string; count: number }[]
}
