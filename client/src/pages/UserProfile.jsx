import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [newAvatar, setNewAvatar] = useState({});
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const authToken = currentUser?.token;

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  useEffect(() => {
    if (!authToken) {
      navigate("/permission-denied");
    }
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`
        );
        setAvatar(
          `${process.env.REACT_APP_ASSETS_URL}/uploads/${response.data.avatar}`
        );
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
        setError(error.response.data.message);
      }
    };

    fetchUser();
  }, [currentUser]);

  const changeAvatarHandler = async (event) => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      console.log(currentUser);
      postData.set("avatar", newAvatar);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setAvatar(
          `${process.env.REACT_APP_ASSETS_URL}/uploads/${response.data.avatar}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editUser = async (event) => {
    event.preventDefault();
    if (!name || !newPassword || !confirmNewPassword || !email) {
      console.log(name, newPassword, confirmNewPassword, email);
      setError("Fill in all fields");
      return 0;
    }

    if (newPassword !== confirmNewPassword) {
      setError("passwords do not match");
      return 0;
    }

    try {
      const userData = new FormData();
      userData.set("email", email);
      userData.set("name", name);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.status === 200) {
        // log user out
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}}`} className="btn">
          See my posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="Your avatar" />
            </div>
            {/* Form to update avatr */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                onChange={(e) => setNewAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit className="ico" />
              </label>
            </form>
            {isAvatarTouched ? (
              <button
                className="profile__avatar-btn"
                onClick={changeAvatarHandler}
              >
                <FaCheck className="ico" />
              </button>
            ) : (
              ""
            )}
          </div>
          <h1>{currentUser.name}</h1>
          {/* form to update user details */}
          <form onSubmit={editUser} action="" className="form profile__form">
            {error ? <p className="form__error-message">{error}</p> : ""}
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
              placeholder="current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />{" "}
            <input
              type="password"
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm new password"
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
