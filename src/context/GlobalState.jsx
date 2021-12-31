import { createContext, useEffect, useReducer } from "react";
import { AppReducer } from "./AppReducer";

// initial state
const globalState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
  addToWatchlist: (movie) => {},
  removeToWatchlist: (id) => {},
  addToWatched: (movie) => {},
  removeToWatched: (id) => {},
  moveToWatchlist: (movie) => {},
};

//creating context
const GlobalContext = createContext(globalState);

//provider components
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, globalState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const addToWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };

  const removeToWatchlist = (id) => {
    dispatch({ type: "REMOVE_TO_WATCHLIST", payload: id });
  };

  const addToWatched = (movie) => {
    removeToWatchlist(movie.id)
    dispatch({ type: "ADD_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie) => {
    removeToWatched(movie.id)
    addToWatchlist(movie)
  }

  const removeToWatched = (id) => {
    dispatch({type: 'REMOVE_TO_WATCHED', payload: id})
  }

  const context = {
    watchlist: state.watchlist,
    watched: state.watched,
    addToWatchlist,
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
