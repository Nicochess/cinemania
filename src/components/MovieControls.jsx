import {
  PlaylistAdd,
  Visibility,
  Close,
  VisibilityOff,
} from "@material-ui/icons";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";

const MovieControls = ({ movie, type }) => {
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
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => globalContext.addToWatched(movie)}
          >
            <Visibility fontSize="medium" />
          </button>

          <button
            className="ctrl-btn"
            onClick={() => globalContext.removeToWatchlist(movie.id)}
          >
            <Close fontSize="medium" />
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => globalContext.moveToWatchlist(movie)}
          >
            <VisibilityOff fontSize="medium" />
          </button>
          <button
            className="ctrl-btn"
            onClick={() => globalContext.removeToWatched(movie.id)}
          >
            <Close fontSize="medium" />
          </button>
        </>
      )}

      {type === "add" && (
        <>
          <button
            className="ctrl-btn"
            disabled={watchListDisable}
            onClick={() => globalContext.addToWatchlist(movie)}
          >
            <PlaylistAdd fontSize="medium" />
          </button>

          <button
            className="ctrl-btn"
            disabled={watchedDisable}
            onClick={() => globalContext.addToWatched(movie)}
          >
            <Visibility fontSize="medium" />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieControls;
