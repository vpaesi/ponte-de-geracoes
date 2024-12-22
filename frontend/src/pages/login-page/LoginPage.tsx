import React, { useState } from "react";
import "./LoginPage.css";
import { useUser } from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberPassword });

    let userType: "ajudante" | "ajudado" | null = null;
    let userId: number | null = null;

    if (email === "helper@gmail.com") {
      userType = "ajudante";
      userId = 65;
    } else if (email === "assisted@gmail.com") {
      userType = "ajudado";
      userId = 2;
    }

    if (userType) {
      setUser({
        id: userId,
        userType: userType,
        name: "super user",
        email: email,
      });
    }
    navigate("/profile");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>ENTRE NA SUA CONTA</h2>
        <p>Entre usando seu email e senha cadastrados</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                className="input-icon"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@exemplo.com"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                className="input-icon"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17c.83 0 1.5-.67 1.5-1.5S12.83 14 12 14s-1.5.67-1.5 1.5S11.17 17 12 17zm6-10h-1V6c0-2.21-1.79-4-4-4s-4 1.79-4 4v1H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2v1h-4V6c0-1.1.9-2 2-2zm6 14H6V9h12v10z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite a senha cadastrada"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 4.5C7.8 4.5 4.14 7.11 2.22 11c1.92 3.89 5.58 6.5 9.78 6.5s7.86-2.61 9.78-6.5C19.86 7.11 16.2 4.5 12 4.5zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 6.5c-3.33 0-6.31 1.33-8.48 3.5C5.69 12.17 8.67 13.5 12 13.5c3.33 0 6.31-1.33 8.48-3.5C18.31 7.83 15.33 6.5 12 6.5zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="checkbox-group">
            <label className="switch">
              <input
                type="checkbox"
                id="rememberPassword"
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              />
              <span className="slider round"></span>
            </label>
            <label htmlFor="rememberPassword" className="checkbox-label">
              Lembrar minha senha
            </label>
          </div>

          <div className="forgot-password">
            <a href="#">Esqueceu sua senha?</a>
          </div>
          <button type="submit" className="btn-primary">
            ENTRAR
          </button>
        </form>
        <div className="signup-link">
          <p>
            Ainda não possui cadastro? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
