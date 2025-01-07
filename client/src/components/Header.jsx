import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logoipsum-346.svg";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);

  const closeNavHandler = () => setIsNavShowing(!isNavShowing);
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {isNavShowing && (
          <ul className="nav__menu">
            <li onClick={closeNavHandler}>
              <Link to="/profile/something">profile</Link>
            </li>
            <li onClick={closeNavHandler}>
              <Link to="/create">create</Link>
            </li>
            <li onClick={closeNavHandler}>
              <Link to="/authors">authors</Link>
            </li>
            <li onClick={closeNavHandler}>
              <Link to="/logout">logout</Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <IoMdClose /> : <FiAlignJustify />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
