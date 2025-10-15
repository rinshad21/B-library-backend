const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {},
    coverImage: {
      type: String,
      require: true,
    },
    oldPrice: Number,
    newPrice: Number,
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
