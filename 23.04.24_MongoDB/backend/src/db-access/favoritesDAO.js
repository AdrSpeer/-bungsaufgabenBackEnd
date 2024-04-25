import { ObjectId } from "mongodb";
import { getDb } from "./getDb.js";

function findAllFavorites() {
  return getDb().then((db) => db.collection("favorites").find().toArray());
}

function createOneFavorite(movieInfo) {
  return getDb().then((db) =>
    db
      .collection("favorites")
      .insertOne(movieInfo)
      .then((result) =>
        result.acknowledged ? { ...movieInfo, _id: result.insertedId } : null
      )
  );
}

function deleteFavorite(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) =>
    db.collection("favorites").findOneAndDelete({ movieId: idAsObjectId })
  );
}

export const favoritesDAO = {
  findAllFavorites,
  createOneFavorite,
  deleteFavorite,
};
