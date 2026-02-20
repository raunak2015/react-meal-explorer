import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MealCard from '../components/MealCard'

function CategoryMeals() {
    const { name } = useParams()
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(name)}`
                )
                const data = await res.json()
                setMeals(data.meals || [])
            } catch {
                setError('Failed to load meals for this category.')
            } finally {
                setLoading(false)
            }
        }
        fetchMeals()
    }, [name])

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner" />
                <p>Loading {name} meals...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="empty-state">
                <div className="icon">⚠️</div>
                <h3>{error}</h3>
                <Link to="/categories" className="back-btn" style={{ marginTop: '16px' }}>
                    ← Back to Categories
                </Link>
            </div>
        )
    }

    return (
        <div>
            <Link to="/categories" className="back-btn">
                ← Back to Categories
            </Link>

            <div className="page-header">
                <h1>🍴 <span className="highlight">{name}</span> Meals</h1>
                <p>{meals.length} meals found</p>
            </div>

            {meals.length === 0 ? (
                <div className="empty-state">
                    <div className="icon">🍽️</div>
                    <h3>No meals found in this category</h3>
                </div>
            ) : (
                <div className="meal-grid">
                    {meals.map(meal => (
                        <MealCard key={meal.idMeal} meal={{ ...meal, strCategory: name }} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryMeals
