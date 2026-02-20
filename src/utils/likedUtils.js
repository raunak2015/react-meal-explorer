// localStorage helpers for liked meals

const LIKED_KEY = 'likedMeals'

export function getLikedIds() {
    try {
        return JSON.parse(localStorage.getItem(LIKED_KEY)) || []
    } catch {
        return []
    }
}

export function isLiked(id) {
    return getLikedIds().includes(String(id))
}

export function toggleLike(id) {
    const ids = getLikedIds()
    const strId = String(id)
    let updated

    if (ids.includes(strId)) {
        updated = ids.filter(i => i !== strId)
    } else {
        updated = [...ids, strId]
    }

    localStorage.setItem(LIKED_KEY, JSON.stringify(updated))
    // Dispatch custom event so Navbar can update count
    window.dispatchEvent(new Event('likedUpdated'))
    return updated
}
