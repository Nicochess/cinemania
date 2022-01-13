import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Recommend = () => {
  const [results, setResults] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [index, setIndex] = useState(1);

  const fetchRecommend = async (index = 1) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_KEY}&language=pt-BR&page=${index}`
    );
    const data = await res.json();

    if (data.total_results === results.length) {
      setShowButton(false);
    }
    return data;
  };

  useEffect(() => {
    const getUpcoming = async () => {
      const data = await fetchRecommend();
      setResults(data.results);
    };

    getUpcoming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = async () => {
    setIndex((prev) => prev + 1);

    const data = await fetchRecommend(index + 1);
    setResults((prev) => [...prev, ...data.results]);
  };

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">Lançamentos Recentes</h1>
      </div>
      {results.length > 0 && (
        <>
          <div className="movie-grid">
            {results.map((movie) => {
              return <Card movie={movie} key={movie.id} />;
            })}
          </div>
          {showButton && (
            <button className="btn btn-load" onClick={loadMore}>
              Ver Mais
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Recommend;
