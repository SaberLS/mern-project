import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

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

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("Thumbnail");

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className="form__eror-message">This is an error message</p>
        <form className="form create-post__form">
          <input
            type="text"
            placeholder="Title"
            name=""
            id=""
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
              <option value="no categories">no categories</option>
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
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
