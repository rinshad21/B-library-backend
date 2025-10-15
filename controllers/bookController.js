const express = require("express");

const Book = require("../Models/Books/bookmodel");
//post/create book controller
const PostBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(202).json({ message: "book saved successfully", book: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};
const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "all books posted successfully",
      Book: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
      error,
    });
  }
};
//get a single book
const getSingleBook = async (req, res) => {
  const { id } = req.params;

  // Validate id
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid book ID",
    });
  }

  try {
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, book });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error: err.message,
    });
  }
};

//update Book
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    //if found
    res.status(200).json({
      success: true,
      message: "Book Updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "error occured ,failed to delete book",
      error: error.message,
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    //if found
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured ,failed to update book",
      error,
    });
  }
};

module.exports = {
  PostBook,
  getAllBook,
  getSingleBook,
  UpdateBook,
  deleteBook,
};
