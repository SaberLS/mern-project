import React, { useState } from "react";
import { PostItem } from "./PostItem";
import DUMMY_POSTS from "../data";

function Posts() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map((post) => (
            <PostItem key={post.id} post={post}></PostItem>
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
}

export default Posts;
