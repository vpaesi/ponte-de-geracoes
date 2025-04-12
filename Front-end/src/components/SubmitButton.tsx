import React from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
    <button type="submit" className="btn btn-primary">
      {label}
    </button>
  );
};

export default SubmitButton;
