import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { authService } from '../services/authService'
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice'
import Navbar from '../components/layout/Navbar'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    dispatch(loginStart())

    try {
      const data = await authService.login({ email, password })
      dispatch(loginSuccess({ user: data.user, token: data.token }))
      navigate('/dashboard')
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message || 'Login failed' : 'Login failed'
      setError(message)
      dispatch(loginFailure(message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <div className="flex items-center justify-center px-4 pt-32 pb-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-text mb-2">Welcome back</h1>
            <p className="text-text-mute text-sm">Sign in to your ServiceHive account</p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-dim mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dim mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
                />
              </div>

              {error && (
                <div className="px-4 py-3 bg-ruby/10 border border-ruby/30 rounded-md text-ruby text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-green hover:bg-green-hover disabled:opacity-50 disabled:cursor-not-allowed text-text font-semibold rounded-md transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-sm text-text-mute mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-teal hover:text-teal-hover font-medium transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login