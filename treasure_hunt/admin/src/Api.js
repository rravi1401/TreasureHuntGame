// const url = "http://localhost:8000/api";
const url = "https://elitmuspuzzle.onrender.com/api";

const Api = {
  login: url + "/auth/login",
  getAllScores: url + "/leaderBoard",
  getAllQues: url + "/ques",
  scores: url + "/leaderBoard/scores",
  times: url + "/leaderBoard/times",
  skills: url + "/leaderBoard/skills",
};

export default Api;
