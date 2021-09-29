import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import css from "./MoviesList.module.css";

export default function MoviesList({ url, movies }) {
  const location = useLocation();

  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <Link
              to={{
                pathname: `${url}/${movie.id}`,
                state: { from: { ...location } },
              }}
              className={css.link}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

MoviesList.propTypes = {
  url: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};
