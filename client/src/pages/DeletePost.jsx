import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const authToken = currentUser?.token;

  useEffect(() => {
    if (!authToken) {
      navigate("/permission-denied");
    }
  });

  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.status === 200) {
        // eslint-disable-next-line
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link onClick={() => deletePost()} className="btn sm danger">
      Delete
    </Link>
  );
};

export default DeletePost;
