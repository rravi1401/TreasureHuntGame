const LeaderBoard = require("../models/leaderboard");

exports.addScore = async (req, res) => {
  const email = req.body.email;

  try {
    const savedScore = await LeaderBoard.updateOne({ email }, req.body, {
      upsert: true,
    });
    res.status(201).json(savedScore);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllScores = async (req, res) => {
  try {
    const scores = await LeaderBoard.find();
    scores.sort((a, b) => {
      if (a.score === b.score) {
        return a.timeTaken - b.timeTaken;
      } else {
        return b.score - a.score;
      }
    });
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.scoreAnalysis = async (req, res) => {
  try {
    const result = await LeaderBoard.find({}, { name: 1, score: 1, _id: 1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.timeAnalysis = async (req, res) => {
  try {
    const result = await LeaderBoard.find(
      {},
      { name: 1, timeTaken: 1, _id: 1 }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.skillAnalysis = async (req, res) => {
  try {
    const result = await LeaderBoard.find(
      {},
      { name: 1, softSkills: 1, _id: 1 }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
