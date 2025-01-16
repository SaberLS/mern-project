import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext.mjs";

const DeletePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const authToken = currentUser?.token;

  useEffect(() => {
    if (!authToken) {
      navigate("/permission-denied");
    }
  });

  return (
    <Link onClick={() => {}} className="btn sm danger">
      Delete
    </Link>
  );
};

export default DeletePost;
