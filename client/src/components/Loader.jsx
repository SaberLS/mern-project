import React from "react";
import loaderGif from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <div className="laoder__image">
        <img src={loaderGif} alt="" />
      </div>
    </div>
  );
};

export default Loader;
