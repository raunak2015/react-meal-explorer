import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchMeals from './pages/SearchMeals'
import MealDetails from './pages/MealDetails'
import Categories from './pages/Categories'
import CategoryMeals from './pages/CategoryMeals'
import LikedMeals from './pages/LikedMeals'

function App() {
  return (
    <div className="min-h-screen bg-dark font-inter text-[#f0f0ff]">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-24 pb-10 px-6 max-md:px-4 max-md:pt-20 max-md:pb-24">
        <Routes>
          <Route path="/" element={<SearchMeals />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:name" element={<CategoryMeals />} />
          <Route path="/liked" element={<LikedMeals />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
