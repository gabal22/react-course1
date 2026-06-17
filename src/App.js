import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// export const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

export default function App() {
  const [fetchState, setFetchState] = useState({
    data: null,
    loading: false
  })
  const [query, setQuery] = useState("");
  const key = process.env.REACT_APP_MOVIES_API_KEY

  const getMovies = async () => {
    setFetchState(prev => ({...prev, loading:true}))
    try {
      const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`);
      if(!resp.ok) throw new Error(`HTTP error ${resp.Error}`);

      const data = await resp.json();
      setFetchState(prev => ({...prev, data: data || null}))
      
    } catch (error) {
      console.log('error!!!!', error);
    } finally {
      setFetchState(prev => ({...prev, loading:false}))
    }
  }

  useEffect(()=>{
    if(query.length < 3) {
      setFetchState(prev => ({...prev, data: null}))
      return;
    }
    const getData = setTimeout(() => {
      getMovies()
    }, 1000);
    return () => clearTimeout(getData)
  },[query])

  return (
    <>
      <Navbar listMovies={fetchState} searchVal={query} setSearch={setQuery} />
      <Container listMovies={fetchState.data} loading={fetchState.loading}/>
    </>
  );
}