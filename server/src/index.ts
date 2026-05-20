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

app.get('/', (_, res) => {
  res.json({
    success: true,
    message: 'Smart Leads API is running',
    health: '/api/health',
    docs: '/api-docs',
  })
})

// health check route 
app.get('/api/health', (_, res) => {
  res.json({ success: true, message: 'Server is running' })
})

app.get('/api-docs', (_, res) => {
  res.json({
    success: true,
    name: 'Smart Leads API',
    baseUrl: '/api',
    endpoints: {
      auth: [
        {
          method: 'POST',
          path: '/api/auth/register',
          description: 'Register a new user',
          authRequired: false,
        },
        {
          method: 'POST',
          path: '/api/auth/login',
          description: 'Login an existing user',
          authRequired: false,
        },
      ],
      leads: [
        {
          method: 'GET',
          path: '/api/leads',
          description: 'Get paginated leads with optional filters',
          authRequired: true,
        },
        {
          method: 'POST',
          path: '/api/leads',
          description: 'Create a new lead',
          authRequired: true,
        },
        {
          method: 'GET',
          path: '/api/leads/:id',
          description: 'Get a lead by ID',
          authRequired: true,
        },
        {
          method: 'PUT',
          path: '/api/leads/:id',
          description: 'Update a lead by ID',
          authRequired: true,
        },
        {
          method: 'DELETE',
          path: '/api/leads/:id',
          description: 'Delete a lead by ID',
          authRequired: true,
          role: 'admin',
        },
      ],
      health: [
        {
          method: 'GET',
          path: '/api/health',
          description: 'Check whether the API is running',
          authRequired: false,
        },
      ],
    },
  })
})

// ERROR HANDLER
app.use(errorMiddleware)

// START SERVER
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV}`)
      console.log(`MongoDB: connected`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
