import { configureStore } from '@reduxjs/toolkit'
import likedReducer from './likedSlice'

const store = configureStore({
    reducer: {
        liked: likedReducer,
    },
})

export default store
