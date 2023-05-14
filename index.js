import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import blogRoutes from "./src/routes/blog.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import env from "dotenv";
import { fileURLToPath } from "url";
env.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = "mongodb+srv://aldilukmn:qs1hXe27TDbdYH5x@cluster0.i3wdhtg.mongodb.net/blog?retryWrites=true&w=majority";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
  next();
});

// app.use('/', blog);
app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

// Database connection

const port = process.env.PORT || 6001;
mongoose
  .connect(db)
  .then(() => {
    app.listen(port, () => console.log(`Server started on port`, port));
  })
  .catch((err) => console.log(err));
