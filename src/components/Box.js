import { useState } from 'react';
import MovieItem from './MovieItem';

const Box = ({ data, type, loading, setMovie, selectedMovie, deletedWatched, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const listMovies = type === 'watched' ? data : data?.Search;

  return (
    <div className="box">
       <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
        {isOpen && children }
        {loading && <p className='error'>Loading...</p>}
        {(isOpen && !loading && !selectedMovie) && (
            <ul className="list list-movies">
                {listMovies?.map((movie) => (
                    <MovieItem key={movie.imdbID} movie={movie} type={type} onClick={() => setMovie(movie.imdbID)} deletedWatched={deletedWatched} />
                ))}
            </ul>
        )}
        {data?.Response === "False" && <p className='error'>{data?.Error}</p>}
    </div>
  )
}

export default Box
