import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectLikedCount } from '../store/likedSlice'

function Navbar() {
    const likedCount = useSelector(selectLikedCount)

    const navItems = [
        { to: '/', icon: '🔍', label: 'Search', end: true },
        { to: '/categories', icon: '📂', label: 'Categories' },
        { to: '/liked', icon: '❤️', label: 'Liked', badge: likedCount },
    ]

    return (
        <>
            {/* ── Top Navbar (desktop) ── */}
            <nav className="navbar">
                <NavLink to="/" className="navbar-brand">
                    🍽 Meal<span>Explorer</span>
                </NavLink>

                <ul className="navbar-links">
                    {navItems.map(({ to, icon, label, badge, end }) => (
                        <li key={to}>
                            <NavLink to={to} end={end}>
                                {icon} {label}
                                {badge > 0 && <span className="liked-badge">{badge}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ── Bottom Tab Bar (mobile only) ── */}
            <nav className="bottom-nav">
                {navItems.map(({ to, icon, label, badge, end }) => (
                    <NavLink key={to} to={to} end={end} className="bottom-nav-item">
                        <span className="bottom-nav-icon">
                            {icon}
                            {badge > 0 && <span className="bottom-badge">{badge}</span>}
                        </span>
                        <span className="bottom-nav-label">{label}</span>
                    </NavLink>
                ))}
            </nav>
        </>
    )
}

export default Navbar
