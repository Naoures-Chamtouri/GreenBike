
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; 
import { useState } from "react";

function VeloVenteCard({ velo }) {
  const navigate = useNavigate();
  const { addProductToCart } = useVeloVenteCart();

 
  const [alertOpen, setAlertOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

 
  const handleVeloClick = (ref, velo) => {
    navigate(`/velo-a-vendre/${ref}`, { state: { velo } });
  };

  return (
    <div
      className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden h-96"
      onClick={() => {
        handleVeloClick(velo.velo.ref, velo);
      }}
    >
      <img
        className="w-full h-48 object-cover"
        src={velo.velo.images[0]?.path}
        alt={`${velo.velo.marque.nom} product`}
      />
      <div className="flex flex-col align-center p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {velo.velo.marque.nom}
        </h2>
        <p className="text-green-600 text-xl font-bold mt-2">{velo.prix} DT</p>

        <p className="text-gray-500 mb-5 text-cu h-8">
          {velo.velo.type.categorie.nom}
          {velo.velo.type.nom} {velo.velo.modele} {velo.velo.couleur[0].nom}
        </p>

       
        <button
          className="py-2 border hover:bg-customGreen"
          onClick={(e) => {
            e.stopPropagation(); 
            addProductToCart(velo._id, 1); 
            setAlertOpen(true); 
          }}
        >
          Ajouter Au Panier
        </button>
      </div>

     
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Produit ajouté au panier avec succès !
        </Alert>
      </Snackbar>
    </div>
  );
}

export default VeloVenteCard;
