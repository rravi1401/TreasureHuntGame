// const url = "http://localhost:8000/api";
const url = "https://elitmuspuzzle.onrender.com/api";

const Api = {
  register: url + "/auth/register",
  login: url + "/auth/login",
  getAllQues: url + "/ques",
  addScore: url + "/leaderBoard",
  getAllScores: url + "/leaderBoard",
};

export default Api;
