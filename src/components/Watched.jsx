import React, { useContext } from "react";
import GlobalContext from "../context/GlobalState";
import MovieCard from "./MovieCard";

const Watched = () => {
  const globalContext = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched Page</h1>
        </div>
        {globalContext.watched.length > 0 ? (
          <div className="movie-grid">
            {globalContext.watched.map((item) => {
              return <MovieCard movie={item} type="watched" key={item.id} />;
            })}
          </div>
        ) : (
          <h4>Adicione algum filme</h4>
        )}
      </div>
    </div>
  );
};

export default Watched;
