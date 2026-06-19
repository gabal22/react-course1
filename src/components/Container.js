import { useState } from 'react';
// import { tempWatchedData } from '../App';
import Box from './Box';
import WatchSummary from './WatchSummary';
import MovieDetail from './MovieDetail';

const Container = ({ listMovies, loading }) => {
  const [watched, setWatched] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);
  
  const deletedWatched = (id) => {
    setWatched(prev => prev.filter(movie => movie.imdbID !== id));
  };

  return (
    <main className="main">
        <Box data={listMovies} loading={loading} setMovie={setMovieSelected} />
        <Box data={watched} type={'watched'} selectedMovie={movieSelected} deletedWatched={deletedWatched}>
            {movieSelected ? 
              <MovieDetail movieSelected={movieSelected} setMovie={setMovieSelected} setWatched={setWatched} watchedList={watched} /> : 
              <WatchSummary watched={watched} />
            }
        </Box>
    </main>
  )
}

export default Container