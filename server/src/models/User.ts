import mongoose from "mongoose";
import { IUser } from "../types/auth.types";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema<IUser>({
    name : { type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role : {type: String, enum: ['admin', 'sales'], default: 'sales'},
}, {
    timestamps: true
})

UserSchema.pre('save', async function(next) {
  // this => user being saved
  // only hashed if password was changed
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User;