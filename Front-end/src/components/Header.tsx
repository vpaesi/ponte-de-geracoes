import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";

const Header = () => {
  const { user } = useUser();
  const { userType } = user || {};

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold text-gray-800 ml-4">
            <Link to="/">Ponte de Gerações</Link>
          </h1>
        </div>
        <nav className="flex space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Página Inicial
          </Link>
          {userType === "default" && (
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Cadastre-se
            </Link>
          )}
          {userType !== "default" && (
            <Link
              to="/registered"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Cadastrados
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
