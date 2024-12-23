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
      <nav className="nav-left">
        {!isHomePage && (
          <Link to="/" className="nav-link">
            Página Inicial
          </Link>
        )}

        {userType === "default" &&
          !isRegisterPage &&
          !isProfilePage && (
            <Link to="/about" className="nav-link">
              Sobre nós
            </Link>
          )}

        {userType !== "default" &&
          !isRegisterPage &&
          !isRegisteredPage &&
          !isLoginPage &&
          !isProfilePage && (
            <Link to="/registered" className="header-link">
              Usuários cadastrados
            </Link>
          )}

        {!isRegisterPage &&
          !isLoginPage &&
          !isEditRegistrationPage &&
          !isHomePage &&
          !isRegisteredPage &&
          !isProfilePage && (
            <Link to="/edit-registration" className="header-link">
              Editar cadastro
            </Link>
          )}
      </nav>

      <h1>
        <Link to={"/"} className="nav-title-link">
          {" "}
          Ponte de Gerações{" "}
        </Link>
      </h1>

      <nav className="nav-right">
        {userType === "default" &&
          !isRegisterPage &&
          !isLoginPage &&
          !isEditRegistrationPage &&
          !isProfilePage && (
            <Link to="/register" className="nav-link">
              Cadastre-se
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

    </header>
  );
};

export default Header;
