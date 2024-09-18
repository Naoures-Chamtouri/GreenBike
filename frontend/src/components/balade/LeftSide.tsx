import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { format } from "date-fns";

function LeftSide({ balade }) {
    const formattedDate = format(new Date(balade.dateDepart), "dd/MM/yyyy HH:mm");
  return (
    <div className="ml-10 w-1/3 mt-6">
      <h1 className="text-5xl ">{balade.nom}</h1>
      <h3 className=" text-sm mt-1">
        Créer par{" "}
        <span className="font-medium">
          {balade.guide.utilisateur.nomUtilisateur}
        </span>
      </h3>
      <p className=" text-lg mt-3">
        <span className="font-medium  text-customGreen-dark ">
          Description:
        </span>
        {balade.description}{" "}
      </p>
      <div className="flex mt-4">
        <FaMapMarkerAlt className=" w-4 h-4 text-customGreen-dark" />
        <h2 className=" text-sm ml-1">{balade.adresseDepart.location}</h2>
      </div>
      <div className="flex mt-2">
        <FaFlagCheckered className=" w-4 h-4 text-customGreen-dark" />
        <h2 className=" text-sm ml-1">{balade.adresseArrivée.location}</h2>
      </div>
      <div className="flex mt-2">
        <MdOutlineDateRange className=" w-4 h-4 text-customGreen-dark" />
        <h2 className=" text-sm ml-1">{formattedDate}</h2>
      </div>

      <div className="mt-10">
        <div  className="flex">
          <MdOutlineTipsAndUpdates className=" w-5 h-5 mt-1  text-customGreen-dark" />
          <h2 className="text-xl">Conseils:</h2>
        </div >
        {balade.conseils.map((conseil) => {
          return <p className="text-base mt-1">-{conseil}</p>;
        })}
      </div>
    </div>
  );
}

export default LeftSide;
