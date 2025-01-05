import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

export const PostItem = ({
  post: { id, thumbnail, category, title, desc, authorID },
}) => {
  const shortDesc = desc.length > 150 ? desc.substring(0, 150) + "...." : desc;
  return (
    <article className="post">
      <div className="post__thumbnail">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="post__content">
        <Link to={`/posts/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{shortDesc}</p>
      </div>
      <div className="post__footer">
        <PostAuthor />
        <Link to={`/posts/categories/${category}`} className="btn category">
          {category}
        </Link>
      </div>
    </article>
  );
};
