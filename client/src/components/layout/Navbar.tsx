import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'
import { logout } from '../../store/authSlice'

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
            <nav className="flex items-center justify-between px-6 py-3 bg-surface/90 backdrop-blur-lg border border-border rounded-full shadow-2xl">
                {/* Logo */}
                <Link to={isAuthenticated ? '/dashboard' : '/login'} className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-teal to-ruby rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-text font-extrabold text-base">SH</span>
                    </div>
                    <span className="font-extrabold text-text text-lg tracking-tight">ServiceHive</span>
                </Link>

                {/* Nav Links */}
                {isAuthenticated && (
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            to="/dashboard"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/dashboard')
                                    ? 'bg-teal text-text'
                                    : 'text-text-dim hover:text-text hover:bg-surface-2'
                                }`}
                        >
                            Dashboard
                        </Link>
                    </div>
                )}

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-8 h-8 bg-teal/20 border border-teal/30 rounded-full flex items-center justify-center">
                                    <span className="text-teal text-xs font-semibold uppercase">
                                        {user?.name?.charAt(0)}
                                    </span>
                                </div>
                                <div className="hidden lg:block">
                                    <div className="text-text text-sm font-medium leading-tight">{user?.name}</div>
                                    <div className="text-text-mute text-xs uppercase tracking-wider">{user?.role}</div>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-ruby/10 hover:bg-ruby/20 border border-ruby/30 text-ruby text-sm font-medium rounded-full transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-text-dim hover:text-text text-sm font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 bg-green hover:bg-green-hover text-text text-sm font-semibold rounded-full transition-colors"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar