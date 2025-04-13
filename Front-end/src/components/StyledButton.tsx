import React from "react";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="btn"
      style={{
      color: "var(--highlight-color)",
      borderColor: "var(--highlight-color)",
      backgroundColor: "transparent",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
      e.currentTarget.style.color = "white";
      e.currentTarget.style.borderColor = "var(--highlight-color)";
      e.currentTarget.style.backgroundColor = "var(--highlight-color)";
      }}
      onMouseLeave={(e) => {
      e.currentTarget.style.color = "var(--highlight-color)";
      e.currentTarget.style.borderColor = "var(--highlight-color)";
      e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </button>
  );
};

export default StyledButton;