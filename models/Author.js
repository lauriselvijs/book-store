const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter name"],
  },
  birth_year: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(v);
      },
      message: (props) =>
        `${props.value} is not valid date, use YYYY-MM-DD format`,
    },
    required: [true, "Please enter birth year"],
  },
  author_pic: {
    type: String,
    validate: {
      validator: function (v) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
          v
        );
      },
      message: (props) => `${props.value} is not valid url`,
    },
    required: [true, "Please enter author image url"],
  },
});

module.exports = mongoose.model("Author", AuthorSchema);
