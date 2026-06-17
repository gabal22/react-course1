

const SearchBar = ({ listMovies, query, setQuery }) => {
  
  return (
    <>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!!listMovies.data?.Search &&
          <p className="num-results">
            Found <strong>{listMovies.data?.Search.length}</strong> results
          </p> 
        } 
    </>
  )
}

export default SearchBar
