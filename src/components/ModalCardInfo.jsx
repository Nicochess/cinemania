import { Close, PlaylistAdd, Visibility } from "@material-ui/icons";
import GlobalContext from "../context/GlobalState";
import { useContext } from "react";

const ModalCardInfo = ({ movie, setShowModal }) => {
  const { addToWatched, addToWatchlist, watchlist, watched } = useContext(GlobalContext);

  let storedMovie = watchlist.find((item) => item.id === movie.id);

  let storedMovieWatched = watched.find((item) => item.id === movie.id);

  const watchListDisable = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisable = storedMovieWatched ? true : false;

  return (
    <article className="modal-info">
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
      />
      <section className="modal-content">
        <h1>{movie.title}</h1>

        <p>{movie.overview}</p>
        <button className="btn btn-close" onClick={() => setShowModal(false)}>
          <Close />
        </button>
        <div className="actions">
          <button
            className="btn"
            disabled={watchListDisable}
            onClick={() => addToWatchlist(movie)}
          >
            <PlaylistAdd /> Minha lista
          </button>
          <button
            className="btn"
            disabled={watchedDisable}
            onClick={() => addToWatched(movie)}
          >
            <Visibility /> Assistidos
          </button>
        </div>
      </section>
    </article>
  );
};

export default ModalCardInfo;
