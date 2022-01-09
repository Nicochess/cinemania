import { Close } from "@material-ui/icons";
import React from "react";

const ModalCardInfo = ({ movie, setShowModal }) => {
  return (
    <article className="modal-info">
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
      />
      <section className="modal-content">
        <h1>{movie.title}</h1>

        <p>{movie.overview}</p>
        <button className='btn' onClick={() => setShowModal(false)}>
          <Close />
        </button>
      </section>
    </article>
  );
};

export default ModalCardInfo;
