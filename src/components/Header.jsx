import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">Cinemania</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Para assistir</Link>
            </li>
            <li>
              <Link to="/watched">Assistidos</Link>
            </li>
            <li>
              <Link to="/add" className="btn">
                Procurar
              </Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
