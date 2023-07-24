import "./NavBar.css";

import { Link, useNavigate } from "react-router-dom";

import React from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/leaderBoard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/questions">Questions</Link>
        </li>
        <li style={{ position: "absolute", right: "5rem" }}>
          <Link to="/login" onClick={logout} style={{ color: "red" }}>
            {" "}
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
