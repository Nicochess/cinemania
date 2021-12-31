import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";

const MovieControls = ({ movie, type }) => {
  const globalContext = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => globalContext.addToWatched(movie)}
          >
            <i className="fa-fw far fa-eye" />
          </button>

          <button
            className="ctrl-btn"
            onClick={() => globalContext.removeToWatchlist(movie.id)}
          >
            <i className="fa-fw fa fa-times" />
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => globalContext.moveToWatchlist(movie)}
          >
            <i className="fa-fw far fa-eye-slash"></i>
          </button>
          <button
            className="ctrl-btn"
            onClick={() => globalContext.removeToWatched(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default MovieControls;
