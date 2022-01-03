import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthProvider";

// initial state
const globalState = {
  watchlist: localStorage.getItem("watchlist") || [],
  watched: localStorage.getItem("watched") || [],
  addToWatchlist: (movie) => {},
  removeToWatchlist: (id) => {},
  addToWatched: (movie) => {},
  removeToWatched: (id) => {},
  moveToWatchlist: (movie) => {},
  setWatchlist: (data) => {},
};

//creating context
const GlobalContext = createContext(globalState);

//provider components
export const GlobalProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const { setDocs, updateDocs, updateWatched } = useContext(AuthContext);

  const addToWatchlist = (movie) => {
    setWatchlist((prevMovies) => {
      const newState = [...prevMovies, movie];
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

  const addToWatched = (movie) => {
    removeToWatchlist(movie.id);
    setWatched((prevMovies) => {
      const newState = [...prevMovies, movie];
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
        setWatchlist(data.watchlist);
        setWatched(data.watched);
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
