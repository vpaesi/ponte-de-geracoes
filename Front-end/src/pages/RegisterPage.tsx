import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleCepBlur } from "../utils/ValidadeCep";
import { validateFields } from "../utils/ValidateFields";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [rg] = useState<string>("");
  const [cpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password] = useState<string>("");
  const [confirmPassword] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [complement] = useState<string>("");
  const [userType] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseFormValues = {
      name,
      birthDate,
      rg,
      cpf,
      email,
      phone,
      password,
      confirmPassword,
      dob: birthDate,
      availableDays: [],
      address: {
        street,
        number,
        complement,
        zipCode,
        city,
        neighborhood,
      },
      userType,
    };

    if (!validateFields(baseFormValues, setErrors)) return;

    try {
      const endpoint = userType === "ajudante" ? "/helper" : "/assisted";
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseFormValues),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados");
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/registered");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro ao realizar o cadastro.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <section className="text-center mb-4">
        <h1>CADASTRE-SE</h1>
        <p>
          Já é cadastrado?{" "}
          <Link to="/login" className="text-primary">
            Entrar
          </Link>
        </p>
      </section>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend>Dados Pessoais</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Nome Completo</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <div className="invalid-feedback">Nome é obrigatório</div>
              )}
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">Email é obrigatório</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label>Nascimento</label>
              <input
                type="date"
                className={`form-control ${
                  errors.birthDate ? "is-invalid" : ""
                }`}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              {errors.birthDate && (
                <div className="invalid-feedback">
                  Data de nascimento é obrigatória
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label>Celular</label>
            <input
              type="number"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              placeholder="51999999999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <div className="invalid-feedback">Celular é obrigatório</div>
            )}
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend>Endereço</legend>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>CEP</label>
              <input
                type="text"
                className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
                placeholder="99999-999"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onBlur={() =>
                  handleCepBlur(zipCode, setStreet, setCity, setNeighborhood)
                }
              />
              {errors.zipCode && (
                <div className="invalid-feedback">CEP é obrigatório</div>
              )}
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Finalizar cadastro
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
