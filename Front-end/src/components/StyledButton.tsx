import React from "react";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="btn btn-setas"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StyledButton;