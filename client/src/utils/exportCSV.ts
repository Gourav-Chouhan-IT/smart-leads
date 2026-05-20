import type { Lead } from '../store/leadSlice'

export const exportToCSV = (leads: Lead[]) => {
  if (!leads.length) return

  const headers = ['Name', 'Email', 'Status', 'Source', 'Phone', 'Company', 'Created At']
  
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    lead.phone || '',
    lead.company || '',
    new Date(lead.createdAt).toLocaleString(),
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}