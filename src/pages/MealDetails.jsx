import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { isLiked, toggleLike } from '../utils/likedUtils'

function MealDetails() {
    const { id } = useParams()
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const fetchMeal = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                )
                const data = await res.json()
                if (data.meals && data.meals.length > 0) {
                    setMeal(data.meals[0])
                    setLiked(isLiked(data.meals[0].idMeal))
                } else {
                    setError('Meal not found.')
                }
            } catch {
                setError('Failed to load meal details.')
            } finally {
                setLoading(false)
            }
        }

        fetchMeal()
    }, [id])

    const handleLike = () => {
        toggleLike(meal.idMeal)
        setLiked(prev => !prev)
    }

    // Extract ingredients from meal object
    const getIngredients = (meal) => {
        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim())
            }
        }
        return ingredients
    }

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner" />
                <p>Loading meal details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="empty-state">
                <div className="icon">⚠️</div>
                <h3>{error}</h3>
                <Link to="/" className="back-btn" style={{ marginTop: '16px' }}>
                    ← Back to Search
                </Link>
            </div>
        )
    }

    if (!meal) return null

    const ingredients = getIngredients(meal)
    const instructions = meal.strInstructions || ''

    return (
        <div className="meal-details">
            <Link to="/" className="back-btn">← Back to Search</Link>

            <div className="meal-details-header">
                <img
                    className="meal-details-img"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                />
                <div className="meal-details-info">
                    <h1>{meal.strMeal}</h1>

                    <div className="meal-meta">
                        <span className="meal-meta-tag">
                            <span className="label">Category:</span> {meal.strCategory}
                        </span>
                        <span className="meal-meta-tag">
                            <span className="label">Area:</span> {meal.strArea}
                        </span>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleLike}
                        style={{ marginBottom: '12px' }}
                    >
                        {liked ? '❤️ Liked' : '🤍 Like this Meal'}
                    </button>

                    {meal.strYoutube && (
                        <a
                            href={meal.strYoutube}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-secondary"
                        >
                            ▶ Watch Recipe
                        </a>
                    )}
                </div>
            </div>

            {/* Ingredients */}
            <h2 className="section-title">🥗 Ingredients</h2>
            <div className="ingredients-grid">
                {ingredients.map((ing, idx) => (
                    <span key={idx} className="ingredient-chip">{ing}</span>
                ))}
            </div>

            {/* Instructions */}
            <h2 className="section-title">📋 Instructions</h2>
            <div className="instructions-text">
                {instructions.length > 1200
                    ? instructions.slice(0, 1200) + '...'
                    : instructions}
            </div>
        </div>
    )
}

export default MealDetails
