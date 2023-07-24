import { NavLink, useNavigate } from "react-router-dom";

import React from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <NavLink
        className="navbar-brand ml-4"
        to="https://admin-portal-elitmus-puzzle.netlify.app/"
        target="_blank"
      >
        Admin Login
      </NavLink>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item"></li>
          <li className="nav-item">
            <button
              className="btn btn-outline-light my-2 my-sm-0 mr-4"
              type="submit"
              onClick={register}
            >
              Register
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-light my-2 my-sm-0 mr-4"
              type="submit"
              onClick={login}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
