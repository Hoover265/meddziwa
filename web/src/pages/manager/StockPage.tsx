import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_STOCK } from '@/data/manager-mock'

export function StockPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pharmacy stock</h2>
          <p className="mt-1 text-slate-600">Digital stock register per facility — auto-deduct on prescribe.</p>
        </div>
        <Button variant="secondary" disabled title="Available when backend is connected">
          Adjust stock
        </Button>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left">
          <thead className="border-b-2 border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Drug</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Quantity</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Threshold</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Status</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Updated</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STOCK.map((item) => {
              const low = item.quantity <= item.threshold
              return (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="px-5 py-4 font-medium text-slate-900">{item.drugName}</td>
                  <td className="px-5 py-4 text-slate-700">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{item.threshold}</td>
                  <td className="px-5 py-4">
                    <Badge tone={low ? 'warning' : 'success'}>{low ? 'Low stock' : 'OK'}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{item.lastUpdated}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
