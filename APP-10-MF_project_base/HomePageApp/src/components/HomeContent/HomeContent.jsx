import React, { useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
import "./HomeContent.scss";

const MovieCard = React.lazy(() => import("components/MovieCard"));

const dummyItem = [{ name: "Dummy Movie" }];

const HomeContent = (props) => {
  const [movies, setMovies] = useState(dummyItem);

  useEffect(async () => {
    // Add the logic to load the movies from server and set to the state
    async function fetchMovies() {
      const response = await fetch("http://localhost:5555/movies");
      const data = await response.json();
      setMovies(data);
      console.log(data);
    }
    fetchMovies();
  }, []);

  const movieClicked = (item) => {
    if (typeof props.movieClicked === "function") {
      props.movieClicked(item);
    }
  };

  const renderMovieList = () => {
    
    return movies.map((item) => {
      return (
        <div onClick={() => movieClicked(item)} key={item.name}>
          <MovieCard title={item.name} imageUrl={item.imageUrl} />
        </div>
      );
    });
  };

  return (
    <div className="home-content-container">
      <QuickBooking />
      <div className="movies-container">
        <React.Suspense fallback={<div>Loading...</div>}>
          {renderMovieList()}
        </React.Suspense>
      </div>
    </div>
  );
};

export default HomeContent;
