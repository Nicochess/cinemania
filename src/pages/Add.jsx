import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import InputSearch from "../components/InputSearch";
import SelectFilter from "../components/SelectFilter";

const Add = () => {
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [choosedGenre, setChoosedGenre] = useState("all");
  const [index, setIndex] = useState(1);
  const [showButton, setShowButton] = useState(true);

  const [genreFiltering, setGenreFiltering] = useState(false);
  const [searching, setSearching] = useState(true);

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

  const fetchDiscover = async (genre, index = 1) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_KEY}&language=pt-BR&with_genres=${genre}&page=${index}`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_KEY}&language=pt-BR`
      );
      const data = await res.json();
      setGenres(data.genres);
    };
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
    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectChange = async (e) => {
    if (e.target.value !== "all") {
      setChoosedGenre(e.target.value);
      const data = await fetchDiscover(e.target.value);
      setResults(data.results);
    } else {
      const data = await fetchTopRate();
      setResults(data.results);
    }
  };

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
    setIndex((prev) => prev + 1);

    if (genreFiltering) {
      const data = await fetchDiscover(choosedGenre, index + 1);
      data ? setResults((prev) => [...prev, ...data.results]) : setIndex(1);
    } else {
      if (!query) {
        const data = await fetchTopRate(index + 1);
        data ? setResults((prev) => [...prev, ...data.results]) : setIndex(1);
      } else {
        const data = await fetchQuery(query, index + 1);
        data ? setResults((prev) => [...prev, ...data.results]) : setIndex(1);
      }
    }
  };

  const changeButtonState = () => {
    setGenreFiltering((prev) => !prev);
    setSearching((prev) => !prev);
  };

  return (
    <div className="add-page">
      <div className="add-content">
        <div className="input-wrapper">
          {searching && (
            <InputSearch query={query} handleChange={handleChange} />
          )}
          {genreFiltering && (
            <SelectFilter genres={genres} selectChange={selectChange} />
          )}
        </div>
        <div className="filters-wrapper">
          <button
            disabled={searching}
            className="btn"
            onClick={changeButtonState}
          >
            Fazer busca
          </button>
          <button
            disabled={genreFiltering}
            className="btn"
            onClick={changeButtonState}
          >
            Buscar por categoria
          </button>
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
              <button className="btn btn-load" onClick={loadMore}>
                Ver Mais
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Add;
