export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost'
export type LeadSource = 'Website' | 'Instagram' | 'Referral'

export interface ILead {
  name: string
  email: string
  status: LeadStatus
  source: LeadSource
  phone?: string       // optional extras
  company?: string
  message?: string
}

export interface ILeadModel extends ILead {
  _id: string
  createdAt: Date
  updatedAt: Date
}