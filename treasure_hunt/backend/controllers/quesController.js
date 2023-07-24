const Question = require("../models/question");

exports.addQues = async (req, res) => {
  const newQues = new Question({
    title: req.body.title,
    text: req.body.text,
    img: req.body.img,
    answers: req.body.answers,
    hints: req.body.hints,
  });

  try {
    const savedQues = await newQues.save();
    res.status(201).json(savedQues);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getQues = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteQues = async (req, res) => {
  const quesId = req.params.id;
  try {
    await Question.deleteOne({ _id: quesId });
    res.status(200).json("Question removed successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editQues = async (req, res) => {
  const quesId = req.params.id;
  try {
    const updatedQues = await Question.findByIdAndUpdate(
      { _id: quesId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedQues);
  } catch (err) {
    res.status(500).status(err);
  }
};
