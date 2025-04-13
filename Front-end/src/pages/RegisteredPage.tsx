import React, { useState, useEffect } from "react";
import axios from "axios";
import urlFetch from "../components/Fetch";
import Filters from "../components/Filters";
import UserCard from "../components/UserCard";
import PaginationControls from "../components/PaginationControls";
import JoinButton from "../components/JoinButton";

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
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("helper");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch de cidades baseado em registros disponíveis no banco
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);

        const helperResponse = await axios.get<{ content: Registered[] }>(
          `${urlFetch}/helper`,
          { params: { size: 1000 } }
        );

        const assistedResponse = await axios.get<{ content: Registered[] }>(
          `${urlFetch}/assisted`,
          { params: { size: 1000 } }
        );

        const helperCities =
          helperResponse?.data?.content?.map(
            (person) => person.address?.city || ""
          ) || [];

        const assistedCities =
          assistedResponse?.data?.content?.map(
            (person) => person.address?.city || ""
          ) || [];

        const uniqueCities = Array.from(
          new Set([...helperCities, ...assistedCities])
        ).sort((a, b) => a.localeCompare(b));

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
          city: selectedCity || undefined,
        };

        const response = await axios.get<{
          content: Registered[];
          page: PageInfo;
        }>(`${urlFetch}/${endpoint}`, { params });

        if (response.status === 200 && response.data) {
          setRegistered(response.data.content || []);
          setTotalPages(response.data?.page?.totalPages || 1);
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

  return (
    <div className="container">
      <div className="text-center my-4">
        <h3>Conheça os usuários cadastrados da Ponte de Gerações</h3>
      </div>

      <Filters
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setPage={setPage}
        cities={cities}
      />

      <div className="row">
        {loading ? (
          <div className="text-center">
            <p>Carregando...</p>
          </div>
        ) : registered.length > 0 ? (
          registered.map((person) => (
            <UserCard key={person.id} person={person} />
          ))
        ) : (
          <div className="text-center">
            <p>Nenhum dado encontrado.</p>
          </div>
        )}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <JoinButton />
    </div>
  );
};

export default RegisteredPage;
