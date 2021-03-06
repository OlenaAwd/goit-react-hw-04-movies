import axios from "axios";

const API_KEY = "dbfc7d42567d2f9d036d21962dd7e4e7";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchMovies(url) {
  return axios.get(url).then((response) => {
    return response.data;
  });
}

export function fetchMovie(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

// https://developers.themoviedb.org/3/trending/get-trending - список самых популярных фильмов на сегодня для создания коллекции на главной странице.
export function fetchTrending() {
  return fetchMovies(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1&`
  );
}

// https://developers.themoviedb.org/3/search/search-movies - поиск кинофильма по ключевому слову на странице фильмов.
export function fetchMovieQuery(query) {
  return fetchMovies(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1&`
  );
}

// https://developers.themoviedb.org/3/movies/get-movie-details - запрос полной информации о фильме для страницы кинофильма.
export function fetchMovieInfo(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

// https://developers.themoviedb.org/3/movies/get-movie-credits - запрос информации о актёрском составе для страницы кинофильма.
export function fetchMovieCredits(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
}

// https://developers.themoviedb.org/3/movies/get-movie-reviews - запрос обзоров для страницы кинофильма.
export function fetchMovieReviews(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=1`
  );
}

export default fetchMovies;
