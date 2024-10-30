import axios from "axios";
import { useEffect, useState } from "react";

function MesCommandes() {
  const [commandes, setCommandes] = useState([]);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/client/commandes",
        {
          withCredentials: true,
        }
      );
      setCommandes(response.data.data);
      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-6 text-customgreen">
        Mes Commandes
      </h1>
      {commandes.length > 0 ? (
        commandes.map((commande) => (
          <div
            key={commande._id}
            className="border-2 border-customgreen rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  commande.statutCommande === "en cours"
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
              >
                {commande.statutCommande}
              </span>
              <span className="text-gray-600 text-xl">
                Commande du{" "}
                {new Date(commande.dateCommande).toLocaleDateString()}
              </span>
            </div>

            <div className="text-3xl font-bold text-customgreen mb-4">
              Total : {commande.total} TND
            </div>

            <div className="text-xl font-semibold text-gray-700">
              Articles :
            </div>
            {commande.articles.map((article) => (
              <div
                key={article._id}
                className="border border-green-600 p-4 mt-2 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={article.article.velo.images[0]?.path}
                    alt="Vélo"
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {article.article.velo.modele} (
                      {article.article.velo.categorie.nom})
                    </p>
                    <p className="text-gray-600">
                      Marque : {article.article.velo.marque.nom}
                    </p>
                    <p className="text-gray-600">
                      Quantité : {article.quantité}
                    </p>
                    <p className="text-gray-600">
                      total : {article.total}
                    </p>
                  </div>
                </div>
              </div>
            ))}

           {commande.adresseLivraison && (
              <div className="mt-4">
                <p className="font-semibold text-gray-700">
                  Adresse de Livraison :
                </p>
                <p className="text-gray-600">{commande.adresseLivraison.district.nom}, {commande.adresseLivraison.delegation.nom}, {commande.adresseLivraison.ville.nom}</p>
              </div>
            )} 

            <p className="mt-4 text-gray-600">
              Date de Livraison prévue :{" "}
              <span className="font-semibold">
                {new Date(commande.dateLivraison).toLocaleDateString()}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">Aucune commande trouvée.</p>
      )}
    </div>
  );
}

export default MesCommandes;
