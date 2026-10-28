# Photo Gallery Web App (Celebrare Assignment)

A production-ready responsive Photo Gallery built with **React**, **Vite**, and **Tailwind CSS**. Fetches images from the Picsum Photos API, supports real-time author search filtering, and enables marking photos as favorites with `useReducer` and persistent `localStorage` synchronization.

---

## 🚀 Features

- **React + Vite Setup:** Fast builds and HMR with zero configuration bloat.
- **Pure Tailwind CSS:** Clean, responsive design without external UI or icon component libraries.
- **API Fetching with Custom Hook:** Encapsulates data retrieval, loading spinner, and error state inside `useFetchPhotos`.
- **Responsive Card Grid:**
  - Desktop (`lg`): 4 columns
  - Tablet (`sm`/`md`): 2 columns
  - Mobile: 1 column
- **Real-Time Client-Side Search:** Instant filtering by author name as you type without extra network requests.
- **Performance Optimizations:**
  - `useCallback` on the search input handler.
  - `useMemo` on the filtered photo list.
- **State Persistence with `useReducer`:**
  - Toggles favorite IDs in state.
  - Persists favorites under `celebrare_favorites` in `localStorage` across page reloads.

---

## 📁 Project Structure

```text
src/
├── hooks/
│   └── useFetchPhotos.js        # Custom hook: fetches 30 photos with loading & error states
├── reducer/
│   └── favoritesReducer.js      # useReducer logic + localStorage persistence
├── components/
│   ├── Navbar.jsx               # Header with branding & dynamic favorite count badge
│   ├── SearchBar.jsx            # Real-time search input with clear button
│   ├── PhotoCard.jsx            # Card showing photo, author, link & favorite heart
│   └── Gallery.jsx              # Grid container consuming useFetchPhotos, useMemo & useCallback
├── App.jsx                      # App root managing favorites reducer
├── index.css                    # Tailwind CSS directives
└── main.jsx                     # Vite React entry point
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
npm run preview
```
