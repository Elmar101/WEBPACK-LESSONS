import React from "react";
import "./App.scss";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import BookPage from "./components/BookPage/BookPage.jsx";
const HomePage = React.lazy(() => import("homepage/HomePage"));
const DetailsPage = React.lazy(() => import("detailspage/DetailsPage"));
const SeatSelectionPage = React.lazy(() =>
  import("seatselection/SeatSelection")
);

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const movieClicked = (movie) => {
    history.push(`/details/${movie.id}`);
  };

  return (
    <Switch>
      <Route path="/details/:movieId">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DetailsPage routing={{ history, location }} location={location} />
        </React.Suspense>
      </Route>
      <Route path="/book">
        <React.Suspense fallback={<div>Loading...</div>}>
          <SeatSelectionPage />
        </React.Suspense>
      </Route>
      <Route path="/">
        <React.Suspense fallback={<div>Loading...</div>}>
          <HomePage
            movieClicked={movieClicked}
            routing={{ history, location }}
          />
        </React.Suspense>
      </Route>
    </Switch>
  );
};

export default App;
