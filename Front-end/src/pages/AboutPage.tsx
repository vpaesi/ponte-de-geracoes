import React from "react";
import JoinButton from "../components/JoinButton";

const AboutPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <section className="text-center mb-5">
        <h1>Sobre o Ponte de Gerações</h1>
        <p>
          O Ponte de Gerações é uma plataforma que conecta idosos com
          necessidades específicas a pessoas dispostas a ajudar, promovendo
          solidariedade e impacto social.
        </p>
      </section>

      <section className="row">
        <div className="col-md-6">
          <h3>Missão</h3>
          <p>
            Facilitar conexões entre gerações, promovendo apoio mútuo e
            aprendizado.
          </p>
        </div>
        <div className="col-md-6">
          <h3>Visão</h3>
          <p>
            Ser a principal plataforma de conexão entre gerações no Brasil,
            criando uma sociedade mais solidária.
          </p>
        </div>
      </section>

      <section className="text-center mt-5">
        <JoinButton text="Quero fazer parte dessa missão!" />
      </section>
    </div>
  );
};

export default AboutPage;