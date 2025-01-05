import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    nameOrEmail: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="login">
      <div>
        <h2>Sign In</h2>
        <form className="form login__form">
          <p className="form__error-message">This is an error message</p>
          <input
            type="text"
            placeholder="Full Name or Email"
            name="name"
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
