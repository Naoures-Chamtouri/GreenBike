import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[300px] bg-gray-700 max-w-lg mx-auto">
      {/* Conteneur d'image avec une taille fixe */}
      <div className="overflow-hidden rounded-lg w-full   flex ">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="object-cover w-full h-[380px]"
        />
      </div>

      {/* Boutons de navigation */}
      <div
        onClick={handlePrevClick}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white text-gray-800 px-1 py-1 rounded-full shadow hover:bg-gray-200"
      >
        <IoIosArrowBack className="w-6 h-6" />
      </div>
      <div
        onClick={handleNextClick}
        className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white text-gray-800 px-1 py-1 rounded-full shadow hover:bg-gray-200"
      >
        <IoIosArrowForward className="w-6 h-6" />
      </div>

      {/* Indicateurs pour les slides */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-customgreen" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
