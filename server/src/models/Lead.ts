import mongoose from 'mongoose'
import { ILead } from '../types/lead.types'

const LeadSchema = new mongoose.Schema<ILead>({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, lowercase: true, trim: true, index: true },
  status:  { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New', index: true },
  source:  { type: String, enum: ['Website', 'Instagram', 'Referral'], default: 'Website' },
  phone:   { type: String, trim: true },
  company: { type: String, trim: true },
  message: { type: String, trim: true },
}, {
  timestamps: true
})

export default mongoose.model<ILead>('Lead', LeadSchema)