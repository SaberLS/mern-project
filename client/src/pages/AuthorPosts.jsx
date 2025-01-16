import React, { useState, useEffect } from "react";
import { PostItem } from "../components/PostItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const AuthorPosts = () => {
  const [posts, setPosts] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
      );
      setPosts(response?.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      {posts.length ? (
        <div className="container posts__container">
          {posts.map((post) => (
            <PostItem key={post._id} post={post}></PostItem>
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
