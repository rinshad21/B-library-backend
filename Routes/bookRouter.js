const express = require("express");
const Book = require("../Models/Books/bookmodel");
const {
  PostBook,
  getAllBook,
  getSingleBook,
  UpdateBook,
  deleteBook,
} = require("../controllers/bookController");

const verifyAdminToken = require("../middlewares/Auth");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//post a book.post for submitting
router.post("/create-book", upload.single("image"), PostBook);
//get all books
router.get("/", getAllBook);
//get single books
router.get("/:id", getSingleBook);

//update Book
router.put("/edit/:id", verifyAdminToken, UpdateBook);

//delete
router.delete("/delete/:id", verifyAdminToken, deleteBook);

module.exports = router;
