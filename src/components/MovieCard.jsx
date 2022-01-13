import { MenuBook, Visibility } from "@material-ui/icons";
import React, { useState } from "react";
import Backdrop from "./Backdrop";
import ModalCardInfo from "./ModalCardInfo";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <article className="movie-card">
      <div className="overlay"></div>

      <img
        className={type === "watched" ? "img-watched" : "img-watchlist"}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="controls">
        <button className="btn btn-modal" onClick={() => setShowModal(true)}>
          <MenuBook fontSize="small" />
        </button>
      </div>

      <MovieControls movie={movie} type={type} />
      {type === "watched" && (
        <span className="watched">
          <Visibility /> {movie && movie.watchedDate}
        </span>
      )}
      {showModal && <Backdrop setShowModal={setShowModal} />}
      {showModal && <ModalCardInfo setShowModal={setShowModal} movie={movie} />}
    </article>
  );
};

export default MovieCard;
