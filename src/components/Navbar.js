import SearchBar from './SearchBar';

const Navbar = ({ listMovies, searchVal, setSearch }) => {
  return (
    <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <SearchBar listMovies={listMovies} query={searchVal} setQuery={setSearch}/>
    </nav>
  )
}

export default Navbar;