import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setAuthors(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map((author) => {
            return (
              <Link
                className="author"
                key={author._id}
                to={`/posts/users/${author._id}`}
              >
                <div className="author__avatar">
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
                    alt={`Image of ${author.name}`}
                  />
                </div>
                <div className="author__info">
                  <h4>{author.name}</h4>
                  <p>{author.posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No Authors found</h2>
      )}
    </section>
  );
};

export default Authors;
