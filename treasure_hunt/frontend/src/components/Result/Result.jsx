import "./Result.css";

import { useContext, useEffect, useState } from "react";

import Api from "../../Api";
import { AuthContext } from "../../context/AuthContext";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const totalPoints = localStorage.getItem("totalScore");
  const timeTaken = localStorage.getItem("timeTaken");
  const [softSkills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skill1 = [1, 2, 4, 5],
      skill2 = [1, 2, 4],
      skill3 = [2, 3, 5];
    let skillScore1 = 0,
      skillScore2 = 0,
      skillScore3 = 0;
    for (let i = 0; i < skill1.length; i++)
      skillScore1 += Number(localStorage.getItem(`point${skill1[i]}`));
    for (let i = 0; i < skill2.length; i++)
      skillScore2 += Number(localStorage.getItem(`point${skill2[i]}`));
    for (let i = 0; i < skill3.length; i++)
      skillScore3 += Number(localStorage.getItem(`point${skill3[i]}`));
    let arr = [
      {
        name: "Curiosity",
        percentage: (skillScore1 / skill1.length).toFixed(2),
      },
      {
        name: "Attention to Detail",
        percentage: (skillScore2 / skill2.length).toFixed(2),
      },
      {
        name: "Critical Thinking",
        percentage: (skillScore3 / skill3.length).toFixed(2),
      },
    ];
    setSoftSkills(arr);
    const addData = async () => {
      try {
        const res = await axios.post(
          Api.addScore,
          {
            name: localStorage.name,
            email: localStorage.email,
            timeTaken: timeTaken,
            softSkills: arr,
            score: (totalPoints / 5).toFixed(2),
          },
          {
            headers: {
              token: `Bearer ${localStorage.token}`,
            },
          }
        );
        if (res) {
          console.log(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    addData();
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const leaderBoard = () => {
    navigate("/leaderBoard");
  };

  return (
    <div className="result-container">
      <h2>Result</h2>
      {loading && (
        <div className="spinner-container">
          <BounceLoader color="blue" className="page-spinner" />
        </div>
      )}
      {!loading && (
        <>
          <div className="accuracy">
            <h5>Soft-Skills %</h5>
          </div>
          <div className="soft-skills">
            {softSkills.map((skill) => (
              <div key={skill.name} className="skill">
                <h5>{skill.name}:</h5>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.percentage} %` }}
                  >
                    <p>{skill.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-points">
            <h5>Total Points:</h5>
            <p>{(totalPoints / 5).toFixed(2)}/100</p>
          </div>
          <div className="total-points">
            <h5>Time Taken:</h5>
            <p>{timeTaken} sec</p>
          </div>
          <div className="buttons">
            <button className="leaderboard-button" onClick={leaderBoard}>
              Leaderboard
            </button>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
