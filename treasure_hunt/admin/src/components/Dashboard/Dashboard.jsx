import "./Dashboard.css";

import React, { useEffect, useState } from "react";

import Api from "../../Api";
import BounceLoader from "react-spinners/BounceLoader";
import NavBar from "../NavBar/NavBar";
import ScoreGraph from "./ScoreGraph";
import SkillsGraph from "./SkillsGraph";
import TimeGraph from "./TimeGraph";
import axios from "axios";

const Dashboard = () => {
  const [scoresData, setScoresData] = useState([]);
  const [timesData, setTimesData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getScores = async () => {
      const res = await axios.get(Api.scores, {
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      if (res) {
        setScoresData(res.data);
      }
    };
    const getTimes = async () => {
      const res = await axios.get(Api.times, {
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      if (res) {
        setTimesData(res.data);
      }
    };
    const getSkills = async () => {
      const res = await axios.get(Api.skills, {
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      if (res) {
        setSkillsData(res.data);
      }
    };
    getScores();
    getTimes();
    getSkills();
    setLoading(false);
  }, []);

  return (
    <>
      <div className="dashboard">
        <NavBar />
        {loading && (
          <div className="spinner-container">
            <BounceLoader color="blue" className="page-spinner" />
          </div>
        )}
        {!loading && (
          <>
            <div className="dashboard__section">
              <h4 className="dashboard__title">Soft-Skills Analysis</h4>
              <SkillsGraph data={skillsData} />
            </div>
            <div className="dashboard__section">
              <h4 className="dashboard__title">Scores Analysis</h4>
              <ScoreGraph scores={scoresData} />
            </div>
            <div className="dashboard__section">
              <h4 className="dashboard__title">Timing Analysis</h4>
              <TimeGraph times={timesData} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
