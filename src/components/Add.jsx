import React, { useState } from "react";

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

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              onChange={handleChange}
              value={query}
            />
          </div>

          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => {
                return <li>{movie.title}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
