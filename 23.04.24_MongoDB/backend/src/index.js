import express from "express";
import morgan from "morgan";
import { body, validationResult } from "express-validator";
import cors from "cors";
import { Movies } from "./models/movies.js";
import { connectToDatabase } from "./models/connectDb.js";
import { Favorites } from "./models/favorites.js";
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

// Movies
app.get("/api/v1/movies", (_, res) => {
  Movies.find({})
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not find all movies" });
    });
});

app.get("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  Movies.findById(movieId)
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "Could not find movie with the id:", movieId });
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
    Movies.create(movieInfo)
      .then((addedMovie) => res.json(addedMovie || {}))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err, message: "Couldnt add new movie" });
      });
  }
);

// Favorites
app.get("/api/v1/favorites", (_, res) => {
  Favorites.find({})
    .then((favorites) => res.json(favorites))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not find all favorites" });
    });
});

app.post("/api/v1/movies/:movieId/favorite", (req, res) => {
  const newFavorite = {
    movieId: req.params.movieId,
  };
  Favorites.create(newFavorite).then((addedFav) => {
    if (addedFav) {
      res.json(addedFav);
    } else {
      res.status(500).json({ message: "Could not add new favorite" });
    }
  });
});

app.delete("/api/v1/favorites/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  Favorites.findOneAndDelete({ movieId: movieId })
    .then((deletedFav) => res.json(deletedFav || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Couldnt delete Favorite" });
    });
});

connectToDatabase()
  .then(() => {
    const PORT = 3003;

    app.listen(PORT, () => console.log("Server listening at Port: ", PORT));
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// 6627be42b7cf5cf082a06815
