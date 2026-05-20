import Badge from '../ui/Badge'
import type { Lead } from '../../store/leadSlice'

interface Props {
  leads: Lead[]
  loading: boolean
  userRole?: string
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
}

const LeadTable = ({ leads, loading, userRole, onEdit, onDelete }: Props) => {
  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 animate-pulse">
            <div className="h-4 bg-surface-2 rounded flex-1" />
            <div className="h-4 bg-surface-2 rounded w-48" />
            <div className="h-6 bg-surface-2 rounded-full w-20" />
            <div className="h-4 bg-surface-2 rounded w-24" />
            <div className="h-4 bg-surface-2 rounded w-32" />
          </div>
        ))}
      </div>
    )
  }

  if (!leads.length) {
    return (
      <div className="bg-surface border border-border rounded-lg p-16 text-center">
        <div className="text-text-mute text-base mb-2">No leads found</div>
        <div className="text-text-mute text-sm">
          Try adjusting your filters or add a new lead to get started
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-2 border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-text-mute uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-text-mute uppercase tracking-wider px-6 py-3">Email</th>
              <th className="text-left text-xs font-semibold text-text-mute uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-text-mute uppercase tracking-wider px-6 py-3">Source</th>
              <th className="text-left text-xs font-semibold text-text-mute uppercase tracking-wider px-6 py-3">Created</th>
              <th className="text-right text-xs font-semibold text-text-mute uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors group"
              >
                <td className="px-6 py-4 text-text font-medium">{lead.name}</td>
                <td className="px-6 py-4 text-text-dim">{lead.email}</td>
                <td className="px-6 py-4">
                  <Badge status={lead.status} />
                </td>
                <td className="px-6 py-4 text-text-dim">{lead.source}</td>
                <td className="px-6 py-4 text-text-mute text-sm">
                  {new Date(lead.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(lead)}
                      className="px-3 py-1.5 bg-teal hover:bg-teal-hover text-text text-xs font-semibold rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    {userRole === 'admin' && (
                      <button
                        onClick={() => onDelete(lead._id)}
                        className="px-3 py-1.5 bg-ruby hover:bg-ruby-hover text-text text-xs font-semibold rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeadTable