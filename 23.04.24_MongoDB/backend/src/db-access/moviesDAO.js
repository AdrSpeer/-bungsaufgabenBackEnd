import { ObjectId } from "mongodb";
import { getDb } from "./getDb.js";

function findAll() {
  return getDb().then((db) => db.collection("movieDetails").find().toArray());
}

function findById(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) =>
    db.collection("movieDetails").findOne({ _id: idAsObjectId })
  );
}
function findByName(name) {
  return getDb().then((db) =>
    db.collection("movieDetails").findAll({ title: name })
  );
}

function createOne(movieInfo) {
  return getDb().then((db) =>
    db
      .collection("movieDetails")
      .insertOne(movieInfo)
      .then((result) =>
        result.acknowledged ? { ...movieInfo, _id: result.insertedId } : null
      )
  );
}

export const moviesDAO = {
  findAll,
  findById,
  createOne,
  findByName,
};
