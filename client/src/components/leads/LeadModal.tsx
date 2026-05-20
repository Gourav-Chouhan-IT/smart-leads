import { useState, useEffect } from 'react'
import type { Lead } from '../../store/leadSlice'

interface Props {
  lead: Lead | null
  onClose: () => void
  onSave: (data: Partial<Lead>) => void
}

const LeadModal = ({ lead, onClose, onSave }: Props) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    status: 'New' as Lead['status'],
    source: 'Website' as Lead['source'],
    phone: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
        phone: lead.phone || '',
        company: lead.company || '',
        message: lead.message || '',
      })
    }
  }, [lead])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email format'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-text">
            {lead ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-mute hover:text-text text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-2.5 bg-bg border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors ${errors.name ? 'border-ruby' : 'border-border'}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-ruby text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-2.5 bg-bg border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors ${errors.email ? 'border-ruby' : 'border-border'}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-ruby text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Lead['status'] })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text focus:border-teal transition-colors cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Source</label>
                <select
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value as Lead['source'] })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text focus:border-teal transition-colors cursor-pointer"
                >
                  <option value="Website">Website</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Referral">Referral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors resize-none"
                placeholder="Additional notes..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3 bg-surface-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-text-dim hover:text-text font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-green hover:bg-green-hover text-text font-semibold rounded-md transition-colors"
            >
              {lead ? 'Save Changes' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeadModal