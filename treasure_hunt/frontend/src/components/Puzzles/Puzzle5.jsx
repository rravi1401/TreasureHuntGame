import React, { useEffect, useState } from "react";

import Hints from "./Hints";
import { useNavigate } from "react-router-dom";

const Puzzle5 = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(
    Number(localStorage.getItem("timeLeftPuzzle5")) || 300
  ); // 5 minutes in seconds
  const questions = JSON.parse(localStorage.getItem("questions"));
  const question = questions[4].text;
  const hints = questions[4].hints;
  const title = questions[4].title;
  const img = questions[4].img;

  const takeRaft = () => {
    alert("The raft had a hole. You did not reach the treasure");
    localStorage.setItem("currentURL", "/result");
    navigate("/result");
  };

  const gameOver = () => {
    alert("You touched the water and died");
    localStorage.setItem("currentURL", "/result");
    navigate("/result");
  };

  useEffect(() => {
    const currentUrl = localStorage.getItem("currentURL");
    if (currentUrl !== "/Puzzle5") {
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
      localStorage.setItem("timeLeftPuzzle5", time.toString());
    };
  }, [time, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const timeTaken = 300 - time;
    const puzzleScore = 100;
    let currScore = Number(localStorage.getItem("totalScore"));
    let currTime = Number(localStorage.getItem("timeTaken"));
    currScore += puzzleScore;
    currTime += timeTaken;
    localStorage.setItem("totalScore", currScore);
    localStorage.setItem("timeTaken", currTime);
    localStorage.setItem("point5", puzzleScore);
    alert("You found it!");
    localStorage.setItem("currentURL", "/result");
    navigate("/result");
  };

  return (
    <div className="puzzle-container">
      <div className="timer">
        <h4 className="question">Level 5: {title}</h4>
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
      <Hints hints={hints} />
      <br />
      <center>
        <div className="image-wrapper" onClick={takeRaft}>
          <img
            src={img}
            alt=""
            height="80px"
            width="90px"
            className="sample image"
          />
          <div className="overlay">
            <p>Take the Raft</p>
          </div>
        </div>
        <br />
        <div
          style={{
            display: "block",
            backgroundColor: "skyblue",
            height: "250px",
          }}
          onMouseOver={gameOver}
        ></div>
      </center>
      <br />
      <form className="answer-form" onSubmit={handleSubmit}>
        <button type="submit" className="submit-btn">
          Get Treasure
        </button>
      </form>
    </div>
  );
};

export default Puzzle5;
