import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Carousel from "@/components/ui/carousel";
import ShoppingCart from "@/components/veloVente/ShoppingCart";
import { useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import NumberStepper from "@/components/ui/numberStepper";
import { Modal, Box, Typography } from "@mui/material";
import AvisSection from "@/components/used/avisSection";
import RentalModal from "@/components/VeloLouer/locationModal";
import CaracteristicModal from "@/components/shared/CaracteristicModal";

function PageVeloLocation() {
  const location = useLocation();
  const { velo } = location.state || {};
  const titre =
    velo.velo.categorie.nom +
    " " +
    velo.velo.marque.nom +
    " " +
    velo.velo.modele;
  const images = velo.velo.images.map((image) => image.path);

  const [openModal, setOpenModal] = useState(false);

  const [modalLocationOpen, setModalLocationOpen] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLocationModalOpen = () => setModalLocationOpen(true);
  const handleLocationModalClose = () => setModalLocationOpen(false);

  return (
    <div>
      <div className="topCatalog relative">
        <Breadcrumb className="mt-3 ml-7">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/velo-a-vendre" className="text-sm">
                Vélo à Louer
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="" className="text-sm">
                {titre} {velo._id}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-36 mb-12 flex h-96">
        <Carousel images={images} />
        <div className="w-1/3 mr-10">
          <h1 className="text-2xl">{titre}</h1>
          <h2>{velo.velo.type.nom}</h2>
          
          <h1 className="text-xl w-fit pr-10 pl-3 py-2 mt-4 bg-customGreen-light">
            {velo.prixHeure} TND/Heure
          </h1>
          <div className="mt-5">
            <h2>
              <span className="text-customGreen">Description:</span>
              {velo.velo.description}
            </h2>
          </div>

          {/* Bouton pour voir les caractéristiques */}
          <button
            onClick={handleOpenModal}
            className="relative mt-5 ml-14 text-lg px-6 pr-8 py-2 border-2 rounded-sm border-customGreen active:bg-gray-300"
          >
            Voir les Caractéristiques
            <IoIosArrowForward className="absolute right-1 top-3" />
          </button>

          {/* Modal pour afficher les caractéristiques */}
         <CaracteristicModal openModal={openModal} handleCloseModal={handleCloseModal} velo={velo} />
          <button
            className="rounded-sm border-customGreen text-2xl py-3 px-6 border hover:bg-customGreen mt-7 ml-32"
            onClick={handleLocationModalOpen}
          >
            Louer
          </button>
          <RentalModal
            open={modalLocationOpen}
            onClose={handleLocationModalClose}
            velo={velo}
          />
        </div>
      </div>
      <AvisSection id={velo._id} />
    </div>
  );
}

export default PageVeloLocation;
