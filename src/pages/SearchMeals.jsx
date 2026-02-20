import { useState, useEffect } from 'react'
import MealCard from '../components/MealCard'

function SearchMeals() {
    const [searchTerm, setSearchTerm] = useState('')
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)

    // Load default meals (letter "a") on mount
    useEffect(() => {
        fetchByLetter('a')
    }, [])

    const fetchByLetter = async (letter) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
            )
            const data = await res.json()
            setMeals(data.meals || [])
        } catch {
            setError('Failed to load meals. Please check your connection.')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        const query = searchTerm.trim()
        if (!query) return

        setLoading(true)
        setError(null)
        setHasSearched(true)

        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
            )
            const data = await res.json()
            setMeals(data.meals || [])
        } catch {
            setError('Failed to search. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <h1>Explore <span className="highlight">Meals</span></h1>
                <p>Search thousands of recipes from around the world</p>
            </div>

            {/* Search Bar */}
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a meal... (e.g. Chicken, Pasta)"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    🔍 Search
                </button>
            </form>

            {/* Loading */}
            {loading && (
                <div className="loading-wrapper">
                    <div className="spinner" />
                    <p>Fetching meals...</p>
                </div>
            )}

            {/* Error */}
            {error && !loading && (
                <div className="empty-state">
                    <div className="icon">⚠️</div>
                    <h3>{error}</h3>
                </div>
            )}

            {/* No Results */}
            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <div className="icon">🍽</div>
                    <h3>No meals found</h3>
                    <p>Try a different search term</p>
                </div>
            )}

            {/* Meal Grid */}
            {!loading && !error && meals.length > 0 && (
                <div className="meal-grid">
                    {meals.map(meal => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchMeals
