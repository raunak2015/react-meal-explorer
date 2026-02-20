import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleLike, selectIsLiked } from '../store/likedSlice'

function MealCard({ meal }) {
    const dispatch = useDispatch()
    const liked = useSelector(selectIsLiked(meal.idMeal))
    const navigate = useNavigate()

    const handleLike = () => {
        dispatch(toggleLike(meal.idMeal))
    }

    return (
        <div className="meal-card">
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
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/meal/${meal.idMeal}`)}
                    >
                        View Details
                    </button>
                    <button
                        className="btn-like"
                        onClick={handleLike}
                        title={liked ? 'Unlike' : 'Like'}
                    >
                        {liked ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MealCard
