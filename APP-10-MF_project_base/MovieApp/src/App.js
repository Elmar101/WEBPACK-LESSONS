import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import BookPage from "./components/BookPage/BookPage.jsx";
const HomePage = React.lazy(() => import("homepage/HomePage"));
const DetailsPage = React.lazy(() => import("detailspage/DetailsPage"));
const SeatSelectionPage = React.lazy(() =>
  import("seatselection/SeatSelection")
);

const App = () => {
  return (
    <Switch>
      <Route path="/details">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DetailsPage />
        </React.Suspense>
      </Route>
      <Route path="/book">
        <React.Suspense fallback={<div>Loading...</div>}>
          <SeatSelectionPage />
        </React.Suspense>
      </Route>
      <Route path="/">
        <React.Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </React.Suspense>
      </Route>
    </Switch>
  );
};

export default App;
