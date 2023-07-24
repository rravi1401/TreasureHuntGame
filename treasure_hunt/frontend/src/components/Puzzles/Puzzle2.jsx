import React, { useEffect, useState } from "react";

import Hints from "./Hints";
import { useNavigate } from "react-router-dom";

const Puzzle2 = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(
    Number(localStorage.getItem("timeLeftPuzzle2")) || 300
  ); // 5 minutes in seconds
  const [answer, setAnswer] = useState("");
  const questions = JSON.parse(localStorage.getItem("questions"));
  const correctAnswers = questions[1].answers;
  const title = questions[1].title;
  const question = questions[1].text;
  const hints = questions[1].hints;

  useEffect(() => {
    const currentUrl = localStorage.getItem("currentURL");
    if (currentUrl !== "/Puzzle2") {
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
      localStorage.setItem("timeLeftPuzzle2", time.toString());
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
      localStorage.setItem("point2", puzzleScore);
      setAnswer("");
      alert("You guessed it right!");
      localStorage.setItem("currentURL", "/Puzzle3");
      navigate("/Puzzle3");
    } else {
      alert("Wrong Code! Try using a hint");
    }
  };

  return (
    <div className="puzzle-container">
      <div className="timer">
        <div style={{ display: "none" }}>
          You have looked this far for the code. Congrats You Found it!!! The
          code is bmXG6kIL
        </div>
        <h4 className="question">Level 2: {title}</h4>
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

export default Puzzle2;
