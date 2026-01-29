import './App.css'
import MovieList from './MovieList'
import { useState } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title"> Flixster</h1>
        <div className="App-header-search">
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <MovieList searchQuery={searchQuery} />
    </div>
  )
}

export default App