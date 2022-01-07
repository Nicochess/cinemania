import { MenuBook } from "@material-ui/icons";
import MovieControls from "./MovieControls";

const Card = ({ movie }) => {
  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="filler-poster" />
        )}
        <MovieControls movie={movie} type="add" />
      </div>
      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </h4>
        </div>
        <div className="controls">
          <button className="btn btn-modal">
            <MenuBook fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
