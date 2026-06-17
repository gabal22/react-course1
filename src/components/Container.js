import { useState } from 'react';
// import { tempWatchedData } from '../App';
import Box from './Box';
import WatchSummary from './WatchSummary';
import MovieDetail from './MovieDetail';

const Container = ({ listMovies, loading }) => {
  const [watched, setWatched] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);

  return (
    <main className="main">
        <Box data={listMovies} loading={loading} setMovie={setMovieSelected} />
        <Box data={watched} type={'watched'} selectedMovie={movieSelected}>
            {movieSelected ? 
              <MovieDetail movieSelected={movieSelected} setMovie={setMovieSelected} /> : 
              <WatchSummary watched={watched} />
            }
        </Box>
    </main>
  )
}

export default Container