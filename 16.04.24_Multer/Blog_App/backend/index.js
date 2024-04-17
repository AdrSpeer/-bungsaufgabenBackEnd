import express from "express";
import { body, validationResult, param } from "express-validator";
import multer from "multer";
import cors from "cors";
import { readBlog, writeBlog } from "./filesystem.js";

const app = express();
app.use(cors());

app.use((req, _, next) => {
  console.log("new request:", req.method, req.url);
  next();
});
app.use(express.static("uploads"));
app.use(express.json());
const upload = multer({ dest: "./uploads" });

app.get("/api/v1/blogs", (_, res) => {
  readBlog()
    .then((blogs) => res.status(200).json(blogs))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read all blogs" })
    );
});

app.get("/api/v1/blog/:id", param("id").isNumeric(), (req, res) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Data not valid", errors: validationError.array() });
  }

  const blogId = req.params.id;

  readBlog()
    .then((blogs) => blogs.find((b) => b.id.toString() === blogId))
    .then((foundBlog) => res.status(200).json(foundBlog))
    .catch((err) => res.status(500).json({ err, message: "Blog not found" }));
});

app.post("/api/blog/upload", upload.single("attachment"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.post(
  "/api/blog/newupload",
  body("title").isString().notEmpty(),
  body("subtitle").isString().notEmpty(),
  body("text").isString().notEmpty(),
  body("filename").isString().notEmpty(),
  (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Data not valid", errors: validationError.array() });
    }

    const newBlog = {
      id: Date.now(),
      title: req.body.title,
      subtitle: req.body.subtitle,
      text: req.body.text,
      filename: req.body.filename,
    };
    readBlog()
      .then((blogs) => [...blogs, newBlog])
      .then((newBlogs) => writeBlog(newBlogs))
      .then((newBlogs) => res.status(200).json(newBlogs))
      .catch((err) =>
        res.status(500).json({ err, message: "Could not add new blog" })
      );
  }
);

const PORT = 3003;
app.listen(PORT, console.log("Server is ready at Port:", PORT));
