import  { useState } from "react";
import ReservationModal from "./ReservationModal";

function RightSide({ balade, setAnchorElPopOver, setSuccessMessage,handlePopoverClose }) {

   const [open, setOpen] = useState(false);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  return (
    <div className="w-3/5 mt-9 ml-11">
      <div className="bg-gray-100  flex justify-between h-20   p-4 ">
        <div className="">
          <p className="text-sm text-gray-500 font-medium">vélo</p>
          <p className="text-lg font-semibold">{balade.typeVelo}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Difficulté</p>
          <p className="text-lg font-semibold">{balade.Difficulté}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Distance</p>
          <p className="text-lg font-semibold">{balade.distance} km</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Durée </p>
          <p className="text-lg font-semibold">{balade.duree} Heures</p>
        </div>
      </div>
      <div className="w-44 h-14 bg-slate-50 border rounded-sm text-center text-2xl p-4 pb-14 mt-10 ml-80 font-medium">
        Tarif :{balade.tarif} DT
      </div>
      <button
        className="rounded-sm border-x-customGreen-dark text-2xl py-4 px-10 border-2 hover:bg-customGreen mt-7 ml-80"
        onClick={handleOpen}
      >
        Réserver
      </button>
      <ReservationModal
        open={open}
        handleClose={handleClose}
        idBalade={balade._id}
        setAnchorElPopOver={setAnchorElPopOver}
        setSuccessMessage={setSuccessMessage}
        handlePopoverClose={handlePopoverClose}
      />
    </div>
  );
}

export default RightSide;
