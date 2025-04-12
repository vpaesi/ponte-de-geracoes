import React from "react";

interface AddressFieldsProps {
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  city: string;
  neighborhood: string;
  errors: Record<string, boolean>;
  setStreet: (value: string) => void;
  setNumber: (value: string) => void;
  setComplement: (value: string) => void;
  setZipCode: (value: string) => void;
  setCity: (value: string) => void;
  setNeighborhood: (value: string) => void;
  handleCepBlur: () => void;
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  street,
  number,
  complement,
  zipCode,
  city,
  neighborhood,
  errors,
  setNumber,
  setComplement,
  setZipCode,  
  handleCepBlur,
}) => {
  return (
    <fieldset>
      <legend>Endereço</legend>
      <div className="form-row address">
        <div>
          <label htmlFor="zipCode">CEP</label>
          <input
            id="zipCode"
            type="text"
            placeholder="99999-999"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            onBlur={handleCepBlur}
            className={errors.zipCode ? "input-error" : ""}
            aria-invalid={errors.zipCode}
            aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
          />
          {errors.zipCode && (
            <span id="zipCode-error" className="error-message">
              CEP é obrigatório
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city">Cidade</label>
          <input
            id="city"
            type="text"
            value={city}
            readOnly
            className={errors.city ? "input-error" : ""}
            aria-invalid={errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <span id="city-error" className="error-message">
              Cidade é obrigatória
            </span>
          )}
        </div>
        <div>
          <label htmlFor="neighborhood">Bairro</label>
          <input
            id="neighborhood"
            type="text"
            value={neighborhood}
            readOnly
            className={errors.neighborhood ? "input-error" : ""}
            aria-invalid={errors.neighborhood}
            aria-describedby={errors.neighborhood ? "neighborhood-error" : undefined}
          />
          {errors.neighborhood && (
            <span id="neighborhood-error" className="error-message">
              Bairro é obrigatório
            </span>
          )}
        </div>
        <div>
          <label htmlFor="street">Logradouro</label>
          <input
            id="street"
            type="text"
            value={street}
            readOnly
            className={errors.street ? "input-error" : ""}
            aria-invalid={errors.street}
            aria-describedby={errors.street ? "street-error" : undefined}
          />
          {errors.street && (
            <span id="street-error" className="error-message">
              Logradouro é obrigatório
            </span>
          )}
        </div>
        <div>
          <label htmlFor="number">Número</label>
          <input
            id="number"
            type="number"
            placeholder="123"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={errors.number ? "input-error" : ""}
            aria-invalid={errors.number}
            aria-describedby={errors.number ? "number-error" : undefined}
          />
          {errors.number && (
            <span id="number-error" className="error-message">
              Número é obrigatório
            </span>
          )}
        </div>
        <div>
          <label htmlFor="complement">Complemento</label>
          <input
            id="complement"
            type="text"
            placeholder="Casa 2, Bloco A"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default AddressFields;
