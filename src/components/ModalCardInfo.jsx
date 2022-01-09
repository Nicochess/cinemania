import React from "react";

const ModalCardInfo = ({ movie }) => {
    console.log(movie)
  return (
    <div className="modal-info">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};

export default ModalCardInfo;
