import "./DetailPage.css";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../context/Context";
import Footer from "../../components/Footer/Footer";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState();
  useEffect(() => {
    fetch(`${backendUrl}/api/v1/movies/${movieId}`)
      .then((res) => res.json())
      .then((movie) => setMovieDetails(movie))
      .catch((err) => console.log("Failed to fetch", err));
  }, [movieId]);

  useEffect(() => {
    const favMatch = favorites.find((movie) => movie.movieId === movieId);
    if (favMatch) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);

  const addToFavorites = () => {
    console.log(movieId);

    fetch(`${backendUrl}/api/v1/movies/${movieId}/favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movieId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setIsFavorite(true);
      })
      .catch((err) => console.log("Failed to fetch", err));
  };
  const removeFromFavorites = () => {
    fetch(`${backendUrl}/api/v1/favorites/${movieId}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setIsFavorite(false);
        }
      })
      .catch((err) => console.log("Failed to fetch", err));
  };
  console.log(favorites);
  return (
    <section className="detailpage">
      <Header />
      <div className="detail-headline">
        <h1>{movieDetails.title}</h1>
        <p>
          {movieDetails.year} | {movieDetails.director}
        </p>
      </div>
      <div className="content-wrapper">
        <div className="detail-img">
          {isFavorite ? (
            <button onClick={removeFromFavorites}>Remove from Favorites</button>
          ) : (
            <button onClick={addToFavorites}>Add to Favorites</button>
          )}
          <img
            src={movieDetails.poster?.replace("http://", "https://")}
            alt={movieDetails.title}
            onError={(e) => {
              e.target.src = "/img/no-img.jpg";
            }}
          />
        </div>

        <div className="details-story">
          <div className="details-genre">
            {movieDetails?.genres?.map((genre) => (
              <p key={genre}>{genre}</p>
            ))}
          </div>
          <h2>Story</h2>
          <p className="plot">{movieDetails.plot}</p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default DetailPage;
