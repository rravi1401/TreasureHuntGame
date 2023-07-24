import "./Login.css";

import React, { useContext, useState } from "react";

import Api from "../../Api";
import { AuthContext } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(Api.login, {
        email: email,
        password: password,
      });
      if (res) {
        toast.success(`LoggedIn Successfully!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        dispatch({ type: "LOGIN", payload: res.data });
        navigate("/instruction");
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    setLoader(false);
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {loader && (
            <button type="submit" disabled={true}>
              <center>
                <ClipLoader color="white" size={25} />
              </center>
            </button>
          )}
          {!loader && <button type="submit">Login</button>}
        </form>
      </div>
    </>
  );
};

export default Login;
