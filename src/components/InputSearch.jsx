import React from "react";

const InputSearch = ({ query, handleChange }) => {
  return (
    <input
      type="text"
      className="add-field"
      placeholder="Busque por um filme! :D"
      onChange={handleChange}
      value={query}
    />
  );
};

export default InputSearch;
