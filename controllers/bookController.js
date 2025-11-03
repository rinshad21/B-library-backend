const express = require("express");
const { v2: cloudinary } = require("cloudinary");
const Book = require("../Models/Books/bookmodel");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//post/create book controller
const PostBook = async (req, res) => {
  let coverImageUrl = req.body.coverImage; // Fallback to req.body if no file is uploaded

  try {
    //  Check for file and upload it
    if (req.file) {
      console.log("File detected, uploading to Cloudinary...");

      const uploadOptions = {
        folder: "book_covers", // Recommended: Organize your assets
        resource_type: "auto",
      };

      const uploadResult = await uploadStream(req.file.buffer, uploadOptions);

      // Use the secure URL returned by Cloudinary
      coverImageUrl = uploadResult.secure_url;
    }

    const newBook = new Book({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,

      coverImage: coverImageUrl,
      oldPrice: req.body.oldPrice,
      newPrice: req.body.newPrice,
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book saved successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error saving book:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while saving book",
      error: error.message,
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
    res
      .status(500)
      .json({ success: false, message: "some error occured", error });
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
