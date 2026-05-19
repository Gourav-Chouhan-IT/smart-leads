import jwt from 'jsonwebtoken'
import { UserRole } from '../types/auth.types'

export const generateToken = (userId: string, role: UserRole): string => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined')

  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }  // hardcode this to avoid type issues
  )
}