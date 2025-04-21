import logo from "../assets/logo.png";
import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";

const Header = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      const navbarToggler = document.querySelector(".navbar-toggler");
      if (navbarToggler && navbarToggler.getAttribute("aria-expanded") === "true") {
        navbarToggler.dispatchEvent(new Event("click"));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${theme === "dark" ? "dark" : ""}`}>
      <div className="container header-container" ref={navbarRef}>
        <button
          className="navbar-toggler btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="header-titulo link-sem-decoracao" to="/">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          Ponte de Gerações
        </Link>
        <div
          className="collapse navbar-collapse justify-content"
          id="navbarNav"
        >
          <ul className="navbar-nav text-end">
            {location.pathname !== "/" && (
              <li>
                <Link className="link-sem-decoracao" to="/">
                  Home
                </Link>
              </li>
            )}
            {location.pathname !== "/register" && (
              <li>
                <Link className="link-sem-decoracao" to="/register">
                  Cadastre-se
                </Link>
              </li>
            )}
            {location.pathname !== "/login" && (
              <li>
                <Link className="link-sem-decoracao" to="/login">
                  Login
                </Link>
              </li>
            )}
            {location.pathname !== "/about" && (
              <li>
                <Link className="link-sem-decoracao" to="/about">
                  Sobre
                </Link>
              </li>
            )}
            {location.pathname !== "/registered" && (
              <li>
                <Link className="link-sem-decoracao" to="/registered">
                  Usuários
                </Link>
              </li>
            )}
          </ul>
        </div>
        <button onClick={toggleTheme} className="btn btn-theme-toggle">
          {theme === "light" ? (
            <i className="bi bi-moon"></i>
          ) : (
            <i className="bi bi-sun"></i>
          )}
          <span>{theme === "light" ? " Dark" : " Light"}</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;