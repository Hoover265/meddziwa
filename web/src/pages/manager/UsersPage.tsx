import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const MOCK_USERS = [
  { id: '1', name: 'Verydear Laisi', email: 'clinician@mponela.mw', role: 'clinician', facility: 'Mponela Community Hospital' },
  { id: '2', name: 'Francis Chiyambi Chimamba', email: 'dev@mponela.mw', role: 'clinician', facility: 'Mponela Community Hospital' },
  { id: '3', name: 'Yauleb Chapola', email: 'manager@dho.lilongwe.mw', role: 'manager', facility: 'Lilongwe DHO' },
  { id: '4', name: 'Patel Magomero', email: 'admin@meddziwa.mw', role: 'admin', facility: 'MedDziwa HQ' },
]

const roleTone = {
  clinician: 'brand' as const,
  manager: 'success' as const,
  admin: 'neutral' as const,
}

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User management</h2>
          <p className="mt-1 text-slate-600">Assign clinicians to facilities, manage roles and access.</p>
        </div>
        <Button disabled title="Available when Django auth API is connected">
          Add user
        </Button>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left">
          <thead className="border-b-2 border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Name</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Email</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Role</th>
              <th className="px-5 py-4 text-sm font-bold text-slate-700">Facility</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="border-b border-slate-100">
                <td className="px-5 py-4 font-medium text-slate-900">{user.name}</td>
                <td className="px-5 py-4 text-slate-700">{user.email}</td>
                <td className="px-5 py-4">
                  <Badge tone={roleTone[user.role as keyof typeof roleTone]}>{user.role}</Badge>
                </td>
                <td className="px-5 py-4 text-slate-700">{user.facility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
