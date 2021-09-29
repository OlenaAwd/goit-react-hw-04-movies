import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Spinner from "./components/Spinner/Spinner";
import css from "./App.module.css";

const HomePage = lazy(() => import("./views/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./views/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./views/MovieDetailsPage/MovieDetailsPage")
);
const Error = lazy(() => import("./views/Error/Error"));

export default function App() {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={Error} />
        </Switch>
      </Suspense>
    </div>
  );
}
