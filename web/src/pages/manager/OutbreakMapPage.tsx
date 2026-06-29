import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MOCK_ALERTS, MOCK_DISTRICT_COUNTS } from '@/data/manager-mock'

const MALAWI_CENTER: [number, number] = [-13.25, 34.3]

function caseRadius(count: number) {
  return Math.min(28, 8 + count / 3)
}

function caseColor(disease: string) {
  if (disease === 'Cholera') return '#dc2626'
  if (disease === 'Malaria') return '#0d6e6e'
  if (disease === 'Pneumonia') return '#d97706'
  return '#6366f1'
}

export function OutbreakMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Outbreak surveillance</h2>
        <p className="mt-1 text-slate-600">Rolling 7-day disease counts by district — heatmap view.</p>
      </div>

      <Card title="District case map" className="overflow-hidden p-0">
        <div className="h-[420px] w-full">
          <MapContainer center={MALAWI_CENTER} zoom={6} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {MOCK_DISTRICT_COUNTS.map((d) => (
              <CircleMarker
                key={`${d.district}-${d.disease}`}
                center={[d.lat, d.lng]}
                radius={caseRadius(d.count)}
                pathOptions={{ color: caseColor(d.disease), fillColor: caseColor(d.disease), fillOpacity: 0.5 }}
              >
                <Popup>
                  <strong>{d.district}</strong>
                  <br />
                  {d.disease}: {d.count} cases (7d)
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </Card>

      <Card title="Active alerts">
        <ul className="space-y-3">
          {MOCK_ALERTS.map((alert) => (
            <li key={alert.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 px-4 py-3">
              <div>
                <p className="font-bold text-slate-900">{alert.disease} — {alert.district}</p>
                <p className="text-sm text-slate-600">
                  {alert.caseCount} cases in {alert.windowDays} days (threshold: {alert.threshold})
                </p>
              </div>
              <Badge tone={alert.status === 'active' ? 'danger' : 'neutral'}>{alert.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
