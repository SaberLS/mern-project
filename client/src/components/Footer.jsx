import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <Link to="posts/categories/Agriculture">
          <li>Agriculture</li>
        </Link>
        <Link to="posts/categories/Business">
          <li>Business</li>
        </Link>
        <Link to="posts/categories/Education">
          <li>Education</li>
        </Link>
        <Link to="posts/categories/Entertainment">
          <li>Entertainment</li>
        </Link>
        <Link to="posts/categories/Art">
          <li>Art</li>
        </Link>
        <Link to="posts/categories/Investment">
          <li>Investment</li>
        </Link>
        <Link to="posts/categories/Uncategorized">
          <li>Uncategorized</li>
        </Link>
        <Link to="posts/categories/Weather">
          <li>Weather</li>
        </Link>
      </ul>
      <div className="footer__copyright">
        <small>All Rigths Reserved &copy;</small>
      </div>
    </footer>
  );
};

export default Footer;
