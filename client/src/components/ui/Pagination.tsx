interface Props {
  page: number
  pages: number
  total: number
  onChange: (page: number) => void
}

const Pagination = ({ page, pages, total, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between mt-6 px-1">
      <div className="text-text-mute text-sm">
        Page <span className="text-text font-semibold">{page}</span> of{' '}
        <span className="text-text font-semibold">{pages}</span> · {total} total leads
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-surface border border-border text-text-dim hover:text-text hover:bg-surface-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === pages}
          className="px-4 py-2 bg-surface border border-border text-text-dim hover:text-text hover:bg-surface-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination