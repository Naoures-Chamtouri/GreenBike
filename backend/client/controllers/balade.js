import VeloVente from "../../models/veloVente.js";
import httpStatus from "../../utils/httpStatus.js";
import Balade from "../../models/balade.js";
import mongoose from "mongoose";
import AdresseBalade from "../../models/adresseBalade.js";
import Guide from "../../models/guide.js"

const getAllBalades=async(req,res)=>{
    try{
      const Balades = await Balade.find().populate(
        { path: "adresseDepart", model: AdresseBalade }).populate(
        { path: "adresseArrivée", model: AdresseBalade }
      ).populate({path:"guide",model:Guide}); 
       return res.status(200).json({status:httpStatus.SUCCESS,data:Balades})
      
    }catch(error){
        return
        res.status(500).json({staus:httpStatus.ERROR,message:error.message});
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
export default { getAllBalades, getBaladebyId };