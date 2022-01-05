import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(1);
  const [showButton, setShowButton] = useState(true);

  const fetchTopRate = async (index = 1) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=pt-BR&page=${index}`
    );
    const data = await res.json();

    if (data.total_results === results.length) {
      setShowButton(false);
    }
    return data;
  };

  const fetchQuery = async (query, index = 1) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=pt-BR&page=${index}&include_adult=false&query=${query}`
    );
    const data = await res.json();

    data.total_results <= results.length
      ? setShowButton(false)
      : setShowButton(true);

    return data;
  };

  useEffect(() => {
    const getTopRate = async () => {
      const data = await fetchTopRate();
      if (data) {
        setResults(data.results);
      } else {
        setResults([]);
        setIndex(1);
      }
    };

    getTopRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    if (e.target.value.length !== 0) {
      const data = await fetchQuery(e.target.value);
      setResults(data.results);
    } else {
      const data = await fetchTopRate();
      setResults(data.results);
    }
  };

  const loadMore = async () => {
    setIndex((prev) => {
      return prev + 1;
    });

    if (!query) {
      const data = await fetchTopRate(index + 1);
      data ? setResults((prev) => [...prev, ...data.results]) : setIndex(1);
    } else {
      const data = await fetchQuery(query, index + 1);
      data ? setResults((prev) => [...prev, ...data.results]) : setIndex(1);
    }
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
              {showButton && (
                <button className="btn" onClick={loadMore}>
                  Ver Mais
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
