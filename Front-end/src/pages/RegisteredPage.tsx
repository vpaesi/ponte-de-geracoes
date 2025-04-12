import React, { useState, useEffect } from "react";
import axios from "axios";
import urlFetch from "../components/Fetch";
import { Link } from "react-router-dom";

interface Address {
  city: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

interface Registered {
  id: number;
  name: string;
  birthDate: string;
  profileImageUrl?: string;
  availableDays: string[];
  aboutYou: string;
  address: Address;
}

interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

const RegisteredPage: React.FC = () => {
  const [registered, setRegistered] = useState<Registered[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [, setTotalItems] = useState<number>(0);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("helper");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch de cidades baseado em registros disponíveis no banco
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);

        // Buscar os ajudantes e ajudados para determinar as cidades disponíveis
        const helperResponse = await axios.get<{ content: Registered[] }>(
          `${urlFetch}/helper`,
          { params: { size: 1000 } }
        );

        const assistedResponse = await axios.get<{ content: Registered[] }>(
          `${urlFetch}/assisted`,
          { params: { size: 1000 } }
        );

        // Extrair cidades de ambos os conjuntos de dados
        const helperCities = helperResponse?.data?.content?.map(
          (person) => person.address?.city || ""
        ) || [];

        const assistedCities = assistedResponse?.data?.content?.map(
          (person) => person.address?.city || ""
        ) || [];

        // Combinar e remover duplicatas
        const uniqueCities = Array.from(new Set([...helperCities, ...assistedCities]))
          .sort((a, b) => a.localeCompare(b));

        setCities(uniqueCities);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Fetch dos dados filtrados
  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        setLoading(true);

        const endpoint = selectedUser === "helper" ? "helper" : "assisted";
        const params = {
          page,
          size: 10,
          city: selectedCity || undefined, // Filtra apenas se houver cidade selecionada
        };

        const response = await axios.get<{
          content: Registered[];
          page: PageInfo;
        }>(`${urlFetch}/${endpoint}`, { params });

        if (response.status === 200 && response.data) {
          setRegistered(response.data.content || []);
          setTotalPages(response.data?.page?.totalPages || 1);
          setTotalItems(response.data?.page?.totalElements || 0);
        } else {
          console.error("Erro ao buscar dados. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [page, selectedCity, selectedUser]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="container">
        <div className="text-center my-4">
          <h3>Conheça os usuários cadastrados da Ponte de Gerações</h3>
        </div>

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
          } }
        >
          <option value="assisted">Ajudados</option>
          <option value="helper">Ajudantes</option>
        </select>
      </div>

      <div className="col-md-6"></div>
    <label htmlFor="city-filter" className="form-label">
      Filtrar por cidade:
    </label>
    <select
      className="form-select"
      value={selectedCity}
      onChange={(e) => {
        setSelectedCity(e.target.value);
        setPage(0);
      } }
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

      <div className="row">
        {loading ? (
          <div className="text-center">
            <p>Carregando...</p>
          </div>
        ) : registered.length > 0 ? (
          registered.map((person) => (
            <div className="col-md-4 mb-4" key={person.id}>
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
                  <Link to={`/profile/${person.id}`} className="btn btn-primary w-100">
                    Entrar em contato
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>Nenhum dado encontrado.</p>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center my-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            <i className="fas fa-chevron-left"></i> Anterior
          </button>

          <span>
            Página {page + 1} de {totalPages}
          </span>

          <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= totalPages}
          >
            Próxima <i className="fas fa-chevron-right"></i>
          </button>
        <div className="text-center mt-4">
            <p>
              Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
              necessidades específicas a pessoas dispostas a ajudar.
            </p>
            <a href="/register" className="btn btn-success">
              Suba agora nessa ponte
            </a>
          </div>
      </div>
    </>
  );
};

export default RegisteredPage;
