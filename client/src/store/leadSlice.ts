import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ILeadModel, LeadStatus, LeadSource } from '../types/lead.types'

interface LeadState {
  leads: ILeadModel[]
  loading: boolean
  error: string | null
  pagination: {
    total: number
    page: number
    pages: number
    limit: number
  }
  filters: {
    status: LeadStatus | ''
    source: LeadSource | ''
    search: string
    sort: 'latest' | 'oldest'
  }
}

const initialState: LeadState = {
  leads: [],
  loading: false,
  error: null,
  pagination: { total: 0, page: 1, pages: 1, limit: 10 },
  filters: { status: '', source: '', search: '', sort: 'latest' },
}

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchSuccess: (state, action: PayloadAction<{ data: ILeadModel[]; pagination: LeadState['pagination'] }>) => {
      state.leads = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setFilter: (state, action: PayloadAction<Partial<LeadState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
  },
})

export const { fetchStart, fetchSuccess, fetchFailure, setFilter, setPage } = leadSlice.actions
export default leadSlice.reducer
export type { ILeadModel as Lead }
