import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow"; // Importer le CSS spécifique pour l'effet Coverflow

// Importez les images que vous souhaitez utiliser
import venteImg from "../../../public/assets/images/veloService1.jpg"; // Remplacez par le chemin de votre image
import locationImg from "../../../public/assets/images/veloService1.jpg"; // Remplacez par le chemin de votre image
import baladesImg from "../../../public/assets/images/veloService1.jpg"; // Remplacez par le chemin de votre image

const Slider3D = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCoverflow]} // Ajouter EffectCoverflow
      spaceBetween={0} // Aucun espace entre les slides
      slidesPerView={2.5} // Afficher une partie des slides adjacents
      centeredSlides={true} // Centrer les slides
      effect="coverflow" // Appliquer l’effet Coverflow
      coverflowEffect={{
        rotate: 30, // Rotation des slides pour l’effet 3D
        stretch: 0, // Étirement des slides
        depth: 200, // Profondeur des slides pour l’effet 3D
        modifier: 1, // Modificateur de l’effet
        slideShadows: true, // Ombres des slides
      }}
      navigation
      pagination={{ clickable: true }}
      className="mySwiper w-full h-64 md:h-80" // Ajuster la hauteur du swiper
    >
      <SwiperSlide className="flex flex-col items-center justify-center p-6">
        <img
          src={venteImg}
          alt="Vente de Vélos"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Vente de Vélos
          </h2>
          <p className="text-gray-600">
            Découvrez notre large gamme de vélos à vendre, adaptés à tous vos
            besoins.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex flex-col items-center justify-center p-6">
        <img
          src={locationImg}
          alt="Location de Vélos"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Location de Vélos
          </h2>
          <p className="text-gray-600">
            Louez des vélos pour vos escapades et aventures, avec des options
            flexibles.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex flex-col items-center justify-center p-6">
        <img
          src={baladesImg}
          alt="Organisation de Balades"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Organisation de Balades
          </h2>
          <p className="text-gray-600">
            Participez à nos balades organisées pour explorer la région de
            manière écologique.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider3D;
