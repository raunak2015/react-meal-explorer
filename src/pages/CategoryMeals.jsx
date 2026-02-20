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
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="spinner" />
                <p className="text-white/40 text-sm">Loading {name} meals...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-white/70">{error}</h3>
                <Link to="/categories" className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-white/70 text-sm font-medium no-underline hover:text-white hover:bg-white/[0.06] transition-all">
                    ← Back to Categories
                </Link>
            </div>
        )
    }

    return (
        <div>
            <Link to="/categories" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-white/70 text-sm font-medium no-underline hover:text-white hover:bg-white/[0.06] transition-all mb-6 max-md:mb-4 max-md:text-xs max-md:px-3">
                ← Back to Categories
            </Link>

            <div className="mb-8 max-md:mb-5">
                <h1 className="text-3xl font-bold tracking-tight mb-2 max-md:text-2xl">
                    🍴 <span className="highlight">{name}</span> Meals
                </h1>
                <p className="text-white/50 text-sm">{meals.length} meals found</p>
            </div>

            {meals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-5xl mb-4">🍽️</div>
                    <h3 className="text-lg font-semibold text-white/70">No meals found in this category</h3>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 max-md:grid-cols-1 max-md:gap-3">
                    {meals.map(meal => (
                        <MealCard key={meal.idMeal} meal={{ ...meal, strCategory: name }} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryMeals
