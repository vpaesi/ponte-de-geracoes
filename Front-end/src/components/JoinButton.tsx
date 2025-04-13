import React from "react";
import { Link } from "react-router-dom";

const JoinButton: React.FC = () => {
  const isRegistered = false; // Simulação de estado para verificar se o usuário está cadastrado

  if (isRegistered) return null;

  return (
    <div className="text-center mt-4">
      <Link
        to="/register"
        className="btn"
        style={{
          backgroundColor: "var(--highlight-color)",
          color: "white",
        }}
      >
        Quero fazer parte do Ponte de Gerações
      </Link>
    </div>
  );
};

export default JoinButton;