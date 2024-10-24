import VeloVente from "../../models/veloVente.js";
import httpStatus from "../../utils/httpStatus.js";
import Balade from "../../models/balade.js";
import mongoose from "mongoose";
import AdresseBalade from "../../models/adresseBalade.js";
import Image from "../../models/image.js"


const getAllBalades=async(req,res)=>{
    try{
      const Balades = await Balade.find()
        .populate({ path: "adresseDepart", model: AdresseBalade })
        .populate({ path: "adresseArrivée", model: AdresseBalade })
        .populate({ path: "images", model: Image });

       return res.status(200).json({status:httpStatus.SUCCESS,data:Balades})
      
    }catch(error){
      console.log(error)
        return res.status(500).json({staus:httpStatus.ERROR,message:error.message});
    }


}

const getBaladebyId=async(req,res)=>{
    try{
        const id=req.params.id;
        const balade=await Balade.findById(id);
        if(!Balade){
            return res.status(404).json({status:httpStatus.NOT_FOUND,message:"Balade not found"})
                }
                return res.status(200).json({status:httpStatus.SUCCESS,data:balade})
                
    }catch(error){
          return res.status(500)
            .json({ staus: httpStatus.ERROR, message: error.message });
    }
}

 const filterBalades = async (req, res) => {
   const { lieu, niveau, min, max } = req.body;
  

   try {
     const filters = {};

     
     if (lieu) {
    
       filters.$or = [
         { "adresseDepart.location": { $regex: lieu, $options: "i" } },
         { "adresseArrivée.location": { $regex: lieu, $options: "i" } },
       ];
     }

     if (niveau && niveau.length > 0) {
       filters.Difficulté = { $in: niveau }; 
     }

     if (min || max) {
       filters.duree = {};
       if (min) {
         filters.duree.$gte = Number(min); 
       }
       if (max) {
         filters.duree.$lte = Number(max); 
       }
     }
     

     const balades = await Balade.find(filters)
       .populate({ path: "adresseDepart", model: AdresseBalade })
       .populate({ path: "adresseArrivée", model: AdresseBalade })
       .populate({ path: "images", model: Image });

     return res.status(200).json({
       status:httpStatus.SUCCESS,
       data: balades,
     });
   } catch (error) {
     console.error(error);
     return res.status(500).json({
       status:httpStatus.ERROR,
       message: "Une erreur est survenue lors de la récupération des balades.",
     });
   }
 };

export default { getAllBalades, getBaladebyId,filterBalades };