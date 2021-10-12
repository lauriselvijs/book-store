const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    trim: true,
    required: [true, "Please enter ISBN"],
  },
  author_id: {
    type: String,
    trim: true,
    required: [true, "Please provide author ID"],
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter book title"],
  },
  year: {
    type: String,
    required: [true, "Please enter book publishing year"],
  },
  page_count: {
    type: Number,
    required: [true, "Please enter book page count"],
  },
  book_cover: {
    type: String,
    validate: {
      validator: function (v) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
          v
        );
      },
      message: (props) => `${props.value} is not valid url`,
    },
    required: [true, "Please enter book cover url"],
  },
});

module.exports = mongoose.model("Book", BookSchema);
