import React, { useEffect, useState } from "react";

import Hints from "./Hints";
import { useNavigate } from "react-router-dom";

const Puzzle4 = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(
    Number(localStorage.getItem("timeLeftPuzzle4")) || 300
  ); // 5 minutes in seconds
  const [answer, setAnswer] = useState("");
  const questions = JSON.parse(localStorage.getItem("questions"));
  const correctAnswers = questions[3].answers;
  const question = questions[3].text;
  const hints = questions[3].hints;
  const title = questions[3].title;

  useEffect(() => {
    const currentUrl = localStorage.getItem("currentURL");
    if (currentUrl !== "/Puzzle4") {
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
      localStorage.setItem("timeLeftPuzzle4", time.toString());
    };
  }, [time, navigate]);

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (correctAnswers.includes(answer.toLowerCase())) {
      const timeTaken = 300 - time;
      const puzzleScore = 100;
      let currScore = Number(localStorage.getItem("totalScore"));
      let currTime = Number(localStorage.getItem("timeTaken"));
      currScore += puzzleScore;
      currTime += timeTaken;
      localStorage.setItem("totalScore", currScore);
      localStorage.setItem("timeTaken", currTime);
      localStorage.setItem("point4", puzzleScore);
      setAnswer("");
      alert("You Did it, You broke the door!");
      localStorage.setItem("currentURL", "/Puzzle5");
      navigate("/Puzzle5");
    } else {
      alert("Game over! The map was lost forever. You could not figure it out");
      localStorage.setItem("currentURL", "/result");
      navigate("/result");
    }
  };

  return (
    <div className="puzzle-container">
      <div className="timer">
        <h4 className="question">Level 4: {title}</h4>
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

export default Puzzle4;
