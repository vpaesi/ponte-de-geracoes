import React from "react";

interface FiltersProps {
  filters: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
  }[];
}

const Filters: React.FC<FiltersProps> = ({ filters }) => {
  return (
    <div className="row mb-4">
      {filters.map((filter, index) => (
        <div className="col-md-6" key={index}>
          <label className="form-label">{filter.label}</label>
          <select
            className="form-select"
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
          >
            {filter.options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Filters;