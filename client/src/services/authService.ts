import api from './api'
import type { ILoginPayload, IRegisterPayload } from '../types/auth.types'

export const authService = {
  login: async (payload: ILoginPayload) => {
    const { data } = await api.post('/auth/login', payload)
    return data
  },

  register: async (payload: IRegisterPayload) => {
    const { data } = await api.post('/auth/register', payload)
    return data
  },
}