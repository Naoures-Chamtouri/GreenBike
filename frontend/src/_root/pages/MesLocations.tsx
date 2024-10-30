import axios from "axios";
import { useEffect, useState } from "react";

function MesLocations() {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/client/locations",
        {
          withCredentials: true,
        }
      );
      setLocations(response.data.data);
    } catch (e) {
     
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Calcul du total des heures entre dateDebut et dateFin
  const calculateHours = (dateDebut, dateFin) => {
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const hours = Math.abs(end - start) / 36e5; // Divise la différence en millisecondes par 36e5 (ms en heures)
    return hours;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-6 text-customgreen">
        Mes Locations
      </h1>
      {locations.length > 0 ? (
        locations.map((location) => (
          <div
            key={location._id}
            className="border-2 border-customgreen rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  location.etat === "Réservé" ? "bg-yellow-500" : "bg-green-600"
                }`}
              >
                {location.etat}
              </span>
              <span className="text-gray-600 text-xl">
                Location du {new Date(location.dateDebut).toLocaleString()} au{" "}
                {new Date(location.dateFin).toLocaleString()}
              </span>
            </div>

            <div className="text-3xl font-bold text-customgreen mb-4">
              Prix Total :{" "}
              {location.prixLocation *
                calculateHours(location.dateDebut, location.dateFin)}{" "}
              TND
            </div>

            <div className="text-xl font-semibold text-gray-700 mb-2">
              Détails du Vélo :
            </div>
            <div className="border border-green-600 p-4 mt-2 rounded-lg">
              <div className="flex items-center">
                <img
                  src={location.velo.velo.images[0]?.path}
                  alt="Vélo"
                  className="w-22 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {location.velo.velo.modele} (
                    {location.velo.velo.categorie.nom})
                  </p>
                  <p className="text-gray-600">
                    Marque : {location.velo.velo.marque.nom}
                  </p>
                  <p className="text-gray-600">
                    Type : {location.velo.velo.type.nom}
                  </p>
                  <p className="text-gray-600">
                    Quantité : {location.quantité}
                  </p>
                  <p className="text-gray-600">
                    Prix par heure : {location.velo.prixHeure} TND
                  </p>
                  <p className="text-gray-600">
                    Total des heures :{" "}
                    {calculateHours(location.dateDebut, location.dateFin)}{" "}
                    heures
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-600">
              Adresse de Location :{" "}
              <span className="font-semibold">
              {location.localLocation.adresse},{" "}
                {location.localLocation.district},
                {location.localLocation.delegation},{" "}
                {location.localLocation.ville}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">Aucune location trouvée.</p>
      )}
    </div>
  );
}

export default MesLocations;
