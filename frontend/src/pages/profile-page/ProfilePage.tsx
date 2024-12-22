import React, { useEffect, useState } from "react";
import axios from "axios";
import urlFetch from "../../components/fetch/Fetch";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
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

  return (
    <div className="profile-page">
      <img
        src={userProfile.profileImageUrl}
        alt={`Foto de perfil de ${userProfile.name}`}
        className="profile-page-img"
      />
      <Link to={"/edit-registration"} className="link-edit-registration">
        Editar perfil
      </Link>
      {/* <Link to = {`/edit-registration/${userId}`}>Editar perfil</Link> */}
      <div className="all-information">
        <div className="personal-information">
          <h1>Dados pessoais</h1>
          <p>
            <b>Nome:</b> {userProfile.name}
          </p>
          <p>
            <b>Data de nascimento:</b>{" "}
            {new Date(userProfile.birthDate).toLocaleDateString()}
          </p>
          <p>
            <b>RG: </b>
            {userProfile.rg}
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

        <div className="personal-address">
          <h1>Endereço</h1>
          <p>
            <b>Cidade:</b> {userProfile.address.city}/RS
          </p>
          <p>
            <b>CEP: </b>
            {userProfile.address.zipCode}
          </p>
          <p>
            <b>Logradouro: </b>
            {userProfile.address.street}
          </p>
          <p>
            <b>Número: </b>
            {userProfile.address.number}
          </p>
          <p>
            <b>Complemento: </b>
            {userProfile.address.complement}
          </p>
        </div>
      </div>

      <div className="availability-skills">
        <h1>Disponibilidade e habilidades</h1>
        <p>
          <b>Dias disponíveis:</b> {userProfile.availableDays.join(", ")}
        </p>
        <p>
          <b>Habilidades: </b>
          {userProfile.aboutYou}
        </p>
        <p>
          <b>Disponível para ajudar:</b> {userProfile.available ? "Sim" : "Não"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
