import React, { useEffect, useState } from "react";
import axios from "axios";
import urlFetch from "../components/Fetch";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import Filters from "../components/Filters";
import UserCard from "../components/UserCard";
import PaginationControls from "../components/PaginationControls";

interface Address {
  city: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

interface UserProfile {
  id: number;
  name: string;
  birthDate: string;
  rg: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  availableDays: string[];
  aboutYou: string;
  profileImageUrl: string;
  available: boolean;
  address: Address;
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useUser();
  const { id, userType } = user || {};
  const userId = id;

  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedConnection, setSelectedConnection] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const totalPages = 5;

  const skills = ["Comunicação", "Empatia", "Resolução de Problemas"];
  const connectionTypes = ["Amigos", "Mentores", "Ajudados"];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = userType === "ajudante" ? "helper" : "assisted";
        const response = await axios.get<UserProfile>(
          `${urlFetch}/${endpoint}/${userId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId, userType]);

  if (!userProfile) {
    return <div>Carregando perfil...</div>;
  }

  const userConnections = [
    {
      id: 1,
      name: "João Silva",
      birthDate: "1980-05-15",
      profileImageUrl: "joao.jpg",
      address: { city: "Porto Alegre" },
      aboutYou: "Gosto de ajudar idosos com tarefas do dia a dia.",
      availableDays: ["Segunda", "Quarta"],
    },
    {
      id: 2,
      name: "Maria Oliveira",
      birthDate: "1990-08-20",
      profileImageUrl: "maria.jpg",
      address: { city: "Canoas" },
      aboutYou: "Tenho experiência em cuidados com idosos.",
      availableDays: ["Terça", "Quinta"],
    },
  ];

  return (
    <><div className="container mt-5">
      <h3>Perfil do Usuário</h3>
      <Filters
        filters={[
          {
            label: "Filtrar por habilidade:",
            value: selectedSkill,
            options: [
              { label: "Todas as habilidades", value: "" },
              ...skills.map((skill) => ({ label: skill, value: skill })),
            ],
            onChange: setSelectedSkill,
          },
          {
            label: "Filtrar por conexão:",
            value: selectedConnection,
            options: [
              { label: "Todas as conexões", value: "" },
              ...connectionTypes.map((connectionType) => ({
                label: connectionType,
                value: connectionType,
              })),
            ],
            onChange: setSelectedConnection,
          },
        ]}
      />
      <div className="text-center mb-4">
        <img
          src={userProfile.profileImageUrl}
          alt={`Foto de perfil de ${userProfile.name}`}
          className="rounded-circle img-thumbnail"
          style={{ width: "150px", height: "150px" }} />
        <Link to={"/edit-registration"} className="btn btn-primary mt-3">
          Editar perfil
        </Link>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card"></div>
          <div className="card-header">
            <h5>Dados pessoais</h5>
          </div>
          <div className="card-body">
            <p>
              <b>Nome:</b> {userProfile.name}
            </p>
            <p>
              <b>Data de nascimento:</b>{" "}
              {new Date(userProfile.birthDate).toLocaleDateString()}
            </p>
            <p>
              <b>RG:</b> {userProfile.rg}
            </p>
            <p>
              <b>CPF:</b> {userProfile.cpf}
            </p>
            <p>
              <b>Telefone:</b> {userProfile.phone}
            </p>
            <p>
              <b>Email:</b> {userProfile.email}
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-header">
            <h5>Endereço</h5>
          </div>
          <div className="card-body">
            <p>
              <b>Cidade:</b> {userProfile.address.city}/RS
            </p>
            <p>
              <b>CEP:</b> {userProfile.address.zipCode}
            </p>
            <p>
              <b>Logradouro:</b> {userProfile.address.street}
            </p>
            <p>
              <b>Número:</b> {userProfile.address.number}
            </p>
            <p>
              <b>Complemento:</b> {userProfile.address.complement}
            </p>
          </div>
        </div>
      </div>
    </div><div className="card">
        <div className="card-header">
          <h5>Disponibilidade e habilidades</h5>
        </div>
        <div className="card-body">
          <p>
            <b>Dias disponíveis:</b> {userProfile.availableDays.join(", ")}
          </p>
          <p>
            <b>Habilidades:</b> {userProfile.aboutYou}
          </p>
          <p>
            <b>Disponível para ajudar:</b> {userProfile.available ? "Sim" : "Não"}
          </p>
        </div>
      </div><div className="row">
        {userConnections.map((connection) => (
          <UserCard key={connection.id} person={connection} />
        ))}
      </div><PaginationControls
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        prevText="Página Anterior"
        nextText="Próxima Página" /></>
  );
};

export default ProfilePage;
