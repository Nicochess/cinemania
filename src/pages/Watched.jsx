import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";
import MovieCard from "../components/MovieCard";

const Watched = () => {
  const globalContext = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">Já assisti estes filmes</h1>
        <span className="count-pill">
          {globalContext.watched.length}{" "}
          {globalContext.watched.length === 1 ? "Filme" : "Filmes"}
        </span>
      </div>
      {globalContext.watched.length > 0 ? (
        <div className="movie-grid">
          {globalContext.watched.map((item) => (
            <MovieCard movie={item} type="watched" key={item.id} />
          ))}
        </div>
      ) : (
        <h4 className="no-movies">Assista alguns filmes antes :D</h4>
      )}
    </div>
  );
};

export default Watched;
