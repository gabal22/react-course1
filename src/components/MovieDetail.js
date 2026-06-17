import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const MovieDetail = ({ movieSelected, setMovie }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idError, setIdError] = useState(null);


    const getMovieDetails = async (id) => {
        try {
            setLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIES_API_KEY}&i=${id}`)
            const data = await res.json();
            setMovieDetails(data);
        } catch (error) {
            console.log('error fetching movie details', error);
            setIdError('Error fetching movie details');
        } finally {
            setLoading(false);
        }
    }

    const closeDetails = () => {
        setMovie(null);
        setMovieDetails(null);
        setIdError(null);
    }

    useEffect(() => {
        if(movieSelected) {
            getMovieDetails(movieSelected);
        }
        return () => {
            setMovieDetails(null);
            setIdError(null);
        }
    }, [movieSelected])

  return (
    loading ? 
        <p className='error'>Loading...</p> : 
        (<div className="details">
            {idError ? 
                <p className='error'>😥 {idError}</p> :
                <>
                    <header>
                        <span className="btn-back" onClick={closeDetails}>
                        ⬅️
                        </span>
                        <img src={movieDetails?.Poster} alt={`${movieDetails?.Title} poster`} />
                        <div className="details-overview">
                            <h2>{movieDetails?.Title}</h2>
                            <p>{movieDetails?.Released}</p>
                            <p>{movieDetails?.Genre}</p>
                            <p><span>⭐</span> {movieDetails?.imdbRating} IMDB rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            <StarRating maxRating={10} />
                        </div>
                        <p><em>{movieDetails?.Plot}</em></p>
                        <p>Starring: {movieDetails?.Actors}</p>
                        <p>Directed by: {movieDetails?.Director}</p>
                    </section>
                </>
            }
        </div>)
  )
}

export default MovieDetail
