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
        color: "hsl(11deg 59.61% 75.95%)",
        borderColor: "hsl(11deg 59.61% 75.95%)",
        backgroundColor: "transparent",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "white";
        e.currentTarget.style.borderColor = "hsl(11deg 59.61% 75.95%)";
        e.currentTarget.style.backgroundColor = "hsl(11deg 59.61% 75.95%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "hsl(11deg 59.61% 75.95%)";
        e.currentTarget.style.borderColor = "hsl(11deg 59.61% 75.95%)";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </button>
  );
};

export default StyledButton;