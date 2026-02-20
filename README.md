# 🍽 Meal Explorer

A feature-rich React application for exploring, searching, and saving meals from around the world. Built with **TheMealDB API**, **React Router**, **Redux Toolkit**, and a stunning **glassmorphism** dark theme.

🔗 **Live Demo:** [meal-explorer on Netlify](https://meal-explorer-raunak.netlify.app)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Search Meals** | Search meals by name using TheMealDB API |
| � **Filter by Letter** | A–Z alphabet bar to filter meals by first letter |
| �📜 **Infinite Scroll** | Auto-loads meals letter-by-letter (A→Z) as you scroll |
| 🎲 **Random Meal** | "Surprise Me" button fetches a random meal with spin animation |
| 📂 **Categories** | Browse all meal categories with images & descriptions |
| 🍴 **Category Meals** | View all meals in a selected category |
| 📖 **Meal Details** | Full details — image, ingredients, instructions, YouTube link |
| ❤️ **Like Meals** | Like/unlike meals, saved in localStorage via Redux |
| 🧭 **Liked Meals Page** | View all liked meals with remove option |
| 📱 **Mobile Bottom Tab Bar** | Native app-feel navigation on mobile devices |
| 🎨 **Glassmorphism Theme** | Dark theme with animated background orbs, glass cards, gradient accents |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library (functional components + hooks) |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing (BrowserRouter) |
| **Redux Toolkit** | Global state management for liked meals |
| **TheMealDB API** | Free meal data API |
| **localStorage** | Persistent liked meals across sessions |
| **CSS (Vanilla)** | Glassmorphism theme with responsive design |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navbar + mobile bottom tab bar
│   └── MealCard.jsx        # Reusable meal card with like toggle
├── pages/
│   ├── SearchMeals.jsx     # Home page — search + alphabet filter + infinite scroll
│   ├── MealDetails.jsx     # Meal detail view (/meal/:id)
│   ├── Categories.jsx      # All categories (/categories)
│   ├── CategoryMeals.jsx   # Meals by category (/category/:name)
│   ├── LikedMeals.jsx      # Liked meals page (/liked)
│   └── RandomMeal.jsx      # Random meal generator (/random)
├── store/
│   ├── store.js            # Redux store configuration
│   └── likedSlice.js       # Liked meals slice (actions + selectors)
├── utils/
│   └── likedUtils.js       # Legacy localStorage helpers (unused)
├── App.jsx                 # Root component with routes
├── main.jsx                # Entry point with Provider + BrowserRouter
└── index.css               # Complete glassmorphism theme + responsive CSS
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm** v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/raunak2015/react-meal-explorer.git
cd react-meal-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Production Build

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## 📍 Application Routes

| Route | Page | Description |
|---|---|---|
| `/` | Search Meals | Default view — search, alphabet filter, infinite scroll |
| `/meal/:id` | Meal Details | Shows full info for a specific meal |
| `/categories` | Categories | Grid of all meal categories |
| `/category/:name` | Category Meals | All meals under a specific category |
| `/liked` | Liked Meals | Shows all user-liked meals |
| `/random` | Random Meal | "Surprise Me" random meal generator |

---

## 🔌 API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `search.php?s=NAME` | Search meals by name |
| `search.php?f=LETTER` | Get meals starting with a letter |
| `lookup.php?i=ID` | Get full meal details by ID |
| `categories.php` | Get all meal categories |
| `filter.php?c=CATEGORY` | Get meals by category |
| `random.php` | Get a random meal |

Base URL: `https://www.themealdb.com/api/json/v1/1/`

---

## ❤️ Like Feature (Redux Toolkit)

The like system uses **Redux Toolkit** with localStorage sync:

```
User clicks Like → dispatch(toggleLike(id)) → Redux updates state → localStorage synced
```

- **Slice:** `src/store/likedSlice.js`
  - `toggleLike(id)` — Add or remove a meal ID
  - `removeLike(id)` — Remove a specific meal ID
- **Selectors:** `selectLikedIds`, `selectIsLiked(id)`, `selectLikedCount`
- **Persistence:** State initializes from localStorage on app load; every mutation writes back

---

## 🎨 Design Highlights

- **Dark glassmorphism** — translucent cards with `backdrop-filter: blur()`
- **Animated background orbs** — purple, pink, green radial gradients
- **Gradient accents** — `#a78bfa` → `#f472b6` throughout
- **Google Fonts** — Inter (weights 300–700)
- **Responsive breakpoints:**
  - `≤1024px` — Tablet landscape
  - `≤768px` — Tablet portrait
  - `≤480px` — Mobile (bottom tab bar + horizontal cards)
  - `≤360px` — Small mobile

---

## 📱 Mobile UX

On screens ≤480px:
- **Bottom tab bar** replaces top navbar links (Search / Categories / Random / Liked)
- **Horizontal meal cards** — thumbnail left, content right
- **Pill-shaped search bar** with integrated button
- **Compact alphabet bar** with smaller letter buttons
- Content padded to clear the tab bar

---

## 🧪 Hooks Used

| Hook | Usage |
|---|---|
| `useState` | Meals, loading, error, search term, active letter, etc. |
| `useEffect` | API calls, IntersectionObserver setup |
| `useParams` | Dynamic route params (`:id`, `:name`) |
| `useNavigate` | Programmatic navigation from MealCard & RandomMeal |
| `useSelector` | Read Redux state (liked IDs, count) |
| `useDispatch` | Dispatch Redux actions (toggleLike, removeLike) |
| `useRef` | IntersectionObserver sentinel element |
| `useCallback` | Memoized `loadMore` function for infinite scroll |

---

## 📦 Deployment

Deployed on **Netlify** with automatic deploys from GitHub.

### Deploy Your Own
1. Push to GitHub
2. Connect repo on [app.netlify.com](https://app.netlify.com)
3. Settings: **Build command:** `npm run build` | **Publish directory:** `dist`
4. The `public/_redirects` file handles SPA routing

---

## 📄 License

This project is for educational purposes.

---

Made with ❤️ by **Raunak**
