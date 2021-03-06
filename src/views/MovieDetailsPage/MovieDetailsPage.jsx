import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { fetchMovie } from "../../services/API";
import Spinner from "../../components/Spinner/Spinner";
import css from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast/Cast" /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /* webpackChunkName: "MovieReviews" */)
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchMovie(movieId).then(setMovie);
  }, [movieId]);

  if (movie) {
    window.document.title = movie.title;
  }

  const clickBtn = () => {
    history.push(location.state?.from ? location.state.from : "/");
  };
  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={clickBtn} className={css.btnHome}>
            <FaRegArrowAltCircleLeft size={14} /> Go back
          </button>
          <div className={css.movieBox}>
            <div>
              <img
                lazy
                className={css.movieImg}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div>
              <h2 className={css.title}>
                {movie.title} ({movie.release_date.split("-")[0]})
              </h2>

              <p className={css.vote}>User score: {movie.vote_average * 10}%</p>

              <h3 className={css.overviewTitle}>Overview</h3>
              <p className={css.overview}>{movie.overview}</p>

              <h3 className={css.genresTitle}>Genres</h3>
              <p className={css.genres}>
                {movie.genres.map((gen) => {
                  return `${gen.name} `;
                })}
              </p>
            </div>
          </div>
        </>
      )}
      <p className={css.information}>Additional information</p>

      <ul className={css.list}>
        <li>
          <NavLink
            to={`${url}/Cast`}
            className={css.link}
            activeClassName={css.active}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/Reviews`}
            className={css.link}
            activeClassName={css.active}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Spinner />}>
        <Route path={`${path}/Cast`}>
          <Cast movieId={movieId} />
        </Route>

        <Route path={`${path}/Reviews`}>
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
}
