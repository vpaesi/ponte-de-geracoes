import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Images } from "../assets/Images";
import Carousel from "../components/Carousel";
import urlFetch from "../components/Fetch";
import BenefitsForAssisted from "../components/BenefitsForAssisted";
import BenefitsForHelpers from "../components/BenefitsForHelpers";
import { useUser } from "../utils/UserContext";

const HomePage = () => {
  interface Helper {
    name: string;
    birthDate: string;
    profileImageUrl: string;
    aboutYou: string;
  }

  const [helpers, setHelpers] = useState<Helper[]>([]);
  const { user } = useUser();
  const { userType } = user || {};

  const fetchHelpers = async () => {
    try {
      const response = await fetch(`${urlFetch}/helper`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      setHelpers(data.content);
    } catch (error) {
      console.error("Erro ao buscar ajudantes:", error);
    }
  };

  useEffect(() => {
    fetchHelpers();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">
            Pontes que aproximam e transformam vidas.
          </h1>
          <p className="text-gray-600 mt-4">
            Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
            necessidades específicas a pessoas dispostas a ajudar.
          </p>
          <div className="mt-6">
            {userType === "default" ? (
              <Link
                to="/register"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Suba agora nessa ponte
              </Link>
            ) : (
              <Link
                to="/registered"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
              >
                Conheça nossos cadastrados
              </Link>
            )}
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src={Images.headerImg}
            alt="Imagem do cabeçalho"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <hr />

      <section className="row row-2">
        <h2>Benefícios para os ajudados</h2>
        <BenefitsForAssisted />
      </section>

      <hr />

      <section className="row row-3">
        <Carousel
          title="Conheça alguns dos nossos ajudantes"
          registered={helpers.map((helper) => ({
            name: helper.name,
            age:
              new Date().getFullYear() -
              new Date(helper.birthDate).getFullYear(),
            img: "//localhost:8080" + helper.profileImageUrl,
            description: helper.aboutYou,
          }))}
        />
        <Link to={"/registered"} className="row3-link">
          Conheça mais ajudantes
        </Link>
      </section>

      <hr />

      <section className="row row-4">
        <h2>Benefícios para os ajudantes</h2>
        <BenefitsForHelpers />
      </section>
    </div>
  );
};

export default HomePage;
