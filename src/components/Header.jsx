import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logoipsum-346.svg";
import { FiAlignJustify } from "react-icons/fi";

const Header = () => {
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        <ul className="nav__menu">
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/create">create</Link>
          </li>
          <li>
            <Link to="/authors">authors</Link>
          </li>
          <li>
            <Link to="/logout">logout</Link>
          </li>
        </ul>
        <button className="nav__toggle-btn">
          <FiAlignJustify />
        </button>
      </div>
    </nav>
  );
};

export default Header;
