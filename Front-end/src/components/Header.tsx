import logo from "../assets/logo.png";
import { useEffect, useRef } from "react";
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container" ref={navbarRef}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          Ponte de Gerações
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav text-end">
            {location.pathname !== "/" && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            )}
            {location.pathname !== "/register" && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Cadastre-se
                </Link>
              </li>
            )}
            {location.pathname !== "/login" && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {location.pathname !== "/about" && (
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Sobre
                </Link>
              </li>
            )}
            {location.pathname !== "/registered" && (
              <li className="nav-item">
                <Link className="nav-link" to="/registered">
                  Usuários
                </Link>
              </li>
            )}
          </ul>
        </div>
        <button onClick={toggleTheme} className="btn btn-outline-secondary">
          {theme === "light" ? "Modo Escuro" : "Modo Claro"}
        </button>
      </div>
    </nav>
  );
};

export default Header;