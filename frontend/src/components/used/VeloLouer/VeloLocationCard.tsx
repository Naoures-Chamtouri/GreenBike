import { useNavigate } from "react-router-dom";

function VeloLocationCard({ velo }) {
  const navigate = useNavigate();

  const handleVeloClick = (ref, velo) => {
    navigate(`/velo-a-louer/${ref}`,{state:{velo}});
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
        <p className="text-green-600 text-xl font-bold mt-2">
        
            {velo.prixHeure} DT/Heure
           
        </p>

        <p className="text-gray-500 mb-5 text-cu h-8">
          {velo.velo.type.categorie.nom}
          {velo.velo.type.nom} {velo.velo.modele} {velo.velo.couleur[0].nom}
        </p>
        <button className="py-2 border hover:bg-customGreen">Louer</button>
      </div>
    </div>
  );
}

export default VeloLocationCard;
