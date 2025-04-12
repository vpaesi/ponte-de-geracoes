import React from "react";

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
    <section className="row my-3">
      <h2 className="text-center">{title}</h2>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-outline-primary me-2" onClick={handlePrev}>
          &#11164;
        </button>
        <div className="d-flex overflow-hidden" style={{ width: "80%" }}>
          {getVisibleItems().map((item, index) => (
            <div
              className={`carousel-item ${item.isVisible ? "d-block" : "d-none"}`}
              key={index}
              style={{ flex: "0 0 auto", width: "25%" }}
            >
              <img
                src={item.img}
                alt={`Foto de ${item.name}`}
                className="img-fluid rounded"
              />
              <h3 className="text-center mt-2">{`${item.name}, ${item.age} anos`}</h3>
              <p className="text-center">{item.description}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-outline-primary ms-2" onClick={handleNext}>
          &#11166;
        </button>
      </div>
    </section>
  );
};

export default Carousel;
