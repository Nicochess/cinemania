import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/personal-watch-list">Cinemania</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/personal-watch-list">Para assistir</Link>
            </li>
            <li>
              <Link to="/personal-watch-list/watched">Assistidos</Link>
            </li>
            <li>
              <Link to="/personal-watch-list/add" className="btn">
                Procurar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
