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
    const getUpcoming = async () => {
      const moviesId = await getWatchedIdFirebase();
      const fetchControl = index * 2;

      if (startSlice <= moviesId.length) {
        moviesId.slice(startSlice, fetchControl).map(async (id) => {
          const data = await fetchRecommend(id);
          setResults((prev) => [...prev, ...data.results]);
          setStartSlice(fetchControl);
        });
      } else {
        setShowButton(false);
      }
    };

    getUpcoming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const loadMore = async () => {
    setIndex((prev) => prev + 1);
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
