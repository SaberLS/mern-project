import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
];
const POST_CATEGORIES = [
  "Agriculture",
  "Business",
  "Education",
  "Entertainment",
  "Art",
  "Investment",
  "Uncategorized",
  "Weather",
];

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(undefined);
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [creator, setCreator] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const authToken = currentUser?.token;

  useEffect(() => {
    if (!authToken || currentUser.id !== creator) {
      navigate("/permission-denied");
    }
  }, [currentUser, id]);

  // fetch current post
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setCreator(response.data.creator);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
        setThumbnail("");
      } catch (error) {
        console.warn(error);
        setError(error.response.data.message);
      }
      setIsLoading(false);
    })();
  }, [id]);

  const editPost = async (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("thumbnail", thumbnail);
    postData.set("category", category);
    postData.set("description", description);
    try {
      const response = await axios.patchForm(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.status === 200) {
        navigate(`/posts/${response.data._id}`);
      }
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error ? <p className="form__eror-message">{error}</p> : ""}
        <form onSubmit={editPost} className="form create-post__form">
          <input
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.length ? (
              POST_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option value="Uncategorized">Uncategorized</option>
            )}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg"
          />
          <button type="submit" className="btn primary">
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
