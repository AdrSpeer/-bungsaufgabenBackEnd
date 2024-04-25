import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import {
  FavoriteMovies,
  FavoritesContext,
  allMoviesContext,
} from "./context/Context";
import DetailPage from "./pages/DetailPage/DetailPage";
import { backendUrl } from "./api/api";
import AddMovie from "./pages/AddMovie/AddMovie";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // Fetch all movies
  useEffect(() => {
    fetch(`${backendUrl}/api/v1/movies`)
      .then((res) => res.json())
      .then((data) => setAllMovies(data))
      .catch((err) => console.log("Failed to fetch", err));
  }, [allMovies._id]);
  // Fetch Favorites
  useEffect(() => {
    fetch(`${backendUrl}/api/v1/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.log("Failed to fetch Favorites", err));
  }, [favorites._id]);

  return (
    <>
      <allMoviesContext.Provider value={{ allMovies, setAllMovies }}>
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
          <FavoriteMovies.Provider
            value={{ favoriteMovies, setFavoriteMovies }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:movieId" element={<DetailPage />} />
                <Route path="/addmovie" element={<AddMovie />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </BrowserRouter>
          </FavoriteMovies.Provider>
        </FavoritesContext.Provider>
      </allMoviesContext.Provider>
    </>
  );
}

export default App;
