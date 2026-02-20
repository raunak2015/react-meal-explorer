import { useState, useEffect } from 'react'

function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
                const data = await res.json()
                setCategories(data.categories || [])
            } catch {
                setError('Failed to load categories.')
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner" />
                <p>Loading categories...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="empty-state">
                <div className="icon">⚠️</div>
                <h3>{error}</h3>
            </div>
        )
    }

    return (
        <div>
            <div className="page-header">
                <h1>📂 <span className="highlight">Meal</span> Categories</h1>
                <p>Browse meals by category</p>
            </div>

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
                                {cat.strCategoryDescription.slice(0, 120)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
