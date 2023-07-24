const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true
  },
  softSkills: [
    {
      name: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("LeaderBoard", leaderBoardSchema);
