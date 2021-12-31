import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";
import MovieCard from "./MovieCard";

const WatchList = () => {
  const globalContext = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">WatchList Page</h1>
        </div>
        {globalContext.watchlist.length > 0 ? (
          <div className="movie-grid">
            {globalContext.watchlist.map((item) => {
              return <MovieCard movie={item} type="watchlist" key={item.id} />;
            })}
          </div>
        ) : (
          <h4>Adicione algum filme</h4>
        )}
      </div>
    </div>
  );
};

export default WatchList;
