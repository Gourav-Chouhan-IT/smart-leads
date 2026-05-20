import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { generateToken } from '../utils/generateToken'
import bcrypt from 'bcryptjs'
import { IRegisterPayload, ILoginPayload } from '../types/auth.types'

// Register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role }: IRegisterPayload = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    const user = await User.create({ name, email, password, role })
    const token = generateToken(user._id.toString(), user.role)

    return res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
}

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: ILoginPayload = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const token = generateToken(user._id.toString(), user.role)

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
}