export type UserRole = 'admin' | 'sales'

export interface IUser {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface IUserModel extends IUser {
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IRegisterPayload {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface IAuthResponse {
  user: Omit<IUserModel, 'password'>
  token: string
}

export interface IAuthState {
  user: Omit<IUserModel, 'password'> | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}