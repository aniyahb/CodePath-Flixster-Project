// import.meta.env.VITE_API_KEY
// NOW PLAYING MOVIE LIST
import { useState, useEffect } from 'react';
import "./MovieList.css"
import MovieCard from './MovieCard.jsx'
import Modal from './Modal';


const MovieList = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieId, setMovieId] = useState();
  const [pickedMovie, setPickedMovie] = useState(null);
  const [sortBy, setSortBy] = useState('now_playing');
  const [url, setUrl] = useState()
  

// Fetch Now Playing Movies
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ3OGMwNGMwY2FjMzU5MWJmNWZlNjdmNzEwMmE0OSIsInN1YiI6IjY2NjdkMTNkOWMwOTk4ZmYzMDFjM2U4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lxCKmIG5jGH82CjvnONg1DussKlgYFSICO6I2PNjwV8'
      }
    };
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(response => setData([...data,...response.results]))
      .catch(err => console.error(err));

  }, [page])

  // Handle search when searchQuery prop changes
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ3OGMwNGMwY2FjMzU5MWJmNWZlNjdmNzEwMmE0OSIsInN1YiI6IjY2NjdkMTNkOWMwOTk4ZmYzMDFjM2U4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lxCKmIG5jGH82CjvnONg1DussKlgYFSICO6I2PNjwV8'
      }
    };

    if (searchQuery.trim() === "") {
      // Fetch now_playing when search is empty
      fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setData(response.results))
        .catch(err => console.error(err));
      return;
    }

    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
    
    fetch(searchUrl, options)
      .then(response => response.json())
      .then(response => setData(response.results))
      .catch(err => console.error(err));

  }, [searchQuery]);

  function renderMovieCard(movie, index){
    return (
      <MovieCard
        movie={movie}
        setPickedMovie={setPickedMovie}
        handleClickFunc={() => handleOpen(movie)}
        key={index}
        image={"https://image.tmdb.org/t/p/w500"+movie.poster_path}
        title={movie.original_title}
        average={movie.vote_average}
        selectedMovieId={() => handleSetMovieId(movie.id)}
        pickedMovie={() => handleSetMovie(movie.id)}
        genre={movie.genre_ids}
      />
    )
  }

  const loadMore = () => {
    setPage(page+1);

  }

  

  const handleClose = (e) => {
    setModalOpen(false);
  };

  const handleOpen = (movie) => {
    setModalOpen(!modalOpen);
    setPickedMovie(movie);


    }


  function handleSetMovieId(id){
    let picked = findClickedMovie(data, movieId);
  }

  function handleSetMovie(id){
    let picked = findClickedMovie(data, id);
    setPickedMovie(picked);
  }


  function findClickedMovie (data, selectedMovieId) {
    return data?.find(movie => movie.id === selectedMovieId);
  }



  function handleSort(event){
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    if (newSortBy === 'now_playing'){
      setData(data.sort((a, b) => (b.popularity - a.popularity)))
    }

    else if (newSortBy === 'release_date'){
      setData(data.sort((a, b) => (Date.parse(b.release_date) - Date.parse(a.release_date))))
    }

    else if (newSortBy === 'vote_average'){
      setData(data.sort((a, b) => (b.vote_average - a.vote_average)))
    }


  }


// -------------------------------- HTML ------------------------------------------
  return (

    <>
      {modalOpen && pickedMovie && <Modal showModal={handleOpen} id={movieId} movies={data} pickedMovie={pickedMovie} />}
     

    <div className="sort-button">
      <select className="sort" id="sort-by" value={sortBy} onChange={e => handleSort(e)} >
        <option value="now_playing">Now Playing</option>
        <option value="release_date">Release Date</option>
        <option value="vote_average">Rating</option>
      </select>
    </div>



    <div className='movie-list'>
      {
      data.map(renderMovieCard)
      }
    </div>


    <button id="LoadMore" onClick={loadMore}>
      Load More
    </button>



    </>


  );

    }
  
export default MovieList;

