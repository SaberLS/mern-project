import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar10.jpg";

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/someid`} className="post__author">
      <div className="post__author-avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="post__author-details">
        <h5>By: Ernest Achiever</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
