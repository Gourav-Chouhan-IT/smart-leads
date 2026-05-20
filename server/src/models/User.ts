import mongoose from 'mongoose'
import type { HydratedDocument } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../types/auth.types'

export type UserDocument = HydratedDocument<IUser>

const UserSchema = new mongoose.Schema<IUser>({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'sales'], default: 'sales' }
}, {
  timestamps: true
})

// newer mongoose versions don't need next parameter
// just use async/await directly
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User