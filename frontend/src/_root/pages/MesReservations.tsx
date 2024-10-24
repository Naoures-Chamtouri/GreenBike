import axios from "axios";
import { useEffect, useState } from "react";

function MesReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/client/reservations",
        {
          withCredentials: true,
        }
      );
      setReservations(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-6 text-customgreen">
        Mes Réservations de Balades
      </h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="border-2 border-customgreen rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  reservation.status === "payée"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {reservation.status}
              </span>
              <span className="text-gray-600 text-xl">
                Réservée le{" "}
                {new Date(reservation.dateReservation).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <img
                src={reservation.balade.images[0]?.path}
                alt="Image de la Balade"
                className="w-32 h-32 object-cover rounded-md mr-6"
              />
              <div>
                <h2 className="text-3xl font-bold text-customgreen mb-2">
                  {reservation.balade.nom}
                </h2>
                <p className="text-xl text-gray-700">
                  {reservation.balade.description}
                </p>
                <p className="text-gray-600">
                  Distance : {reservation.balade.distance} km
                </p>
                <p className="text-gray-600">
                  Difficulté : {reservation.balade.Difficulté}
                </p>
                <p className="text-gray-600">
                  Type de Vélo : {reservation.balade.typeVelo}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xl font-semibold text-gray-700">
                Itinéraire :
              </p>
              <p className="text-gray-600">
                Départ : {reservation.balade.adresseDepart.nom}
              </p>
              <p className="text-gray-600">
                Arrivée : {reservation.balade.adresseArrivée.nom}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Date de Départ :{" "}
                <span className="font-semibold">
                  {new Date(reservation.balade.dateDepart).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-600">
                Durée : {reservation.balade.duree} heure(s)
              </p>
              <p className="text-gray-600 font-bold">
                Tarif : {reservation.balade.tarif} TND
              </p>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-700">Conseils :</p>
              <ul className="list-disc list-inside text-gray-600">
                {reservation.balade.conseils.map((conseil, index) => (
                  <li key={index}>{conseil}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">Aucune réservation trouvée.</p>
      )}
    </div>
  );
}

export default MesReservations;
