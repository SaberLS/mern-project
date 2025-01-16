import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import DeletePost from "./DeletePost";
import axios from "axios";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const authToken = currentUser?.token;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authToken) {
      navigate("/permission-denied");
    }
  }, [currentUser]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/users/${currentUser.id}`
      );
      setPosts(response?.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            return (
              <article key={post._id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={post.thumbnail} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`}>View</Link>
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={post._id} />
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
