import express, { json, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { router } from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://book-store-1waqnxlln-afdal-bouraimas-projects.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/books", router);
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
