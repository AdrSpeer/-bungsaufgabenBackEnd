import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Favorites.css";
import {
  FavoriteMovies,
  FavoritesContext,
  allMoviesContext,
} from "../../context/Context";
import { backendUrl } from "../../api/api";
import Footer from "../../components/Footer/Footer";
const Favorites = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { allMovies, setAllMovies } = useContext(allMoviesContext);
  const { favoriteMovies, setFavoriteMovies } = useContext(FavoriteMovies);

  const removeFromFavorites = (movieIdToRemove) => {
    const updatedFavorites = favorites?.filter(
      (fav) => fav.movieId !== movieIdToRemove
    );
    fetch(`${backendUrl}/api/v1/favorites/${movieIdToRemove}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setFavoriteMovies(updatedFavorites);
        }
      })
      .catch((err) => console.log("Failed to fetch", err));
  };
  useEffect(() => {
    if (favorites && Array.isArray(favorites) && allMovies) {
      const favoriteMoviesData = allMovies?.filter((movie) =>
        favorites.some((fav) => fav?.movieId === movie?._id)
      );
      setFavoriteMovies(favoriteMoviesData);
    }
  }, [favorites, allMovies]);
  console.log(favoriteMovies);
  return (
    <section className="fav-wrapper">
      <Header />
      <div className="fav">
        <h1>My favorites</h1>
        <div className="fav-col">
          {favoriteMovies?.length > 0 && (
            <>
              {favoriteMovies.map((movie) => (
                <div key={movie?._id}>
                  <img
                    src={movie?.poster?.replace("http://", "https://")}
                    alt={movie?.title}
                    onError={(e) => {
                      e.target.src = "/img/no-img.jpg";
                    }}
                  />
                  <h2>{movie?.title}</h2>
                  <p>{movie?.director}</p>
                  <button onClick={() => removeFromFavorites(movie._id)}>
                    Remove from Favorites
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Favorites;
