import httpStatus from "../../utils/httpStatus.js";
import Reservation from "../../models/reservation.js";
import Balade from "../../models/balade.js";
import Image from "../../models/image.js";
import AdresseBalade from "../../models/adresseBalade.js";

const createReservation =async(req,res)=>{
    try{
        const{participant,numTelephone,balade}=req.body;
        console.log(balade)
        const reservation=new Reservation({participant,numTelephone,balade});
        await reservation.save();
        res.status(200).json({status:httpStatus.SUCCESS,data:reservation});
    }catch(error){
        console.log(error);
        return res.status(500).json({status:httpStatus.ERROR,message:error});
    }
}

const getReservationsByUser=async(req,res)=>{
    try{
        const id=req.client._id;
        const reservations=await Reservation.find({participant:id}).populate({path:"balade",populate:[{ path: "adresseDepart", model: AdresseBalade },
{ path:"adresseArrivée", model: AdresseBalade }
       ,{ path: "images", model: Image }],model:Balade});


       if(reservations.length==0){
        return res.status(200).json({status:httpStatus.SUCCESS,data:[],message:"aucune reservations"});
    
       }
       return res.status(200).json({
        status:httpStatus.SUCCESS,
        data:reservations
       })


    }catch(error){
        console.log(error);
        return res.status(500).json({status:httpStatus.ERROR,message:error});
    }
}

export default {createReservation,getReservationsByUser}