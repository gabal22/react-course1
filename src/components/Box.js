import { useState } from 'react';
import MovieItem from './MovieItem';

const Box = ({ data, type, loading, setMovie, selectedMovie, children }) => {
  const [isOpen, setIsOpen] = useState(true);

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
        {(isOpen && !loading) && (
            <ul className="list list-movies">
                {data?.Search?.map((movie) => (
                    <MovieItem key={movie.imdbID} movie={movie} type={type} onClick={() => setMovie(movie.imdbID)} />
                ))}
            </ul>
        )}
        {data?.Response === "False" && <p className='error'>{data?.Error}</p>}
    </div>
  )
}

export default Box
