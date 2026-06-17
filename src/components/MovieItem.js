
const MovieItem = ({ movie, type, onClick }) => {
    const placeholder = 'https://via.placeholder.com/150x225?text=No+Image';

  return (
    <li onClick={onClick}>
        <img src={movie.Poster || placeholder} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        {type === 'watched' ?
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
            :
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        }
    </li>
  )
}

export default MovieItem
