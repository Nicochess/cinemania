import { MenuBook } from "@material-ui/icons";
import { useState } from "react";
import Backdrop from "./Backdrop";
import ModalCardInfo from "./ModalCardInfo";
import MovieControls from "./MovieControls";

const Card = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  showModal
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "scroll");

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="filler-poster" />
        )}
        <MovieControls movie={movie} type="add" />
      </div>
      <div className="info">
        <div className="info-header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </h4>
        </div>
        <div className="controls">
          <button className="btn btn-modal" onClick={() => setShowModal(true)}>
            <MenuBook fontSize="small" />
          </button>
        </div>
      </div>
      {showModal && <Backdrop setShowModal={setShowModal} />}
      {showModal && <ModalCardInfo setShowModal={setShowModal} movie={movie} />}
    </div>
  );
};

export default Card;
