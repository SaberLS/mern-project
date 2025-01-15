import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logoipsum-346.svg";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../context/userContext.mjs";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth <= 800) {
      setIsNavShowing(!isNavShowing);
    }
  };
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {isNavShowing && (
          <ul className="nav__menu">
            {currentUser ? (
              <>
                <li onClick={closeNavHandler}>
                  <Link to={`/profile/${currentUser.id}`}>
                    {currentUser.name}
                  </Link>
                </li>
                <li onClick={closeNavHandler}>
                  <Link to="/create">create</Link>
                </li>
                <li onClick={closeNavHandler}>
                  <Link to="/logout">logout</Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={closeNavHandler}>
                  <Link to="/register">register</Link>
                </li>
                <li onClick={closeNavHandler}>
                  <Link to="/login">login</Link>
                </li>
              </>
            )}
            <li onClick={closeNavHandler}>
              <Link to="/authors">authors</Link>
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
