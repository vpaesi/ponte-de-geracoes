import React from "react";
import "./BenefitCard.css";

interface BenefitCardProps {
  title: string;
  description: string;
  icon?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon }) => {
  return (
    <div className="benefit-card">
      <div className="benefit-header">
        {icon && <img src={icon} alt={`Ícone para ${title}`} className="benefit-icon" />}
        <h3>{title}</h3>
      </div>
      <p className="benefit-description">{description}</p>
    </div>
  );
};

export default BenefitCard;
