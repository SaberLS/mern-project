import React, { useState, useEffect } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams, useNavigate } from "react-router-dom";
import Thumbnail from "../assets/images/blog19.jpg";
import { useContext } from "react";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext.mjs";
import Loader from "../components/Loader";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { authToken } = currentUser;

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(await response.data);
        setCreatorID(response.data.creator);
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
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={creatorID} createdAt={post.createdAt} />
            {post.creator === currentUser.id ? (
              <div className="post-detail__buttons">
                <Link to={`/posts/werwer/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={id}></DeletePost>
              </div>
            ) : (
              ""
            )}
          </div>
          <h1>{post?.title}</h1>
          <div className="post-detail__thumbnail">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`}
              alt=""
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
