import { useState, useEffect } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { FaFilm } from "react-icons/fa";
import { fetchTrending } from "../../services/API";
import css from "./HomePage.module.css";

export default function HomePage() {
  window.document.title = "Movies";

  const { url } = useRouteMatch();
  const location = useLocation();
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    fetchTrending()
      .then((response) => response.results)
      .then(setPopularMovies);
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {popularMovies && (
        <ul className={css.list}>
          {popularMovies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}movies/${movie.id}`,
                  state: { from: location },
                }}
                className={css.link}
              >
                <FaFilm size={16} className={css.icon} /> {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
