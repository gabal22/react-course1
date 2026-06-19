import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";

export default function App() {
  const [fetchState, setFetchState] = useState({
    data: null,
    loading: false
  })
  const [query, setQuery] = useState("");
  const key = process.env.REACT_APP_MOVIES_API_KEY

  const getMovies = useCallback(async (signal) => {
    setFetchState(prev => ({...prev, loading:true}))
    try {
      const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`, { signal });
      if(!resp.ok) throw new Error(`HTTP error ${resp.Error}`);

      const data = await resp.json();
      setFetchState(prev => ({...prev, data: data || null}))
      
    } catch (error) {
      if (error.name === 'AbortError') return;

      console.log('error!!!!', error);
    } finally {
      if (!signal.aborted)
      setFetchState(prev => ({...prev, loading:false}))
    }
  }, [key, query]);

  useEffect(()=>{
    if(query.length < 3) {
      setFetchState(prev => ({...prev, data: null}))
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    // debounce function to avoid making too many API calls while user is typing
    const getData = setTimeout(() => {
      getMovies(signal);
    }, 1000);

    return () => {
      clearTimeout(getData);
      controller.abort();
    }
  },[query, getMovies])

  return (
    <>
      <Navbar listMovies={fetchState} searchVal={query} setSearch={setQuery} />
      <Container listMovies={fetchState.data} loading={fetchState.loading}/>
    </>
  );
}