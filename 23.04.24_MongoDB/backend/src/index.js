import express from "express";
import morgan from "morgan";
import { body, validationResult } from "express-validator";
import { moviesDAO } from "./db-access/moviesDAO.js";
import { favoritesDAO } from "./db-access/favoritesDAO.js";
import cors from "cors";
import { ObjectId } from "mongodb";
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

// Movies
app.get("/api/v1/movies", (_, res) => {
  moviesDAO
    .findAll()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not find all movies" });
    });
});

app.get("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  moviesDAO
    .findById(movieId)
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "Could not find movie with the id:", movieId });
    });
});
app.get("/api/v1/moviesearch/:movieName", (req, res) => {
  const movieName = req.params.movieName.toLowerCase();
  moviesDAO
    .findByName(movieName)
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not find movie with Move:" });
    });
});

app.post(
  "/api/v1/movies",
  body("title").isString().notEmpty(),
  body("year").isInt({ min: 0 }),
  body("director").isString().notEmpty(),
  body("genres").isArray().notEmpty(),
  body("rate").isInt({ min: 0 }),
  body("poster").isString().notEmpty(),
  body("plot").isString().notEmpty(),
  (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Data not valid", validationError });
    }
    const movieInfo = {
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      genres: req.body.genres,
      rate: req.body.rate,
      poster: req.body.poster,
      plot: req.body.plot,
    };
    moviesDAO
      .createOne(movieInfo)
      .then((addedMovie) => res.json(addedMovie || {}))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err, message: "Couldnt add new movie" });
      });
  }
);

// Favorites
app.get("/api/v1/favorites", (_, res) => {
  favoritesDAO
    .findAllFavorites()
    .then((favorites) => res.json(favorites))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not find all favorites" });
    });
});

app.post("/api/v1/movies/:movieId/favorite", (req, res) => {
  const newFavorite = {
    movieId: ObjectId.createFromHexString(req.params.movieId),
  };
  favoritesDAO.createOneFavorite(newFavorite).then((addedFav) => {
    if (addedFav) {
      res.json(addedFav);
    } else {
      res.status(500).json({ message: "Could not add new favorite" });
    }
  });
});

app.delete("/api/v1/favorites/:movieId", (req, res) => {
  favoritesDAO
    .deleteFavorite(req.params.movieId)
    .then((deletedFav) => res.json(deletedFav || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Couldnt delete Favorite" });
    });
});

const PORT = 3003;

app.listen(PORT, () => console.log("Server listening at Port: ", PORT));

// 6627be42b7cf5cf082a06815
