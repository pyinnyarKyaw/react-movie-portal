function MovieDetail({movie}) {
    return (
        <div className="row">
            <div className="col-md-2">
                <img src={movie.Poster} alt={movie.Title} width='100%'/>
            </div>
            <div className="col-md-10">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{movie.Title}</h4>
                        <h6 class="card-subtitle mb-2 text-muted">{movie.Released}</h6>
                        <p class="card-text">{movie.Plot}</p>
                        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" class="card-link">IMDB</a>
                        <a href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`} target="_blank" class="card-link">Trailer</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;