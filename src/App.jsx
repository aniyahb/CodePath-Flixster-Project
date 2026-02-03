import './App.css'
import MovieList from './MovieList'
import { useState } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const handleClearSearch = () => {
    setSearchQuery('')}
  
  const handleTitleClick = () => {
    setSearchQuery('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}> Flixster</h1>
        <div className="App-header-search">
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-btn" 
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </header>
      <MovieList searchQuery={searchQuery} />
    </div>
  )
}

export default App