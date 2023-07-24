import "./Puzzle.css";

import React, { useEffect, useState } from "react";

import Hints from "./Hints";
import { useNavigate } from "react-router-dom";

const Puzzle1 = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(
    Number(localStorage.getItem("timeLeftPuzzle1")) || 300
  ); // 5 minutes in seconds
  const [answer, setAnswer] = useState("");
  const questions = JSON.parse(localStorage.getItem("questions"));
  const correctAnswers = questions[0].answers;
  const title = questions[0].title;
  const question = questions[0].text;
  const hints = questions[0].hints;
  const img = questions[0].img;

  useEffect(() => {
    const currentUrl = localStorage.getItem("currentURL");
    if (currentUrl !== "/Puzzle1") {
      navigate(currentUrl);
    }
    let intervalId;
    if (time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      alert("Time's Up!");
      localStorage.setItem("currentURL", "/result");
      navigate("/result");
    }
    return () => {
      clearInterval(intervalId);
      localStorage.setItem("timeLeftPuzzle1", time.toString());
    };
  }, [time, navigate]);

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (correctAnswers.includes(answer)) {
      const timeTaken = 300 - time;
      const puzzleScore = 100;
      let currScore = Number(localStorage.getItem("totalScore"));
      let currTime = Number(localStorage.getItem("timeTaken"));
      currScore += puzzleScore;
      currTime += timeTaken;
      localStorage.setItem("totalScore", currScore);
      localStorage.setItem("timeTaken", currTime);
      localStorage.setItem("point1", puzzleScore);
      setAnswer("");
      alert("You Got It. Cool!");
      localStorage.setItem("currentURL", "/Puzzle2");
      navigate("/Puzzle2");
    } else {
      alert("Wrong Code! The Gate didn't open");
    }
  };

  return (
    <div className="puzzle-container">
      <div className="timer">
        <h4 className="question">Level 1: {title}</h4>
        <div>
          Timer: &nbsp;
          <span id="timer">
            {Math.floor(time / 60)}:
            {time % 60 < 10 ? "0" + (time % 60) : time % 60}
          </span>
        </div>
      </div>
      {question.map((item, index) => (
        <h6 key={index}>{item}</h6>
      ))}
      <center>
        <img src={img} alt="" style={{ height: "200px", width: "300px" }} />{" "}
      </center>
      <br />
      <form className="answer-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            className="answer-input"
            onChange={handleInputChange}
            placeholder="Enter your Answer here"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <Hints hints={hints} />
    </div>
  );
};

export default Puzzle1;
