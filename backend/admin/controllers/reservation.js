import httpStatus from "../../utils/httpStatus.js";
import Reservation from "../../models/reservation.js"
import Client from "../../models/client.js";
import Utilisateur from "../../models/utilisateur.js";


const getReservationsbyBalade=async(req,res)=>{
    try{ 
        const baladeId=req.params.baladeId
        const reservations=await Reservation.find({balade:baladeId}).populate({path:"participant",model:Client});
   if(reservations.length>0){
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data:reservations,
    });

   }else{
      return res.status(400).json({
        status: httpStatus.NOT_FOUND,
        message: "pas de reservations pour cette balade",
      });
   }

    }catch(error){
        console.log(error)
         return res.status(500).json({
           status: httpStatus.ERROR,
           message: error.message,
         });
    }
}

const updateReservation=async(req,res)=>{
    try{
        const reservationId=req.params.id
        const {status}=req.body
        const reservation=await Reservation.findByIdAndUpdate(reservationId,{status:status},{new:true});
        if(reservation){
           return res
             .status(200)
             .json({ status: httpStatus.SUCCESS, data: reservation });
        }
        else{
            return res.status(404).json({
                status: httpStatus.NOT_FOUND,
                message: "reservation non trouve",
                });
        }



    }catch(error){
     console.log(error);
     return res.status(404).json({
       status: httpStatus.ERROR,
       message: error.message,
     });
    }
}

export default {getReservationsbyBalade,updateReservation}