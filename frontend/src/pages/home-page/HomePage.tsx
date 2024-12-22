import React, { useEffect, useState } from "react";
import "./HomePage.css";
import "../../components/benefit-card/BenefitCard.css";
import { Images } from "../../assets/Images";
import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import urlFetch from "../../components/fetch/Fetch";
import BenefitsForAssisted from "../../components/benefit-card/BenefitsForAssisted";
import BenefitsForHelpers from "../../components/benefit-card/BenefitsForHelpers";
import { useUser } from "../../utils/UserContext";

const App: React.FC = () => {
  const [helpers, setHelpers] = useState<any[]>([]);
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
    <div className="home-page">
      <section className="row row-1">
        <div className="column text-column">
          <h1>Pontes que aproximam e transformam vidas.</h1>
          <p>
            Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
            necessidades específicas a pessoas dispostas a ajudar.
          </p>
          {userType === "default" ? (
            <Link to="/register" className="row1-link">
              Suba agora nessa ponte
            </Link>
          ) : (
            <Link to="/registered" className="row1-link">
              Conheça nossos cadastrados
            </Link>
          )}
        </div>
        <div className="column image-column">
          <img src={Images.headerImg} alt="Imagem do cabeçalho" />
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
            // img: "//localhost:8080" + helper.profileImageUrl,
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

export default App;
