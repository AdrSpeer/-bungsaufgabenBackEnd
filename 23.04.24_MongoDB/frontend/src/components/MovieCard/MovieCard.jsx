import "./MovieCard.css";
import { useContext, useEffect } from "react";
import { allMoviesContext } from "../../context/Context";
import { Link } from "react-router-dom";
const MovieCard = () => {
  const { allMovies, setAllMovies } = useContext(allMoviesContext);
  console.log(allMovies);
  return (
    <section className="allmovies-wrapper">
      <h2>All Movies </h2>
      <div className="allmovies">
        {allMovies?.map((movie) => (
          <Link key={movie._id} to={"/details/" + movie._id}>
            <div>
              <img
                src={movie.poster?.replace("http://", "https://")}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = "/img/no-img.jpg";
                }}
              />
              <h6>{movie.title}</h6>
              <p>{movie.director}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieCard;
