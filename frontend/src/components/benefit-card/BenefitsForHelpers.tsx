import { Images } from '../../assets/Images';
import BenefitCard from '../../components/benefit-card/BenefitCard';

const BenefitsForHelpers = () => {
  const benefitsForHelpers = [
    {
      title: "Desenvolvimento Pessoal",
      description: "Aprendem com as experiências e histórias dos idosos, ganhando uma nova perspectiva sobre a vida.",
      icon: Images.iconStar,
    },
    {
      title: "Fortalecimento de Valores",
      description: "Desenvolvem empatia, paciência e responsabilidade ao ajudar quem precisa.",
      icon: Images.iconShield,
    },
    {
      title: "Reconhecimento Social",
      description: "Sentem-se valorizados ao fazer parte de um projeto que promove impacto positivo na sociedade.",
      icon: Images.iconTrophy,
    },
    {
      title: "Novas Habilidades",
      description: "Adquirem habilidades práticas, como comunicação e resolução de problemas, que podem ser úteis em outras áreas da vida.",
      icon: Images.iconBooks,
    },
    {
      title: "Redes de Contatos",
      description: "Conhecem novas pessoas, fortalecendo laços e criando conexões com benefícios pessoais e profissionais.",
      icon: Images.iconSocial,
    },
    {
      title: "Sentimento de Propósito",
      description: "Participam de uma causa significativa, contribuindo para a construção de uma comunidade mais solidária.",
      icon: Images.iconCompass,
    },
  ];

  return (
    <section className="benefits-section">
      {benefitsForHelpers.map((benefit, index) => (
        <BenefitCard
          key={index}
          title={benefit.title}
          description={benefit.description}
          icon={benefit.icon}
        />
      ))}
    </section>
  );
};

export default BenefitsForHelpers;
