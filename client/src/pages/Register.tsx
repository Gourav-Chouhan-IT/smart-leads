import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../services/authService'
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice'
import Navbar from '../components/layout/Navbar'
import type { UserRole } from '../types/auth.types'

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'sales' as UserRole,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    dispatch(loginStart())

    try {
      const data = await authService.register(form)
      dispatch(loginSuccess({ user: data.user, token: data.token }))
      navigate('/dashboard')
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed'
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
            <h1 className="text-3xl font-bold text-text mb-2">Create your account</h1>
            <p className="text-text-mute text-sm">Start managing your leads with ServiceHive</p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-dim mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dim mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text placeholder:text-text-mute focus:border-teal transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dim mb-2">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-text focus:border-teal transition-colors cursor-pointer"
                >
                  <option value="sales">Sales User</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-text-mute mt-1.5">
                  Admins can delete leads · Sales users can view and edit
                </p>
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
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="text-center text-sm text-text-mute mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-teal hover:text-teal-hover font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register