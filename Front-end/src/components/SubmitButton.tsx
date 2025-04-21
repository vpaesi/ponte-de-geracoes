import React from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
    <div className="btn-submit-container">
    <button type="submit" className="btn-submit">
      {label}
    </button>
    </div>
  );
};

export default SubmitButton;
