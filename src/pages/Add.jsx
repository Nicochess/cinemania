import React, { useState } from "react";
import Card from "../components/Card";

const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=pt-BR&page=1&include_adult=false&query=${e.target.value}`
    );
    const data = await res.json();

    if (!data.errors) {
      setResults(data.results);
    } else {
      setResults([]);
    }
  };
  
  const [index, setIndex] = useState(1)
  const initialState = results.slice(0, index * 10)
  const [list, setList] = useState(initialState)


  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Busque por um filme! :D"
              onChange={handleChange}
              value={query}
            />
          </div>

          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => {
                return (
                  <li key={movie.id}>
                    <Card movie={movie} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
