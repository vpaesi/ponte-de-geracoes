import "./Header.css";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../utils/UserContext";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isRegisteredPage = location.pathname === "/registered";
  const isEditRegistrationPage = location.pathname === "/edit-registration";
  const isLoginPage = location.pathname === "/login";
  const isProfilePage = location.pathname === "/profile";
  const { user } = useUser();
  const { userType } = user || {};

  return (
    <header className="header">
      <div className="header-left">
        <img
          src={logo}
          alt="Logo contendo duas pessoas em cima de uma ponte com um pedaço faltando. As duas pessoas estão colocando o pedaço faltante."
          className="special-image-size"
        />
        <h1>
          <Link to={"/"} className="header-left-link">
            {" "}
            Ponte de Gerações{" "}
          </Link>
        </h1>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          {!isHomePage && (
            <Link to="/" className="header-link">
              Página Inicial
            </Link>
          )}

          {userType === "default" &&
            !isRegisterPage &&
            !isLoginPage &&
            !isEditRegistrationPage &&
            !isProfilePage && (
              <Link to="/register" className="header-link">
                Cadastre-se
              </Link>
            )}

          {userType !== "default" &&
            !isRegisterPage &&
            !isRegisteredPage &&
            !isLoginPage &&
            !isProfilePage && (
              <Link to="/registered" className="header-link">
                Cadastrados
              </Link>
            )}

          {!isRegisterPage &&
            !isLoginPage &&
            !isEditRegistrationPage &&
            !isHomePage &&
            !isRegisteredPage &&
            !isProfilePage && (
              <Link to="/edit-registration" className="header-link">
                Editar Cadastro
              </Link>
            )}

          {userType === "default" &&
            !isLoginPage &&
            !isRegisterPage &&
            !isEditRegistrationPage &&
            !isProfilePage && (
              <Link to="/login" className="header-link">
                Entrar
              </Link>
            )}
          {userType !== "default" &&
            !isLoginPage &&
            !isRegisterPage &&
            !isEditRegistrationPage &&
            !isProfilePage && (
              <Link to="/profile" className="header-link">
                Ver perfil
              </Link>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
