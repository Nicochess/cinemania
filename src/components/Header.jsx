import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { logOut } = useContext(AuthContext);

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
              <button
                className="btn"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={logOut}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
