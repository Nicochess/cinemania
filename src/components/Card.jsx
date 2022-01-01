import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";

const Card = ({ movie }) => {
  const globalContext = useContext(GlobalContext);

  let storedMovie = globalContext.watchlist.find(
    (item) => item.id === movie.id
  );

  let storedMovieWatched = globalContext.watched.find(
    (item) => item.id === movie.id
  );

  const watchListDisable = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisable = storedMovieWatched ? true : false;

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>
      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </h4>
        </div>
        <div className="controls">
          <button
            className="btn"
            disabled={watchListDisable}
            onClick={() => globalContext.addToWatchlist(movie)}
          >
            Quero assistir
          </button>

          <button
            className="btn"
            disabled={watchedDisable}
            onClick={() => globalContext.addToWatched(movie)}
          >
            Já assisti
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
