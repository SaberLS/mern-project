import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

export const PostItem = ({
  post: {
    _id: id,
    thumbnail,
    category,
    title,
    description,
    creator: authorID,
    createdAt,
  },
}) => {
  const shortDesc =
    description.length > 150
      ? description.substring(0, 150) + "...."
      : description;
  return (
    <article className="post">
      <div className="post__thumbnail">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="post__content">
        <Link to={`/posts/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{shortDesc}</p>
      </div>
      <div className="post__footer">
        <PostAuthor authorID={authorID} createdAt={createdAt} />
        <Link to={`/posts/categories/${category}`} className="btn category">
          {category}
        </Link>
      </div>
    </article>
  );
};
