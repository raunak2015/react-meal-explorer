import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RandomMeal() {
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [spinning, setSpinning] = useState(false)
    const navigate = useNavigate()

    const fetchRandom = async () => {
        setSpinning(true)
        setLoading(true)

        // Small delay for the spin animation feel
        await new Promise(r => setTimeout(r, 600))

        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            const data = await res.json()
            if (data.meals && data.meals.length > 0) {
                setMeal(data.meals[0])
            }
        } catch {
            setMeal(null)
        } finally {
            setLoading(false)
            setSpinning(false)
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>🎲 <span className="highlight">Random</span> Meal</h1>
                <p>Feeling adventurous? Let fate decide your next meal!</p>
            </div>

            {/* Surprise Me Button */}
            <div className="random-hero">
                <button
                    className={`random-btn ${spinning ? 'spinning' : ''}`}
                    onClick={fetchRandom}
                    disabled={loading}
                >
                    <span className="random-btn-icon">🎲</span>
                    <span>{loading ? 'Finding...' : meal ? 'Try Again!' : 'Surprise Me!'}</span>
                </button>
            </div>

            {/* Random Meal Result */}
            {meal && !loading && (
                <div className="random-result">
                    <div className="random-card">
                        <img
                            className="random-card-img"
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                        />
                        <div className="random-card-body">
                            <h2 className="random-card-title">{meal.strMeal}</h2>
                            <div className="random-card-tags">
                                <span className="meal-meta-tag">
                                    <span className="label">Category:</span> {meal.strCategory}
                                </span>
                                <span className="meal-meta-tag">
                                    <span className="label">Area:</span> {meal.strArea}
                                </span>
                            </div>
                            <p className="random-card-desc">
                                {meal.strInstructions
                                    ? meal.strInstructions.slice(0, 200) + '...'
                                    : 'No instructions available.'}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/meal/${meal.idMeal}`)}
                            >
                                📖 View Full Recipe
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RandomMeal
