import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );

      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't register user. Please try again");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <section className="register">
      <div>
        <h2>Sign Up</h2>
        <form className="form regiser__form" onSubmit={registerUser}>
          {error ? <p className="form__error-message">{error}</p> : ""}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="repeat password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account?
          <Link className="small__sign" to="/login">
            sign in
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
