import { useContext } from "react";
import MovieCard from "../components/MovieCard";
import GlobalContext from "../context/GlobalState";

const WatchList = () => {
  const { watchlist } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">Ainda tenho que assistir</h1>
        <span className="count-pill">
          {watchlist.length} {watchlist.length === 1 ? "Filme" : "Filmes"}
        </span>
      </div>
      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((item) => (
            <MovieCard movie={item} type="watchlist" key={item.id} />
          ))}
        </div>
      ) : (
        <h4 className="no-movies">Adicione algum filme</h4>
      )}
    </div>
  );
};

export default WatchList;
