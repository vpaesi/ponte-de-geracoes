import { Images } from '../../assets/Images';
import BenefitCard from '../../components/benefit-card/BenefitCard';

const BenefitsForAssisted = () => {
  const benefitsForHelped = [
    {
      title: "Facilidade no Dia a Dia",
      description: "Recebem ajuda em tarefas que podem ser desafiadoras, como fazer compras, buscar medicamentos ou resolver questões burocráticas.",
      icon: Images.iconCalendar,
    },
    {
      title: "Saúde e Bem-Estar",
      description: "Recebem suporte para manter uma rotina mais saudável, como ajuda em atividades físicas, incentivo para consultas médicas regulares e orientações para cuidados pessoais.",
      icon: Images.iconHeart,
    },
    {
      title: "Maior Autonomia",
      description: "Continuam vivendo de forma independente em suas casas, com o suporte necessário para as atividades diárias.",
      icon: Images.iconFreedom,
    },
    {
      title: "Companhia e Socialização",
      description: "O contato com os ajudantes pode reduzir a solidão e proporcionar conversas e trocas de experiências.",
      icon: Images.iconSocial,
    },
    {
      title: "Segurança",
      description: "Contam com uma rede confiável de apoio, o que traz tranquilidade para lidar com suas necessidades.",
      icon: Images.iconShield,
    },
    {
      title: "Valorização",
      description: "Sentem-se parte da comunidade, com suas histórias e sabedoria reconhecidas e valorizadas.",
      icon: Images.iconTrophy,
    },
  ];

  return (
    <section className="benefits-section">
      {benefitsForHelped.map((benefit, index) => (
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

export default BenefitsForAssisted;
