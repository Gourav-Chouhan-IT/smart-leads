interface Props {
  label: string
  value: number
  accent?: 'teal' | 'green' | 'ruby'
}

const StatCard = ({ label, value, accent = 'teal' }: Props) => {
  const accentColors = {
    teal: 'border-l-teal',
    green: 'border-l-green',
    ruby: 'border-l-ruby',
  }

  return (
    <div className={`bg-surface border border-border ${accentColors[accent]} border-l-4 rounded-lg p-5 hover:bg-surface-2 transition-colors`}>
      <div className="text-text-mute text-xs uppercase tracking-wider mb-2 font-medium">
        {label}
      </div>
      <div className="text-3xl font-bold text-text">{value}</div>
    </div>
  )
}

export default StatCard