import React, { useEffect, useState } from "react";
import "../register-page/RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { handleCepBlur } from "../../utils/validate-cep/ValidadeCep";
import { validateFields } from "../../utils/validate-fields/ValidateFields";
import urlFetch from "../../components/fetch/Fetch";
import { useUser } from "../../utils/UserContext";

const EditRegistrationPage: React.FC = () => {
  const { user } = useUser();
  const { id } = user || {};
  const userType = user.userType;
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [aboutYou, setAboutYou] = useState<string>("");
  const [skillsNeeds, setSkillsNeeds] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [profileImagePreview, setProfileImagePreview] = useState<File | null>(
    null
  );
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  const handleavailableDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    if (event.target.checked) {
      setAvailableDays([...availableDays, day]);
    } else {
      setAvailableDays(availableDays.filter((d) => d !== day));
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchRegisteredData = async () => {
      try {
        const endpoint = userType === "ajudante" ? "helper" : "assisted";

        const response = await fetch(`${urlFetch}/${endpoint}/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar dados do cadastro.");
        }

        const data = await response.json();
        console.log(typeof data);
        setName(data.name);
        setBirthDate(data.birthDate);
        setRg(data.rg);
        setCpf(data.cpf);
        setEmail(data.email);
        setPhone(data.phone);
        setPassword(data.password);
        setConfirmPassword(data.password);
        setStreet(data.address.street);
        setNumber(data.address.number);
        setComplement(data.address.complement);
        setZipCode(data.address.zipCode);
        setCity(data.address.city);
        setNeighborhood(data.address.neighborhood);
        setAboutYou(data.aboutYou);
        setAvailableDays(data.availableDays);
        if (userType === "ajudante") {
          setSkillsNeeds(data.skills);
        } else {
          setSkillsNeeds(data.needs);
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar os dados do cadastro.");
      }
    };

    fetchRegisteredData();
  }, [id, userType]);

  const handleUpdate = async (e: React.FormEvent) => {
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
      availableDays,
      address: {
        street,
        number,
        complement,
        zipCode,
        city,
        neighborhood,
      },
      userType: userType,
      aboutYou,
      ...(userType === "ajudante"
        ? { skills: skillsNeeds }
        : { needs: skillsNeeds }),
    };

    if (!validateFields(baseFormValues, setErrors)) {
      return;
    }

    try {
      const endpoint = user.userType === "ajudante" ? "helper" : "assisted";
      const response = await fetch(`${urlFetch}/${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseFormValues),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados");
      }

      const createdUser = await response.json();
      const userId = createdUser.id;

      if (profileImagePreview && userId) {
        await uploadProfileImage(userType, userId, profileImagePreview);
      }

      alert("Cadastro atualizado com sucesso!");
      navigate("/registered");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro ao realizar o cadastro.");
      }
    }
  };

  const uploadProfileImage = async (
    userType: string,
    userId: string,
    image: File
  ) => {
    const formDataImage = new FormData();
    formDataImage.append("file", image);

    const endpoint =
      userType === "ajudante"
        ? `/helper/upload-image/${userId}`
        : `/assisted/upload-image/${userId}`;

    const response = await fetch(`${urlFetch}${endpoint}`, {
      method: "POST",
      body: formDataImage,
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer o upload da imagem");
    }
  };

  return (
    <div className="cadastro-container">
      <section className="apresentacao">
        <h1>EDITAR CADASTRO</h1>
      </section>

      <form onSubmit={handleUpdate} className="cadastro-form">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="form-row nome-email">
            <div>
              <p>Nome Completo</p>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && (
                <span className="error-message">Nome é obrigatório</span>
              )}
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">Email é obrigatório</span>
              )}
            </div>
          </div>

          <div className="form-row phone-dob-rg-cpf">
            <div>
              <p>Nascimento</p>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className={errors.birthDate ? "input-error" : ""}
              />
              {errors.birthDate && (
                <span className="error-message">
                  Data de nascimento é obrigatória
                </span>
              )}
            </div>
            <div>
              <p>Celular</p>
              <input
                type="number"
                placeholder="51999999999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && (
                <span className="error-message">Celular é obrigatório</span>
              )}
            </div>
            <div>
              <p>RG</p>
              <input
                type="text"
                placeholder="1234567891"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                className={errors.rg ? "input-error" : ""}
              />
              {errors.rg && (
                <span className="error-message">RG é obrigatório</span>
              )}
            </div>
            <div>
              <p>CPF</p>
              <input
                type="text"
                placeholder="12345678901"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className={errors.cpf ? "input-error" : ""}
              />
              {errors.cpf && (
                <span className="error-message">CPF é obrigatório</span>
              )}
            </div>
          </div>
          <div className="form-row upload-password-confirm">
            <div>
              <p>Upload de imagem</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setProfileImagePreview(e.target.files[0]);
                  }
                }}
                className={errors.profileImage ? "input-error" : ""}
              />
              {errors.profileImage && (
                <span className="error-message">Imagem é obrigatória</span>
              )}
            </div>
            <div>
              <p>Senha</p>
              <input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-message">Senha é obrigatória</span>
              )}
            </div>
            <div>
              <p>Confirme sua senha</p>
              <input
                type="password"
                placeholder="Digite novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">As senhas não coincidem</span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div className="form-row address">
            <div>
              <p>CEP</p>
              <input
                type="text"
                placeholder="99999-999"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onBlur={() =>
                  handleCepBlur(zipCode, setStreet, setCity, setNeighborhood)
                }
                className={errors.zipCode ? "input-error" : ""}
              />
              {errors.zipCode && (
                <span className="error-message">CEP é obrigatório</span>
              )}
            </div>
            <div>
              <p>Cidade</p>
              <input
                type="text"
                placeholder="Digite sua cidade"
                value={city}
                readOnly
                className={errors.city ? "input-error" : ""}
              />
              {errors.city && (
                <span className="error-message">Cidade é obrigatória</span>
              )}
            </div>
            <div>
              <p>Logradouro</p>
              <input
                type="text"
                placeholder="Avenida Exemplo de Rua"
                value={street}
                readOnly
                className={errors.address ? "input-error" : ""}
              />
              {errors.address && (
                <span className="error-message">Logradouro é obrigatório</span>
              )}
            </div>
          </div>
          <div className="form-row address">
            <div className="form-address-number">
              <div>
                <p>Número</p>
                <input
                  type="number"
                  placeholder="123"
                  value={number}
                  id="number"
                />
              </div>
              <div>
                <p>Complemento</p>
                <input
                  type="text"
                  placeholder="Casa 2, Bloco A"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset id="userType">
          <legend>Sou...</legend>
          <div className="form-row">
            <div className="col-1">
              <div className="form-row user-type">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="ajudado"
                    disabled={true}
                    checked={userType === "ajudado"}
                  />
                  Ajudado
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="ajudante"
                    disabled={true}
                    checked={userType === "ajudante"}
                  />
                  Ajudante
                </label>
              </div>

              <div className="form-row availableDays">
              <div className="form-row user-available">
              <p>
                    {userType !== "ajudado"
                      ? "Estou disponível para ajudar no momento"
                      : "Estou precisando de ajuda no momento"}
                    :
                  </p>
                <label>
                  <input
                    type="radio"
                    name="available"
                    value="sim"
                    onChange={() => ("sim")}
                  />
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="available"
                    value="não"
                    onChange={() => ("não")}
                  />
                  Ainda não
                </label>
              </div>

                <div className="availableDays-title">
                  <p>
                    {userType !== "ajudado"
                      ? "Estou disponível nos dias"
                      : "Preciso de ajuda nos dias"}
                    :
                  </p>
                </div>
                <div className="availableDays-days">
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Domingo"
                      checked={availableDays.includes("Domingo")}
                      onChange={(e) => handleavailableDaysChange(e, "Domingo")}
                    />
                    Domingo
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Segunda"
                      checked={availableDays.includes("Segunda")}
                      onChange={(e) => handleavailableDaysChange(e, "Segunda")}
                    />
                    Segunda-feira
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Terça"
                      checked={availableDays.includes("Terça")}
                      onChange={(e) => handleavailableDaysChange(e, "Terça")}
                    />
                    Terça-feira
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Quarta"
                      checked={availableDays.includes("Quarta")}
                      onChange={(e) => handleavailableDaysChange(e, "Quarta")}
                    />
                    Quarta-feira
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Quinta"
                      checked={availableDays.includes("Quinta")}
                      onChange={(e) => handleavailableDaysChange(e, "Quinta")}
                    />
                    Quinta-feira
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Sexta"
                      checked={availableDays.includes("Sexta")}
                      onChange={(e) => handleavailableDaysChange(e, "Sexta")}
                    />
                    Sexta-feira
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="availableDaysDay"
                      value="Sábado"
                      checked={availableDays.includes("Sábado")}
                      onChange={(e) => handleavailableDaysChange(e, "Sábado")}
                    />
                    Sábado
                  </label>
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="form-row about">
                <div>
                  <p>Fale um pouco sobre você:</p>
                  <textarea
                    placeholder="Nos conte um pouco sobre você"
                    value={aboutYou}
                    onChange={(e) => setAboutYou(e.target.value)}
                  />
                </div>
                <div className="skillNeeds-textarea">
                  <p>
                    {`Suas ${
                      userType !== "ajudado" ? "Habilidades" : "Necessidades"
                    }:`}
                  </p>
                  <textarea
                    placeholder={`${
                      userType !== "ajudado"
                        ? "Gosto de ensinar e aprender com os outros"
                        : "Preciso de ajuda para ir ao mercado"
                    }`}
                    maxLength={90}
                    value={skillsNeeds}
                    onChange={(e) => setSkillsNeeds(e.target.value)}
                    className={errors.skillsNeeds ? "input-error" : ""}
                  />
                  <br />
                  <span className="obs-message">*Máximo de 90 caracteres</span>
                  {errors.skillsNeeds && (
                    <span className="error-message">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditRegistrationPage;
