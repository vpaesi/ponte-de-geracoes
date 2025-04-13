import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import urlFetch from "../components/Fetch";
import BenefitsForAssisted from "../components/BenefitsForAssisted";
import BenefitsForHelpers from "../components/BenefitsForHelpers";
import { useUser } from "../utils/UserContext";
import JoinButton from "../components/JoinButton";

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
    <div className="bg-light min-vh-100">
      <section className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5 px-3">
        <div className="text-center text-md-start">
          <h1 className="display-4 fw-bold text-dark">
            Pontes que aproximam e transformam vidas.
          </h1>
          <p className="text-secondary mt-3">
            Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
            necessidades específicas a pessoas dispostas a ajudar.
          </p>
          <div className="mt-4">
            {userType === "default" ? (
              <JoinButton text="Cadastre-se agora!" link="/register" />
            ) : (
                <Link
                to="/registered"
                className="btn btn-lg"
                style={{ 
                  backgroundColor: "var(--highlight-color)", 
                  transition: "background-color 0.3s ease" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "hsl(11deg 59.61% 65%)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--highlight-color)"}
                >
                Conheça nossos cadastrados
                </Link>
            )}
          </div>
        </div>       
      </section>

      <hr />

      <section className="container my-5">
        <h2 className="text-center">Benefícios para os ajudados</h2>
        <BenefitsForAssisted />
      </section>

      <hr />

      <section className="container my-5">
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
        <div className="text-center mt-3">
          <Link to={"/registered"} className="btn btn-link">
            Conheça mais ajudantes
          </Link>
        </div>
      </section>

      <hr />

      <section className="container my-5">
        <h2 className="text-center">Benefícios para os ajudantes</h2>
        <BenefitsForHelpers />
      </section>
    </div>
  );
};

export default HomePage;
