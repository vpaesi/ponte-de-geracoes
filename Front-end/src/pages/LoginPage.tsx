import React, { useState } from "react";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import JoinButton from "../components/JoinButton";

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
    <><div className="container mt-5">
      <div className="row justify-content-center">
          <div className="card shadow" style={{ marginLeft: "5rem", marginRight: "5rem", width: "30rem", borderRadius: "1rem" }}>
    <div className="card-body" style={{ padding: "2rem" }}>
      <h2 className="card-title text-center">ENTRE NA SUA CONTA</h2>
      <p className="text-center">Entre usando seu email e senha cadastrados</p>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-envelope"></i>
          </span>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@exemplo.com"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-lock"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite a senha cadastrada"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="rememberPassword"
          className="form-check-input"
          checked={rememberPassword}
          onChange={() => setRememberPassword(!rememberPassword)}
        />
        <label htmlFor="rememberPassword" className="form-check-label">
          Lembrar minha senha
        </label>
      </div>      
      <SubmitButton label="Fazer Login" />
    </form>
    
      <div className="text-center mt-3"></div>
        <JoinButton text="Ainda não tem uma conta? Cadastre-se!" link="/register" />
    </div>
  </div>
      </div>
    </div></>
  );

}

export default Login
