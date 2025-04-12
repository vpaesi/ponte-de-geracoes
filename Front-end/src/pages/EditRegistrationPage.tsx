import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFields } from "../utils/ValidateFields";
import urlFetch from "../components/Fetch";
import { useUser } from "../utils/UserContext";
import SubmitButton from "../components/SubmitButton";

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
  const [profileImagePreview] = useState<File | null>(null);
  const [availableDays, setAvailableDays] = useState<string[]>([]);


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
    <><div className="container mt-5"></div><h1 className="text-center mb-4">Editar Cadastro</h1><form onSubmit={handleUpdate}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nome Completo
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="invalid-feedback">Nome é obrigatório</div>}
      </div>
      {/* Continue substituindo os campos com classes do Bootstrap */}
      <SubmitButton label="Atualizar cadastro" />
    </form>
    </>
  );
};

export default EditRegistrationPage;
