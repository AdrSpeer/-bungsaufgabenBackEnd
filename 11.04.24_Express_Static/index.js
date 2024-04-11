import express from "express";
import url from "url";
import path from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

app.use((req, res, next) => {
  console.log("new request:", req.method, req.url);
  next();
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/home.html");
});

const PORT = 3003;
app.listen(PORT, console.log("Server ready at:", PORT));
