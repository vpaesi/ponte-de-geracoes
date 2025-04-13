import React from "react";
import { Link } from "react-router-dom";

interface JoinButtonProps {
  text?: string;
  link?: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({
  text = "Quero fazer parte do Ponte de Gerações",
  link = "/register",
}) => {
  const isRegistered = false;

  if (isRegistered) return null;

  return (
    <div className="text-center mt-4">
      <Link
        to={link}
        className="btn"
        style={{
          backgroundColor: "var(--highlight-color)",
          color: "white",
        }}
      >
        {text}
      </Link>
    </div>
  );
};

export default JoinButton;