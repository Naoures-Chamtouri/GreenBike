import { useNavigate } from "react-router-dom";

function Card({ velo, button }) {
  const navigate = useNavigate();

  const handleVeloClick = (ref, link,velo) => {
    navigate(`/${link}/${ref}`,{state:{velo}});
  };

  return (
    <div
      className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden h-96"
      onClick={() => {
        const link =
          button === "Ajouter au Panier" ? "velo-a-vendre" : "velo-a-louer";
        handleVeloClick(velo.velo.ref, link,velo);
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
        <p className="text-green-600 text-xl font-bold mt-2">
          {button === "Réserver"
            ? `${velo.prixHeure} DT/Heure`
            : `${velo.prix} DT`}
        </p>

        <p className="text-gray-500 mb-5 text-cu h-8">
          {velo.velo.type.categorie.nom}
          {velo.velo.type.nom} {velo.velo.modele} {velo.velo.couleur[0].nom}
        </p>
        <button className="py-2 border hover:bg-customGreen">{button}</button>
      </div>
    </div>
  );
}

export default Card;
