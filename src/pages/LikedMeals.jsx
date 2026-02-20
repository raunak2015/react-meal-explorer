import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLikedIds, toggleLike } from '../utils/likedUtils'

function LikedMeals() {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchLikedMeals = async () => {
        const ids = getLikedIds()

        if (ids.length === 0) {
            setMeals([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const results = await Promise.all(
                ids.map(id =>
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                        .then(res => res.json())
                        .then(data => (data.meals ? data.meals[0] : null))
                )
            )
            setMeals(results.filter(Boolean))
        } catch {
            setError('Failed to load liked meals.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLikedMeals()
    }, [])

    const handleRemove = (id) => {
        toggleLike(id) // removes since it's currently liked
        setMeals(prev => prev.filter(m => m.idMeal !== String(id)))
    }

    return (
        <div>
            <div className="page-header">
                <h1>❤️ <span className="highlight">Liked</span> Meals</h1>
                <p>Your saved meals in one place</p>
            </div>

            {loading && (
                <div className="loading-wrapper">
                    <div className="spinner" />
                    <p>Loading your liked meals...</p>
                </div>
            )}

            {error && !loading && (
                <div className="empty-state">
                    <div className="icon">⚠️</div>
                    <h3>{error}</h3>
                </div>
            )}

            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <div className="icon">🤍</div>
                    <h3>No liked meals yet.</h3>
                    <p>Go explore and like some meals!</p>
                    <Link to="/" className="back-btn" style={{ marginTop: '20px' }}>
                        🔍 Explore Meals
                    </Link>
                </div>
            )}

            {!loading && !error && meals.length > 0 && (
                <div className="meal-grid">
                    {meals.map(meal => (
                        <div className="meal-card" key={meal.idMeal}>
                            <img
                                className="meal-card-img"
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                loading="lazy"
                            />
                            <div className="meal-card-body">
                                <h3 className="meal-card-title">{meal.strMeal}</h3>
                                <span className="meal-card-category">{meal.strCategory}</span>
                                <div className="meal-card-actions">
                                    <Link
                                        to={`/meal/${meal.idMeal}`}
                                        className="btn btn-secondary"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemove(meal.idMeal)}
                                    >
                                        🗑 Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LikedMeals
