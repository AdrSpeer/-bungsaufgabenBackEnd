import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    director: { type: String, required: true },
    genres: { type: Array, required: true },
    poster: { type: String, required: true },
    plot: { type: String, required: true },
  },
  { collection: "movieDetails" }
);

export const Movies = mongoose.model("Movies", movieSchema);
