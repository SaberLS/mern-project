import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/userContext.mjs";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        userData
      );
      setCurrentUser(response.data);
      console.log(response);
      navigate("/");
    } catch (error) {
      setError(`${error.message}: ${error.response.data.message}`);
    }
  };
  return (
    <section className="login">
      <div>
        <h2>Sign In</h2>
        <form className="form login__form" onSubmit={login}>
          {error ? <p className="form__error-message">{error}</p> : ""}
          <input
            type="text"
            placeholder="Full Name or Email"
            name="email"
            value={userData.nameOrEmail}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account?
          <Link className="small__sign" to="/register">
            sign up
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
