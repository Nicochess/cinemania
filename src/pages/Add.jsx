import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(1);

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
      setIndex(1);
    }
  };

  const loadMore = async () => {
    setIndex((prev) => {
      return prev + 1;
    });

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_KEY
      }&language=pt-BR&page=${index + 1}&include_adult=false&query=${query}`
    );
    const data = await res.json();
    setResults((prev) => {
      return [...prev, ...data.results];
    });
  };

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
            <>
              <ul className="results">
                {results.map((movie) => {
                  return (
                    <li key={movie.id}>
                      <Card movie={movie} />
                    </li>
                  );
                })}
              </ul>
              <button className="btn" onClick={loadMore}>
                Ver Mais
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
