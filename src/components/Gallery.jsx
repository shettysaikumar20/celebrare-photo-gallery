import React, { useState, useMemo, useCallback } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos.js';
import SearchBar from './SearchBar.jsx';
import PhotoCard from './PhotoCard.jsx';

export default function Gallery({ favorites, onToggleFavorite }) {
  // Requirement 6: Gallery component uses the custom hook (not direct fetch)
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 7: useCallback on search filter handler
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Requirement 7: useMemo to compute filtered photo list (case-insensitive author search)
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Requirement 4: Search filter at top */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Requirement 2: Loading spinner while fetching */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-14 h-14">
            <div className="w-14 h-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
            Loading photos...
          </p>
        </div>
      )}

      {/* Requirement 2: Error state if fetch fails */}
      {!loading && error && (
        <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-center shadow-sm">
          <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-red-900 mb-1">Failed to Load Photos</h3>
          <p className="text-sm text-red-700 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty Search Results */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="max-w-md mx-auto my-16 p-8 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-14 h-14 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">No photos found</h3>
          <p className="text-xs text-gray-500">
            No authors matching <span className="font-semibold text-gray-700">"{searchTerm}"</span>.
          </p>
        </div>
      )}

      {/* Requirement 3: Responsive Grid
          Desktop (lg): 4 columns
          Tablet (sm/md): 2 columns
          Mobile: 1 column
      */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.some((favId) => String(favId) === String(photo.id))}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
