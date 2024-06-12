import { useState } from "react";
import { fetchMovies } from "../api/fetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetail from "./MovieDetail";

function MoviesPortal() {
    //state to hold user's search input
    const [searchInputText, setSearchInputText] = useState('')
    //state to hold user's text entered after they press enter
    const [enteredSearchText, setEnteredSearchText] = useState('')
    //state to hold list of movies returned by API
    const [movies, setMovies] = useState([])
    //state to hold any error messages
    const [error, setError] = useState('')

    //function to handle search form submission
    const onSearchTextEnter = (e) => {
      e.preventDefault();   //prevent default form submission behaviour
      fetchMovies(searchInputText, setMovies, setError)   //call fetchMovies function with user's search input
      setEnteredSearchText(searchInputText)
    };

    return (
      <>
      <div className="row">
        <div className="col-md-12">
            <form onSubmit={onSearchTextEnter}>
                <input 
                type="text" placeholder="Search" className="form-control"
                value={searchInputText}   //bind input value to searchInputText state
                onChange={(e) => setSearchInputText(e.target.value)}    //update searchInputText state when user types in the input
                />
            </form>
        </div>
      </div>
      <br/>
      {/*display error alert if there's an error*/}
      {error && <ErrorAlert error={error} searchTerm={enteredSearchText}/>}
      {/*display the number of movies found*/}
      {movies.length > 0 && <p className='text-light'> Showing {movies.length} Movies for '{enteredSearchText}'</p>}
      {/*map over the movies array and render a MovieDetail component for each movie*/}
      {movies.map((movie) => (
          <MovieDetail key={movie.imdbID} movie={movie} />
      ))}
      </>
    );
  };
  
  export default MoviesPortal;