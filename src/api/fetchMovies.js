export const fetchMovies = async (searchText, moviesCallback, errorCallback) => {
    try{
        const response = await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=80a6072d`)
        //parse the JSON response
        const data = await response.json();

        if (data.Response === 'True'){
            const movieDetailsPromises = data.Search.map((movie) => fetchMovieDetails(movie.imdbID, errorCallback));
            const movieDetails = await Promise.all(movieDetailsPromises);
            moviesCallback(movieDetails);    //pass data to moviesCallback
            errorCallback(null);    //clear any previous error messages
        } else{
            moviesCallback([]);     //if no movies found, pass an empty array to moviesCallback
            errorCallback(data.Error);      //pass error message to errorCallback
        }
    } catch (err){
        moviesCallback([]);
        errorCallback('Error while fetching data');
    }

};

const fetchMovieDetails = async (id, errorCallback) => {
    try{
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=80a6072d`)
        const data = await response.json();

        if (data.Response == 'True'){
            return data;
        } else{
            throw new Error(data.Error);
        }

    } catch (err){
        errorCallback('Error while fetching movie details')
    }
};