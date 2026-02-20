import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="spinner" />
                <p className="text-white/40 text-sm">Loading categories...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-white/70">{error}</h3>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-8 max-md:mb-5">
                <h1 className="text-3xl font-bold tracking-tight mb-2 max-md:text-2xl">
                    📂 <span className="highlight">Meal</span> Categories
                </h1>
                <p className="text-white/50 text-sm">Browse meals by category</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 max-md:grid-cols-2 max-md:gap-3">
                {categories.map(cat => (
                    <Link
                        key={cat.idCategory}
                        to={`/category/${encodeURIComponent(cat.strCategory)}`}
                        className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(167,139,250,0.12)] hover:border-accent/20 no-underline text-inherit block"
                    >
                        <img
                            className="w-full h-40 object-cover max-md:h-28"
                            src={cat.strCategoryThumb}
                            alt={cat.strCategory}
                            loading="lazy"
                        />
                        <div className="p-4 max-md:p-3">
                            <h3 className="text-base font-semibold text-white/90 mb-2 max-md:text-sm max-md:mb-1">
                                {cat.strCategory}
                            </h3>
                            <p className="text-xs text-white/50 leading-relaxed line-clamp-3 max-md:text-[0.73rem]">
                                {cat.strCategoryDescription.slice(0, 120)}...
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories
