const mongoose = require("mongoose");

const QuesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: [String], required: true },
  img: { type: String },
  answers: {
    type: [String],
    required: true,
  },
  hints: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Question", QuesSchema);
