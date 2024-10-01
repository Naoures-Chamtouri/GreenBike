import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function PageLocation() {
  const {user}=useAuth()
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const { velo, startDate, endDate, totalPrice, numBikes, pickupLocation } =
    state;

  
  const [phoneNumber, setPhoneNumber] = useState("");

  const [paymentMethod] = useState("online");
  const [showPopover, setShowPopover] = useState(false); 

 const handleSubmit = async () => {
   
   const phoneRegex = /^[0-9]{8}$/; 
   if (!phoneRegex.test(phoneNumber)) {
     alert("Le numéro de téléphone doit contenir exactement 8 chiffres.");
     return;
     
   }

   const locationData = {
     client: user._id,
     numTelephone: phoneNumber,
     nom: user.utilisateur.nomUtilisateur,
     dateDebut: startDate,
     dateFin: endDate,
     prixLocation: totalPrice,
     velo: velo._id,
     quantité: numBikes,
     localLocation: pickupLocation,
   };

   try {
     const response = await axios.post(
       "http://localhost:4000/client/locations",
       locationData,{
        withCredentials:true
       }
     );
     console.log("Location ajoutée:", response.data);
     setShowPopover(true); 
     setTimeout(() => {
       navigate("/velo-a-louer"); 
     }, 2000);
   } catch (error) {
     console.error("Erreur lors de l'ajout de la location:", error);
   }
 };

  const rentalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  return (
    <div className="mt-16 flex px-48  ">
      {/* Formulaire de contact */}
      <div className="flex-1 mr-4">
        <h1 className="text-2xl font-bold mb-4">Détails de la Location</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              value={user.utilisateur.nomUtilisateur}
              disabled
              className="border rounded px-2 py-2 w-1/2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Numéro de Téléphone
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded px-2 py-2 w-1/2 "
              required
            />
    
    
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Adresse E-mail
            </label>
            <input
              type="email"
              value={user.utilisateur.email}
              disabled
              className="border rounded px-2 py-2 w-1/2"
              required
            />
          </div>
          <div className="mb-4 mt-5">
            <span className="block text-sm font-medium mb-1">
              Mode de Paiement
            </span>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value={paymentMethod}
                checked
                readOnly
                className="mr-2"
              />
              Paiement sur Place
            </label>
          </div>
        </form>
        <p className="text-sm text-gray-500 mt-10">
          Note : Vous pouvez annuler votre réservation jusqu'à 3 jours avant la
          date de début.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Note : Tout retard dans le retour du vélo peut entraîner des
          problèmes.
        </p>
        <button
          onClick={handleSubmit}
          className="mt-7 bg-green-500 text-white py-3 px-5 rounded hover:bg-green-600"
        >
          Confirmer la Location
        </button>
      </div>

      {/* Résumé de la commande sous forme de facture */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Résumé de la Location</h2>
        <div className="border p-4 rounded-lg shadow flex">
          <img
            src={velo.velo.images[0]?.path || "url_par_defaut"}
            alt={velo.velo.modele}
            className="h-32 w-32 object-contain mr-4 rounded"
          />
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-semibold">
              {velo.velo.categorie.nom} {velo.velo.modele}
            </h3>
             <p className="text-sm text-gray-600">Marque: {velo.velo.marque.nom}</p>
            <p className="text-sm text-gray-600">Référence: {velo._id}</p>
          </div>
        </div>

        {/* Détails de la location */}
        <div className="mt-4 p-4 border rounded-lg shadow">
          <h4 className="font-semibold">Détails de la Location :</h4>
          <div className="flex justify-between text-sm">
            <span>Date de début: {startDate.toLocaleDateString()}</span>
            <span>Date de fin: {endDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-center mt-2">
            <span className="font-semibold">Nombre de jours: {rentalDays}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Prix par Heure: {velo.prixHeure} TND</span>
          </div>
          <div className="text-center mt-2">
            <span className="font-bold text-2xl">
              Prix total: {totalPrice} TND
            </span>
          </div>
        </div>
      </div>

 
     
    </div>
  );
}

export default PageLocation;
