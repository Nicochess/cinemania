import React from "react";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>

      <img
      className={type=== 'watched' ? 'img-watched' : 'img-watchlist'}
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />

      <MovieControls movie={movie} type={type} />
      {type === "watched" && (
        <span className="watched">
          <i className="fa-fw far fa-eye" /> {movie && movie.watchedDate}
        </span>
      )}
    </div>
  );
};

export default MovieCard;
