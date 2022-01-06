import React from "react";

const SelectFilter = ({ genres, selectChange }) => {
  return (
    <select onChange={selectChange} className="add-field">
      <option value="all">Todos</option>;
      {genres.map(({ id, name }) => {
        return (
          <option value={id} key={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectFilter;
