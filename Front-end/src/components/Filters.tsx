import React from "react";

interface FiltersProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  cities: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedUser,
  setSelectedUser,
  selectedCity,
  setSelectedCity,
  setPage,
  cities,
}) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <label htmlFor="user-filter" className="form-label">
          Filtrar por tipo de usuário:
        </label>
        <select
          className="form-select"
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            setPage(0);
          }}
        >
          <option value="assisted">Ajudados</option>
          <option value="helper">Ajudantes</option>
        </select>
      </div>

      <div className="col-md-6">
        <label htmlFor="city-filter" className="form-label">
          Filtrar por cidade:
        </label>
        <select
          className="form-select"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setPage(0);
          }}
        >
          <option value="">Todas as cidades</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;