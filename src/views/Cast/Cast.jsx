import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMovieCredits } from "../../services/API";
import css from "./Cast.module.css";

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId)
      .then((response) => response.cast)
      .then(setCast);
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={css.list}>
          {cast.map((actor) => {
            return (
              <li key={actor.id}>
                <div>
                  <img
                    className={css.actorImg}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                    }
                    alt={actor.original_name}
                  />
                </div>
                <p className={css.actorName}>{actor.original_name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

MovieCast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
