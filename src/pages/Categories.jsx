import { useState, useEffect } from 'react'

function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    'https://www.themealdb.com/api/json/v1/1/categories.php'
                )
                const data = await res.json()
                setCategories(data.categories || [])
            } catch {
                setError('Failed to load categories. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    const trimDescription = (text, maxLength = 120) => {
        if (!text) return ''
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
    }

    return (
        <div>
            <div className="page-header">
                <h1>Meal <span className="highlight">Categories</span></h1>
                <p>Browse meals by category and discover new cuisines</p>
            </div>

            {loading && (
                <div className="loading-wrapper">
                    <div className="spinner" />
                    <p>Loading categories...</p>
                </div>
            )}

            {error && !loading && (
                <div className="empty-state">
                    <div className="icon">⚠️</div>
                    <h3>{error}</h3>
                </div>
            )}

            {!loading && !error && (
                <div className="categories-grid">
                    {categories.map(cat => (
                        <div className="category-card" key={cat.idCategory}>
                            <img
                                className="category-img"
                                src={cat.strCategoryThumb}
                                alt={cat.strCategory}
                                loading="lazy"
                            />
                            <div className="category-body">
                                <h3 className="category-name">{cat.strCategory}</h3>
                                <p className="category-desc">
                                    {trimDescription(cat.strCategoryDescription)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Categories
