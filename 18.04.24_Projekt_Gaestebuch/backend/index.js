import express from "express";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { readBook, writeEntrys } from "./filesystem.js";
// Server
const app = express();
// Für den Fehler: Access to fetch at ... from origin
app.use(cors());
// Middleware um den Endpunkt in der Konsole auszugeben
app.use((req, _, next) => {
  console.log("new request:", req.method, req.url);
  next();
});
// Middleware um den Body zu parsen
app.use(express.json());

// Endpunkt um alle Einträge zu bekommen
app.get("/api/v1/guestbook", (req, res) => {
  readBook()
    .then((guestbook) => res.status(200).json(guestbook))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read the Guestbook" })
    );
});

// Endpunkt zum Hinzufügen von Einträgen
app.post(
  "/api/v1/guestbook",
  body("firstName").isString().notEmpty(),
  body("lastName").isString().notEmpty(),
  body("email").isEmail(),
  body("message").isString().notEmpty(),
  (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Data not valid", erros: validationError.array() });
    }
    const newEntry = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: Date.now(),
      timestamp: Date.now(),
      email: req.body.email,
      message: req.body.message,
    };
    readBook()
      .then((entrys) => [...entrys, newEntry])
      .then((entrysAdd) => writeEntrys(entrysAdd))
      .then((entrysAdd) => res.status(200).json(entrysAdd))
      .catch((err) =>
        res.status(500).json({ err, message: "Could not add new entry" })
      );
  }
);

// Endpunkt nicht gefunden (FALLBACK Middleware)
app.use((_, res) => {
  res.status(404).json({ error: "Route not found" });
});
// Port
const PORT = 3003;

// App Listener mit Ausgabe auf welchem Port
app.listen(PORT, () => console.log("Server is ready at Port:", PORT));
