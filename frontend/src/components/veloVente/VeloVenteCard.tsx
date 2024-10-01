
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; 
import { useState } from "react";

function VeloVenteCard({ velo }) {
  const navigate = useNavigate();
  const { addProductToCart } = useVeloVenteCart();

 


  
 
  const handleVeloClick = (ref, velo) => {
    navigate(`/velo-a-vendre/${ref}`, { state: { velo } });
  };

  return (
    <div
      className="w-64 h-96 bg-white shadow-lg rounded-lg overflow-hidden "
      onClick={() => {
        handleVeloClick(velo._id, velo);
      }}
    >
       <img
        className="w-full h-48 object-cover"
        src={velo.velo.images[0]?.path}
        alt={`${velo.velo.modele} product`}
      /> 
      <div className="flex flex-col align-center p-4">
        <h2 className="text-lg font-semibold text-gray-800">
         {velo.velo.marque.nom} 
        </h2>
        <p className="text-green-600 text-xl font-bold mt-2">{velo.prix} DT</p>

        <p className="text-gray-500 mb-5 text-cu h-8">
          {velo.velo.categorie.nom}
          {velo.velo.type?velo.velo.type.nom:''} {velo.velo.modele} 
        </p>

        <button
          className="py-2 border hover:bg-customGreen"
          onClick={(e) => {
            e.stopPropagation();
            addProductToCart(velo._id, 1, velo.prix, velo.stock);
          }}
        >
          Ajouter Au Panier
        </button>
      </div>
    </div>
  );
}

export default VeloVenteCard;
