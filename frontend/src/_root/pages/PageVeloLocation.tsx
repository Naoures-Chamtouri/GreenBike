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

function PageVeloLocation() {
  const location = useLocation();
  const { velo } = location.state || {};
  const titre =
    velo.velo.type.nom + 
    " " +
    velo.velo.type.categorie.nom +
    " " +
    velo.velo.marque.nom +
    " " +
    velo.velo.modele;
  const images = velo.velo.images.map((image) => image.path);

  // État pour contrôler l'ouverture du modal
  const [openModal, setOpenModal] = useState(false);

  // Fonctions pour ouvrir et fermer le modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  console.log(velo);

  return (
    <div>
      <div className="topCatalog relative ">
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
                {titre} {velo.velo.ref}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ShoppingCart/>
      </div>

      <div className="mt-36  mb-12 flex">
        <Carousel images={images} />
        <div className="w-1/3 mr-10 ">
          <h1 className="text-2xl ">{titre}</h1>
          <span className="text-gray-400">Référence: {velo.velo.ref}</span>
          <h1 className="text-xl w-36 pr-10 pl-3 py-2 mt-4 bg-customGreen-light">
            {velo.prixHeure}TND/Heure
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
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="caracteristiques-title"
            aria-describedby="caracteristiques-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography
                id="caracteristiques-title"
                variant="h6"
                component="h2"
              >
                Caractéristiques du Vélo
              </Typography>
              <Typography id="caracteristiques-description" sx={{ mt: 2 }}>
                <ul>
                  <li>Poids: {velo.velo.poids} kg</li>
                  <li>Nombre de vitesses: {velo.velo.nbrVitesse}</li>
                  <li>Suspension: {velo.velo.suspension}</li>
                  <li>
                    Couleur: {velo.velo.couleur.map((c) => c.nom).join(", ")}
                  </li>
                  <li>Genre: {velo.velo.genre.map((g) => g.nom).join(", ")}</li>
                  <li>Roue: {velo.velo.roue.map((r) => r.nom).join(", ")}</li>
                  <li>Cadre: {velo.velo.cadre.nom}</li>
                  <li>Selle: {velo.velo.selle.nom}</li>
                  <li>Frein: {velo.velo.frein.map((f) => f.nom).join(", ")}</li>
                  <li>Catégorie d'âge: {velo.velo.categorieAge.nom}</li>
                  <li>Moteur: {velo.velo.moteur?.nom || "Non applicable"}</li>
                  <li>Pliable: {velo.velo.pliable ? "Oui" : "Non"}</li>
                  <li>
                    Date d'ajout:{" "}
                    {new Date(velo.velo.dateAjout).toLocaleDateString()}
                  </li>
                </ul>
              </Typography>
              <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 text-white bg-customGreen rounded"
              >
                Fermer
              </button>
            </Box>
          </Modal>

          <NumberStepper stock={velo.stock} />
          <button className="rounded-sm border-customGreen text-lg py-2 px-5 border hover:bg-customGreen mt-7 ml-32">
           Louer
          </button>
        </div>
      </div>
      <AvisSection id={velo._id} />
    </div>
  );
}

export default PageVeloLocation;
