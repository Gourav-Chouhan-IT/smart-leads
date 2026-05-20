import api from './api'
import type { ILead } from '../types/lead.types'

interface GetLeadsParams {
  page?: number
  limit?: number
  status?: string
  source?: string
  search?: string
  sort?: 'latest' | 'oldest'
}

export const leadService = {
  getAll: async (params: GetLeadsParams = {}) => {
    const { data } = await api.get('/leads', { params })
    return data
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/leads/${id}`)
    return data
  },

  create: async (payload: Partial<ILead>) => {
    const { data } = await api.post('/leads', payload)
    return data
  },

  update: async (id: string, payload: Partial<ILead>) => {
    const { data } = await api.put(`/leads/${id}`, payload)
    return data
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/leads/${id}`)
    return data
  },
}
