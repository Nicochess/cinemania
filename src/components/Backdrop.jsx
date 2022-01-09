import React from "react";

const Backdrop = ({ setShowModal }) => {
  return <div className="backdrop" onClick={() => setShowModal(false)}></div>;
};

export default Backdrop;
