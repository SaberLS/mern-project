import React, { useState, useEffect } from "react";
import DUMMY_POSTS from "../data";
import { PostItem } from "../components/PostItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`
      );
      console.log(response.data);
      setPosts(response?.data);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
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

export default CategoryPosts;
