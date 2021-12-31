export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "ADD_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    case "REMOVE_TO_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};
