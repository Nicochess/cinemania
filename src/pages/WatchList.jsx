import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";
import MovieCard from "../components/MovieCard";

const WatchList = () => {
  const globalContext = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Ainda tenho que assistir</h1>
          <span className="count-pill">
            {globalContext.watchlist.length} {globalContext.watchlist.length === 1 ? "Filme" : "Filmes"}
          </span>
        </div>
        {globalContext.watchlist.length > 0 ? (
          <div className="movie-grid">
            {globalContext.watchlist.map((item) => {
              return <MovieCard movie={item} type="watchlist" key={item.id} />;
            })}
          </div>
        ) : (
          <h4 className="no-movies">Adicione algum filme</h4>
        )}
      </div>
    </div>
  );
};

export default WatchList;
