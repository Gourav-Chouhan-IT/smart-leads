import { Request, Response, NextFunction } from 'express'

interface AppError {
  statusCode?: number
  message?: string
  stack?: string
}

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const e = err as AppError
  const statusCode = e.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message: e.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
  })
}