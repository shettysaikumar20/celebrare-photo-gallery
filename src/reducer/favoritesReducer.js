export const STORAGE_KEY = 'celebrare_favorites';

/**
 * Safely initialize favorites array from localStorage.
 * Used as the 3rd argument (initializer function) for useReducer.
 */
export const getInitialFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map(String);
      }
    }
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
  }
  return [];
};

/**
 * favoritesReducer
 * Handles TOGGLE_FAVORITE action and keeps state synced with localStorage.
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const targetId = String(action.payload !== undefined ? action.payload : action.id);
      const isAlreadyFavorite = state.some((id) => String(id) === targetId);

      const nextFavorites = isAlreadyFavorite
        ? state.filter((id) => String(id) !== targetId)
        : [...state, targetId];

      // Persist to localStorage immediately
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }

      return nextFavorites;
    }
    default:
      return state;
  }
}

export default favoritesReducer;
