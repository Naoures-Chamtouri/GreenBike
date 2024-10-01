import httpStatus from "../../utils/httpStatus.js";
import Reservation from "../../models/reservation.js";

const createReservation =async(req,res)=>{
    try{
        const{participant,numTelephone,balade}=req.body;
        const reservation=new Reservation({participant,numTelephone,balade});
        await reservation.save();
        res.status(200).json({status:httpStatus.SUCCESS,data:reservation});
    }catch(error){
        console.log(error);
        return res.status(500).json({status:httpStatus.ERROR,message:error});
    }
}

export default {createReservation}