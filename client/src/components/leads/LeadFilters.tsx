interface FiltersType {
  status: string
  source: string
  search: string
  sort: 'latest' | 'oldest'
}

interface Props {
  filters: FiltersType
  onChange: (filters: Partial<FiltersType>) => void
  onAdd: () => void
  onExport: () => void
}

const LeadFilters = ({ filters, onChange, onAdd, onExport }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Search */}
      <input
        type="text"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        placeholder="Search by name or email..."
        className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
      />

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value })}
        className="px-4 py-2.5 bg-surface border border-border rounded-md text-text focus:border-teal transition-colors cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>

      {/* Source Filter */}
      <select
        value={filters.source}
        onChange={(e) => onChange({ source: e.target.value })}
        className="px-4 py-2.5 bg-surface border border-border rounded-md text-text focus:border-teal transition-colors cursor-pointer"
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="Instagram">Instagram</option>
        <option value="Referral">Referral</option>
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as 'latest' | 'oldest' })}
        className="px-4 py-2.5 bg-surface border border-border rounded-md text-text focus:border-teal transition-colors cursor-pointer"
      >
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
      </select>

      {/* Actions */}
      <button
        onClick={onExport}
        className="px-4 py-2.5 bg-surface border border-border hover:bg-surface-2 text-text-dim hover:text-text rounded-md text-sm font-medium transition-colors whitespace-nowrap"
      >
        Export CSV
      </button>

      <button
        onClick={onAdd}
        className="px-5 py-2.5 bg-green hover:bg-green-hover text-text rounded-md text-sm font-semibold transition-colors whitespace-nowrap"
      >
        + Add Lead
      </button>
    </div>
  )
}

export default LeadFilters