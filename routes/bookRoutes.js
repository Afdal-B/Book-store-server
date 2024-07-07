import { Router } from "express";
import { Book } from "../models/bookModel.js";

const router = Router();

//Route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(234).send({
        message: "Send the required fields: title , author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(232).send(book);
  } catch (error) {
    console.log(`error ${error.message}`);
  }
});

// Route to get all the books
router.get("/", async (req, res) => {
  try {
    const book = await Book.find({});
    return res.status(200).send(book);
  } catch (error) {
    console.log("error ${error.message}");
  }
});

// Route to get books by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log("error ${error.message}");
    res.status(500).send({ message: error.message });
  }
});
// Route to update  a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(234).send({
        message: "Send the required fields: title , author, publishYear",
      });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    return res.status(200).send(book);
  } catch (error) {
    console.log("error ${error.message}");
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(200).send("error when deleting ");
    }
    return res.status(200).send("Book deleted");
  } catch (error) {
    console.log("error ${error.message}");
    res.status(500).send({ message: error.message });
  }
});

export { router };
