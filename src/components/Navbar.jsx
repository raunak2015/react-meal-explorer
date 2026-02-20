import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getLikedIds } from '../utils/likedUtils'

function Navbar() {
    const [likedCount, setLikedCount] = useState(getLikedIds().length)

    useEffect(() => {
        const update = () => setLikedCount(getLikedIds().length)
        window.addEventListener('likedUpdated', update)
        return () => window.removeEventListener('likedUpdated', update)
    }, [])

    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">
                🍽 Meal<span>Explorer</span>
            </NavLink>

            <ul className="navbar-links">
                <li>
                    <NavLink to="/" end>
                        🔍 Search
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories">
                        📂 Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/liked">
                        ❤️ Liked Meals
                        {likedCount > 0 && (
                            <span className="liked-badge">{likedCount}</span>
                        )}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
