import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMovieReviews } from "../../services/API";
import css from "./Reviews.module.css";

export default function Reviews({ movieId }) {
  const [noReviews, setNoReviews] = useState(false);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then((response) => {
        if (response.results.length === 0) {
          setNoReviews(true);
        } else return response.results;
      })
      .then(setReviews);
  }, [movieId]);

  return (
    <>
      {noReviews && <p>We do not have any reviews for this movie</p>}

      {reviews && (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <p className={css.author}>{review.author}</p>
                <p className={css.content}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
