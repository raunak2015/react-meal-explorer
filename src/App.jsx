import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchMeals from './pages/SearchMeals'
import MealDetails from './pages/MealDetails'
import Categories from './pages/Categories'
import LikedMeals from './pages/LikedMeals'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SearchMeals />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/liked" element={<LikedMeals />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
