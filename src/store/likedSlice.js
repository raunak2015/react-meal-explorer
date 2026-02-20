import { createSlice } from '@reduxjs/toolkit'

// Initialize from localStorage
const loadLikedIds = () => {
    try {
        return JSON.parse(localStorage.getItem('likedMeals')) || []
    } catch {
        return []
    }
}

const likedSlice = createSlice({
    name: 'liked',
    initialState: {
        ids: loadLikedIds(),
    },
    reducers: {
        toggleLike: (state, action) => {
            const id = String(action.payload)
            if (state.ids.includes(id)) {
                state.ids = state.ids.filter(i => i !== id)
            } else {
                state.ids.push(id)
            }
            // Sync to localStorage
            localStorage.setItem('likedMeals', JSON.stringify(state.ids))
        },
        removeLike: (state, action) => {
            const id = String(action.payload)
            state.ids = state.ids.filter(i => i !== id)
            localStorage.setItem('likedMeals', JSON.stringify(state.ids))
        },
    },
})

export const { toggleLike, removeLike } = likedSlice.actions

// Selectors
export const selectLikedIds = (state) => state.liked.ids
export const selectIsLiked = (id) => (state) => state.liked.ids.includes(String(id))
export const selectLikedCount = (state) => state.liked.ids.length

export default likedSlice.reducer
