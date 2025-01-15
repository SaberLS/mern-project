import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext.mjs";
import dummyPosts from "../data";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const navigate = useNavigate;
  const { currentUser } = useContext(UserContext);
  const authToken = currentUser?.token;

  useEffect(() => {
    if (!authToken) {
      navigate("/permission-denied");
    }
  });
  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            return (
              <article key={post.id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={post.thumbnail} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post.id}`} className="btn sm">
                    View
                  </Link>
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/posts/${post.id}/delete`}
                    className="btn sm danger"
                  >
                    Delete
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
