import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Avatar from "../assets/images/avatar5.jpg";
import { UserContext } from "../context/userContext.mjs";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate;
  const { currentUser } = useContext(UserContext);
  const authToken = currentUser?.token;

  useEffect(() => {
    if (!authToken) {
      navigate("/permission-denied");
    }
  });
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}}`} className="btn">
          See my posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            {/* Form to update avatr */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar">
                <FaEdit className="ico" />
              </label>
            </form>
            <button className="profile__avatar-btn">
              <FaCheck className="ico" />
            </button>
          </div>
          <h1>{currentUser.name}</h1>
          {/* form to update user details */}
          <form action="" className="form profile__form">
            <p className="form__error-message">This is an error message</p>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <input
              type="password"
              placeholder="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />{" "}
            <input
              type="password"
              placeholder="Full Name"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Full Name"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
