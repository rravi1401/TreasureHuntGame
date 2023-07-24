import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Instruction from "./components/Instruction/Instruction";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Login from "./components/Login/Login";
import Puzzle1 from "./components/Puzzles/Puzzle1";
import Puzzle2 from "./components/Puzzles/Puzzle2";
import Puzzle3 from "./components/Puzzles/Puzzle3";
import Puzzle4 from "./components/Puzzles/Puzzle4";
import Puzzle5 from "./components/Puzzles/Puzzle5";
import Register from "./components/Register/Register";
import Result from "./components/Result/Result";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instruction">
              <Route
                index
                element={
                  <RequireAuth>
                    <Instruction />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/Puzzle1">
              <Route
                index
                element={
                  <RequireAuth>
                    <Puzzle1 />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/Puzzle2">
              <Route
                index
                element={
                  <RequireAuth>
                    <Puzzle2 />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/Puzzle3">
              <Route
                index
                element={
                  <RequireAuth>
                    <Puzzle3 />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/Puzzle4">
              <Route
                index
                element={
                  <RequireAuth>
                    <Puzzle4 />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/Puzzle5">
              <Route
                index
                element={
                  <RequireAuth>
                    <Puzzle5 />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="/result">
              <Route
                index
                element={
                  <RequireAuth>
                    <Result />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/leaderBoard">
              <Route
                index
                element={
                  <RequireAuth>
                    <LeaderBoard />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
