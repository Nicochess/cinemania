import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthProvider";

const GlobalContext = createContext({
  watchlist: localStorage.getItem("watchlist") || [],
  watched: localStorage.getItem("watched") || [],
  addToWatchlist: (movie) => {},
  removeToWatchlist: (id) => {},
  addToWatched: (movie) => {},
  removeToWatched: (id) => {},
  moveToWatchlist: (movie) => {},
  setWatchlist: (data) => {},
});


export const GlobalProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const { setDocs, updateDocs, updateWatched } = useContext(AuthContext);

  const addToWatchlist = (movie) => {
    setWatchlist((prevMovies) => {
      const newState = [movie, ...prevMovies];
      updateDocs(newState);
      return newState;
    });
  };

  const removeToWatchlist = (id) => {
    setWatchlist((prevMovies) => {
      const newState = prevMovies.filter((movies) => movies.id !== id);
      updateDocs(newState);
      return newState;
    });
  };

  const dateBuilder = () => {
    const date = new Date().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return date;
  };

  const addToWatched = (movie) => {
    removeToWatchlist(movie.id);
    setWatched((prevMovies) => {
      let watchedDate = dateBuilder();
      const newState = [{ ...movie, watchedDate }, ...prevMovies];
      updateWatched(newState);
      return newState;
    });
  };

  const moveToWatchlist = (movie) => {
    removeToWatched(movie.id);
    addToWatchlist(movie);
  };

  const removeToWatched = (id) => {
    setWatched((prevMovies) => {
      const newState = prevMovies.filter((movies) => movies.id !== id);
      updateWatched(newState);
      return newState;
    });
  };

  useEffect(() => {
    const getDocs = async () => {
      setDocs().then((data) => {
        if (data) {
          setWatchlist(data.watchlist);
          setWatched(data.watched);
        }
      });
    };

    getDocs();
  }, [setDocs]);

  const context = {
    watchlist: watchlist,
    watched: watched,
    addToWatchlist,
    setWatchlist,
    removeToWatchlist,
    addToWatched,
    removeToWatched,
    moveToWatchlist,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
