import express from "express";
import { readToDo, writeToDo } from "./filesystem.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use((req, _, next) => {
  console.log("new request:", req.method, req.url);
  next();
});

app.use(express.json());

app.get("/api/v1/todos", (_, res) => {
  readToDo()
    .then((toDoes) => res.status(200).json(toDoes))
    .catch((err) => {
      res.status(500).json({ err, message: "Could not read the toDoes" });
    });
});

app.get("/api/v1/todos/:id", (req, res) => {
  const toDoID = req.params.id;
  readToDo()
    .then((todos) => todos.find((single) => single.id.toString() === toDoID))
    .then((foundItem) => res.status(200).json(foundItem))
    .catch((err) => {
      res.status(500).json({ err, message: "Could not read the ToDoes" });
    });
});

app.post("/api/v1/todos", (req, res) => {
  const toDoInfo = req.body;
  const newToDo = {
    id: Date.now(),
    status: toDoInfo.status,
    timestamp: Date.now(),
    description: toDoInfo.description,
  };
  readToDo()
    .then((toDo) => [...toDo, newToDo])
    .then((toDoUpdated) => writeToDo(toDoUpdated))
    .then((toDoUpdated) => res.status(200).json(toDoUpdated))
    .catch((err) => {
      res.status(500).json({ err, message: "Could not add new toDo" });
    });
});

app.patch("/api/v1/todos/:id", (req, res) => {
  const idToPatch = req.params.id;
  const updateInfo = req.body;

  readToDo()
    .then((toDoes) =>
      toDoes.map((item) => {
        if (item.id.toString() === idToPatch) {
          return {
            ...item,
            ...updateInfo,
          };
        } else {
          return item;
        }
      })
    )
    .then((items) => writeToDo(items))
    .then((items) => res.status(200).json(items))
    .catch((err) => {
      res.status(500).json({ err, message: "Could not change ToDoes" });
    });
});

app.delete("/api/v1/todos/:id", (req, res) => {
  const idToDelete = req.params.id;

  readToDo()
    .then((toDoes) =>
      toDoes.filter((item) => item.id.toString() !== idToDelete)
    )
    .then((newArr) => writeToDo(newArr))
    .then((newArr) => res.status(200).json(newArr))
    .catch((err) => res.status(500).json({ err, message: "failed to delete" }));
});

const PORT = 3003;
app.listen(PORT, console.log("Servery is ready at port:", PORT));
