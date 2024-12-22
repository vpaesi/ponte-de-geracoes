import React from "react";
import "./Carousel.css";

interface RegisteredCarousel {
  name: string;
  age: number;
  img: string;
  description: string;
};

interface CarouselProps {
  title: string;
  registered: RegisteredCarousel[];
};

const Carousel: React.FC<CarouselProps> = ({ title, registered }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const visibleItems = 4;
  const totalItems = registered.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
      );
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < visibleItems; i++) {
      visible.push({
        ...registered[(currentIndex + i) % totalItems],
      isVisible: i === 1,
      });
    };
    return visible;
  };

  return (
    <section className="row row-3">
      <h2>{title}</h2>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrev}>
          &#11164;
        </button>
        <div className="carousel">
          {getVisibleItems().map((item, index) => (
            <div
              className={`carousel-item ${item.isVisible ? "visible" : "hidden"}`}
              key={index}
            >
              <img src={item.img} alt={`Foto de ${item.name}`} />
              <h3>{`${item.name}, ${item.age} anos`}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          &#11166;
        </button>
      </div>
    </section>
  );
};

export default Carousel;
