import React from "react";
import { Link } from "react-router-dom";

interface Address {
  city: string;
}

interface Registered {
  id: number;
  name: string;
  birthDate: string;
  profileImageUrl?: string;
  address: Address;
  aboutYou: string;
  availableDays: string[];
}

interface UserCardProps {
  person: Registered;
  showContactButton?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ person, showContactButton = true }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={person.profileImageUrl || "default-profile.jpg"}
          className="card-img-top"
          alt={person.name || "Usuário"}
        />
        <div className="card-body">
          <h5 className="card-title">
            {person.name},{" "}
            {new Date().getFullYear() -
              new Date(person.birthDate).getFullYear()}{" "}
            anos
          </h5>
          <p className="card-text">
            <i className="fas fa-location-dot"></i> {person.address.city}/RS
          </p>
          <p className="card-text">
            {person.aboutYou || "Sem descrição disponível."}
          </p>
        </div>
        <div className="card-footer">
          <p>
            <b>Disponível nos dias:</b> {person.availableDays.join(", ")}
          </p>
          {showContactButton && (
            <Link to={`/profile/${person.id}`} className="btn btn-primary w-100">
              Entrar em contato
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;