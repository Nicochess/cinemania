import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Visibility,
  Movie,
  Search,
  ExitToApp,
  Menu,
  Close,
} from "@material-ui/icons";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { logOut } = useContext(AuthContext);
  const [sidebar, setSideBar] = useState(true);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logOut();
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  const showSideBar = () => {
    setSideBar((prev) => !prev);
  };

  return (
    <header className={sidebar ? "active" : null}>
      <button className="btn menu" onClick={showSideBar}>
        {sidebar ? <Close /> : <Menu />}
      </button>

      <nav className={sidebar ? "nav-container active" : "nav-container"}>
        <ul className={sidebar ? "nav-links active" : "nav-links"}>
          <div className="brand">
            <div className="logo__header" />
            Cinemania
          </div>

          <li onClick={showSideBar}>
            <Link to="/watch">
              <Movie />
              Minha Lista
            </Link>
          </li>
          <li onClick={showSideBar}>
            <Link to="/watched">
              <Visibility />
              Assistidos
            </Link>
          </li>
          <li onClick={showSideBar}>
            <Link to="/add">
              <Search />
              Procurar
            </Link>
          </li>
          <li onClick={showSideBar}>
            <button className="btn" onClick={handleLogout}>
              <ExitToApp />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
