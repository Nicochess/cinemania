import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Card from "../components/Card";

const Recommend = () => {
  const { getWatchedIdFirebase } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [index, setIndex] = useState(1);
  const [startSlice, setStartSlice] = useState(0);

  const fetchRecommend = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_KEY}&language=pt-BR`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getRecommendation = async () => {
      const moviesId = await getWatchedIdFirebase();

      if (moviesId.length === 0) {
        setResults([]);
      } else {
        const fetchControl = index * 2;
        setStartSlice(fetchControl);

        moviesId.slice(startSlice, fetchControl).map(async (id) => {
          const data = await fetchRecommend(id);
          setResults((prev) => [...prev, ...data.results]);
        });

        if (moviesId.length <= fetchControl) {
          setShowButton(false);
        }
      }
    };

    getRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const loadMore = async () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">Recomendados para você</h1>
      </div>
      {results.length > 0 ? (
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
      ) : (
        <h4 className="no-movies">
          Você deve assistir algum filme para te conhecermos melhor :D
        </h4>
      )}
    </div>
  );
};

export default Recommend;
