import React, { useState } from 'react';

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized image URL for gallery display (600x400)
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-all duration-200">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {/* Skeleton placeholder while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <svg
              className="w-10 h-10 mb-2"
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Favorite Heart Button overlaid on top-right */}
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 hover:scale-110 active:scale-90 ${
            isFavorite
              ? 'bg-white/90 text-red-500'
              : 'bg-white/80 text-gray-500 hover:text-red-500'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 transition-colors duration-150 ${
              isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current'
            }`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Photographer
          </span>
          <h3
            className="text-base font-semibold text-gray-900 truncate mt-0.5"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* External Link to Original Photo */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-150"
            aria-label={`View original photo by ${photo.author} on Unsplash (opens in new tab)`}
          >
            <span>View Original</span>
            <svg
              className="w-3.5 h-3.5 ml-1 text-gray-400 group-hover/link:text-indigo-600"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <span className="text-[11px] text-gray-400">ID: #{photo.id}</span>
        </div>
      </div>
    </div>
  );
}
