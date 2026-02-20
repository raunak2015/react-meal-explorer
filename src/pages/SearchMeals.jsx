import { useState, useEffect, useRef, useCallback } from 'react'
import MealCard from '../components/MealCard'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

function SearchMeals() {
    const [searchTerm, setSearchTerm] = useState('')
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [letterIndex, setLetterIndex] = useState(0)
    const [allLoaded, setAllLoaded] = useState(false)
    const [isSearchMode, setIsSearchMode] = useState(false)

    // Sentinel div ref for IntersectionObserver
    const sentinelRef = useRef(null)
    const observerRef = useRef(null)

    // Fetch meals by a single letter, returns array (or [])
    const fetchByLetter = async (letter) => {
        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
            )
            const data = await res.json()
            return data.meals || []
        } catch {
            return []
        }
    }

    // Load the next batch of meals (next letter)
    const loadMore = useCallback(async () => {
        if (loadingMore || allLoaded || isSearchMode) return

        setLoadingMore(true)
        setError(null)

        let batch = []
        let idx = letterIndex

        // Skip letters that return 0 results (keep looking until we find some)
        while (idx < LETTERS.length && batch.length === 0) {
            batch = await fetchByLetter(LETTERS[idx])
            idx++
        }

        if (idx >= LETTERS.length && batch.length === 0) {
            setAllLoaded(true)
        } else {
            setMeals(prev => {
                // Deduplicate by meal ID
                const existing = new Set(prev.map(m => m.idMeal))
                const newBatch = batch.filter(m => !existing.has(m.idMeal))
                return [...prev, ...newBatch]
            })
            setLetterIndex(idx)
        }

        setLoadingMore(false)
    }, [loadingMore, allLoaded, isSearchMode, letterIndex])

    // Initial load
    useEffect(() => {
        const initialLoad = async () => {
            setLoading(true)
            setError(null)
            const initial = await fetchByLetter('a')
            setMeals(initial)
            setLetterIndex(1) // next letter will be 'b'
            setLoading(false)
        }
        initialLoad()
    }, [])

    // Setup IntersectionObserver on sentinel
    useEffect(() => {
        if (isSearchMode) return

        const sentinel = sentinelRef.current
        if (!sentinel) return

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore()
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        )

        observerRef.current.observe(sentinel)

        return () => {
            if (observerRef.current) observerRef.current.disconnect()
        }
    }, [loadMore, isSearchMode])

    // Search by name
    const handleSearch = async (e) => {
        e.preventDefault()
        const query = searchTerm.trim()

        if (!query) {
            // Reset to infinite scroll mode
            setIsSearchMode(false)
            setMeals([])
            setLetterIndex(0)
            setAllLoaded(false)
            const initial = await fetchByLetter('a')
            setMeals(initial)
            setLetterIndex(1)
            return
        }

        setLoading(true)
        setError(null)
        setIsSearchMode(true)

        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
            )
            const data = await res.json()
            setMeals(data.meals || [])
        } catch {
            setError('Search failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Clear search → go back to infinite scroll
    const handleClear = async () => {
        setSearchTerm('')
        setIsSearchMode(false)
        setMeals([])
        setLetterIndex(0)
        setAllLoaded(false)
        setLoading(true)
        const initial = await fetchByLetter('a')
        setMeals(initial)
        setLetterIndex(1)
        setLoading(false)
    }

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <h1>Explore <span className="highlight">Meals</span></h1>
                <p>
                    {isSearchMode
                        ? `Showing results for "${searchTerm}"`
                        : 'Scroll down to discover more meals from around the world'}
                </p>
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
                {isSearchMode && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClear}
                    >
                        ✕ Clear
                    </button>
                )}
            </form>

            {/* Initial Loading */}
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

            {/* No Results (search mode) */}
            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <div className="icon">🍽</div>
                    <h3>No meals found</h3>
                    <p>Try a different search term</p>
                </div>
            )}

            {/* Meal Grid */}
            {!loading && meals.length > 0 && (
                <>
                    <div className="meal-grid">
                        {meals.map(meal => (
                            <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>

                    {/* Infinite scroll sentinel */}
                    {!isSearchMode && (
                        <div ref={sentinelRef} style={{ height: '1px', marginTop: '40px' }}>
                            {loadingMore && (
                                <div className="loading-more-wrapper">
                                    <div className="spinner" />
                                    <p>Loading more meals...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* End of all meals */}
                    {allLoaded && !isSearchMode && (
                        <div className="all-loaded">
                            🎉 You've explored all meals in the database!
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default SearchMeals
