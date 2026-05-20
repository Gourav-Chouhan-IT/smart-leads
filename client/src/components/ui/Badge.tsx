interface Props {
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost'
}

const Badge = ({ status }: Props) => {
  const styles = {
    New: 'bg-green/15 text-green border-green/30',
    Contacted: 'bg-teal/15 text-teal border-teal/40',
    Qualified: 'bg-green/25 text-green border-green/40',
    Lost: 'bg-ruby/15 text-ruby border-ruby/30',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
      {status}
    </span>
  )
}

export default Badge