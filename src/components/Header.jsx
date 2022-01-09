import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logOut();
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <header>
        <div className="inner-content">
          <div className="brand">
            <div className="logo__header" />
            <Link to="/watch">Cinemania</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/watch">Para assistir</Link>
            </li>
            <li>
              <Link to="/watched">Assistidos</Link>
            </li>
            <li>
              <Link to="/add" className="btn search-btn">
                Procurar
              </Link>
            </li>
            <li>
              <button
                className="btn"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
    </header>
  );
};

export default Header;
