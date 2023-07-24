import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Login from "./components/Login/Login";
import QuestionList from "./components/QuestionList/QuestionList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderBoard" element={<LeaderBoard />} />
          <Route path="/questions" element={<QuestionList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
