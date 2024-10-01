import Location from "../../models/location.js"
import httpStatus from "../../utils/httpStatus.js"


const createLocation=async(req,res)=>{
    try{
        const{nom,numTelephone,velo,dateDebut,dateFin,quantité,prixLocation,localLocation}=req.body
       const client=req.client._id; 
        const location=new Location({
            client,
            nom,
            numTelephone,
            velo,
            dateDebut,
            dateFin,
            quantité,
            prixLocation,
            localLocation,
            etat:"Réservé"
    })

    const savedLocation=await location.save();
    return res.status(200).json({status:httpStatus.SUCCESS,data:savedLocation})

}catch(error){
    return res.status(500).json({status:httpStatus.ERROR,message:error})
}
}

const getLocationbyUser=async(req,res)=>{
    try{
        const id=req.client._id
    }catch(error){
         return res
           .status(500)
           .json({ status: httpStatus.ERROR, message: error });
    }
}

export default {createLocation,getLocationbyUser}