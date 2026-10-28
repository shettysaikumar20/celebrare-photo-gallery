import React, { useReducer, useCallback } from 'react';
import favoritesReducer, { getInitialFavorites } from './reducer/favoritesReducer.js';
import Navbar from './components/Navbar.jsx';
import Gallery from './components/Gallery.jsx';

export default function App() {
  // Requirement 5: useReducer for favorites (not useState), initialized with localStorage
  const [favorites, dispatch] = useReducer(favoritesReducer, [], getInitialFavorites);

  // useCallback for toggling favorite photo
  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar with live favorite counter */}
      <Navbar favoriteCount={favorites.length} />

      {/* Main Gallery Area */}
      <main className="flex-grow">
        <Gallery
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
        <p>Celebrare Frontend Assignment &bull; Built with React, Vite &amp; Tailwind CSS</p>
      </footer>
    </div>
  );
}
