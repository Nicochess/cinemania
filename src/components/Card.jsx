import React from "react";

const Card = ({ title, poster_path }) => {
  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={title}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>
    </div>
  );
};

export default Card;
