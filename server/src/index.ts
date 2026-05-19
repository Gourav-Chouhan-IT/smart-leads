import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import leadRoutes from './routes/leadRoutes'
import { errorMiddleware } from './middleware/errorMiddleware'

// load env variables first
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// MIDDLEWARE

// allow cross-origin requests from frontend
app.use(cors())

// parse incoming JSON request bodies
app.use(express.json())

// ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)

// health check route 
app.get('/api/health', (_, res) => {
  res.json({ success: true, message: 'Server is running' })
})

// ERROR HANDLER
app.use(errorMiddleware)

// START SERVER
const startServer = async () => {
  try {
    // connect to MongoDB first, then start server
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()