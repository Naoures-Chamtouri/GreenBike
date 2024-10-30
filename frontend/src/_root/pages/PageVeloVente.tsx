
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Carousel from "@/components/ui/carousel";
import { useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import NumberStepper from "@/components/ui/numberStepper";
import AvisSection from "@/components/used/avisSection";
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";
import ShoppingCart from "@/components/veloVente/ShoppingCart";
import { useState } from "react";
import CaracteristicModal from "@/components/shared/CaracteristicModal";


function PageVeloVente() {
  const [value, setValue] = useState(1);
  const location = useLocation();
  const { velo } = location.state || {};
  const titre =
    velo.velo.type?velo.velo.type.nom:"" +
    " " +
    velo.velo.categorie.nom +
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
 const {addProductToCart}=useVeloVenteCart()



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
                Vélo à Vendre
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
        <ShoppingCart />
      </div>

      <div className="mt-36  mb-12 flex">
        <Carousel images={images} />
        <div className="w-1/3 mr-10 ">
          <h1 className="text-2xl ">{titre}</h1>
          <span className="text-gray-400">Référence: {velo.velo.ref}</span>
          <h1 className="text-xl w-28 pr-10 pl-3 py-2 mt-4 bg-customGreen-light">
            {velo.prix}TND
          </h1>
          <div className="mt-5">
            <h2>
              <span className="text-customGreen">Description:</span>
              {velo.velo.description}
            </h2>
            <h2>
              <span className="text-customGreen">Etat:</span>
              {velo.etat}
            </h2>
            <h2>
              <span className="text-customGreen">Durée d'utilisation:</span>
              {velo.duréeUtilisation}
            </h2>
          </div>

          <button
            onClick={handleOpenModal}
            className="relative mt-5 ml-14 text-lg px-6 pr-8 py-2 border-2 rounded-sm border-customGreen active:bg-gray-300"
          >
            Voir les Caractéristiques
            <IoIosArrowForward className="absolute right-1 top-3" />
          </button>

          {/* Modal pour afficher les caractéristiques */}
          <CaracteristicModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            velo={velo}
          />

          <NumberStepper stock={velo.stock} setvalue={setValue} />
          <button
            className="rounded-sm border-customGreen text-lg py-2 px-5 border hover:bg-customGreen mt-7 ml-24"
            onClick={() => {
              addProductToCart(velo._id, value, velo.prix, velo.stock);
            }}
          >
            Ajouter Au Panier
          </button>
        </div>
      </div>
      <AvisSection id={velo._id} />
    </div>
  );
}

export default PageVeloVente;
