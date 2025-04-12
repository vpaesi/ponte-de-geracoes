import React from "react";

interface AvailableDaysSelectorProps {
  availableDays: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, day: string) => void;
}

const AvailableDaysSelector: React.FC<AvailableDaysSelectorProps> = ({
  availableDays,
  handleChange,
}) => {
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  return (
    <div className="availableDays-days">
      {days.map((day) => (
        <label key={day}>
          <input
            type="checkbox"
            name="availableDaysDay"
            value={day}
            checked={availableDays.includes(day)}
            onChange={(e) => handleChange(e, day)}
          />
          {day}
        </label>
      ))}
    </div>
  );
};

export default AvailableDaysSelector;
