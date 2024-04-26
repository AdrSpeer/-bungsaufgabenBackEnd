import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    movieId: { type: mongoose.Types.ObjectId, ref: "Movies", required: true },
  },
  { collection: "favorites" }
);

export const Favorites = mongoose.model("Favorites", favoriteSchema);
