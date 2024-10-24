import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import dayjs from "dayjs";

function PageLocation() {
  const { user } = useAuth();

  const navigate = useNavigate();
const [locationData, setLocationData] = useState(null);
const [phoneNumber, setPhoneNumber] = useState("");
const [paymentMethod] = useState("online");
const [showPopover, setShowPopover] = useState(false);


useEffect(() => {
  const storedData = localStorage.getItem("reservationDetails");
  if (storedData) {
    setLocationData(JSON.parse(storedData));
  }
}, []);

if (!locationData) {
  return <p>Loading...</p>;
}

const {
  velo,
  startDate,
  endDate,
  totalPrice,
  numBikes,
  pickupLocation,
  duration,
  adresse,
} = locationData;

  const startDayjs = dayjs(startDate);
  const endDayjs = dayjs(endDate);

  const formattedStartDate = startDayjs.isValid()
    ? startDayjs.format("YYYY-MM-DD HH:mm")
    : "Invalid Date";
  const formattedEndDate = endDayjs.isValid()
    ? endDayjs.format("YYYY-MM-DD HH:mm")
    : "Invalid Date";

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
      dateDebut: startDayjs.toISOString(),
      dateFin: endDayjs.toISOString(),
      prixLocation: totalPrice,
      velo: velo._id,
      quantité: numBikes,
      localLocation: pickupLocation,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/client/locations",
        locationData,
        { withCredentials: true }
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

  return (
    <div className="mt-16 flex px-48">
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
          Note : Tout retard dans le retour du vélo peut entraîner des frais
          supplémentaires.
        </p>
        <button
          onClick={handleSubmit}
          className="mt-7 bg-green-500 text-white py-3 px-5 rounded hover:bg-green-600"
        >
          Confirmer la Location
        </button>
      </div>
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
            <p className="text-sm text-gray-600">
              Marque: {velo.velo.marque.nom}
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 border rounded-lg shadow">
          <h2 className="font-semibold text-lg">Détails de la Location :</h2>
          <span>
            <span className="font-semibold">Local de Récuperation:</span>{" "}
            {adresse}
          </span>
          <div className="flex justify-between text-sm">
            <span>Date de début: {formattedStartDate}</span>
            <span>Date de fin: {formattedEndDate}</span>
          </div>
          <div className="flex justify-center mt-2">
            <span className="font-semibold">Durée: {duration} heures</span>
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
      {showPopover && (
        <div className="fixed top-25 right-4 p-4 bg-green-200 text-white rounded shadow-lg">
          location ajoutée avec succès !
        </div>
      )}
    </div>
  );
}

export default PageLocation;
