import Avis from "../../models/avis.js"; 
import VeloVente from "../../models/veloVente.js"; 
import VeloLocation from "../../models/veloLocation.js"; 
import Equipement from "../../models/equipement.js"; 
import Balade from "../../models/balade.js"; 
import httpStatus from "../../utils/httpStatus.js";

const createAvis = async (req, res) => {
  try {
    const { client, note, commentaire, reference, onType } = req.body;

    
    let referenceDoc;
    switch (onType) {
      case "VeloVente":
        referenceDoc = await VeloVente.findById(reference);
        break;
      case "VeloLocation":
        referenceDoc = await VeloLocation.findById(reference);
        break;
      case "Equipement":
        referenceDoc = await Equipement.findById(reference);
        break;
      case "Balade":
        referenceDoc = await Balade.findById(reference);
        break;
      default:
        return res
          .status(400)
          .json({ status:httpStatus.ERROR, message: "Type de référence non valide" });
    }

    if (!referenceDoc) {
      return res
        .status(404)
        .json({ status:httpStatus.NOT_FOUND, message: "Référence non trouvée" });
    }

   
    const newAvis = new Avis({
      client,
      note,
      commentaire,
      reference,
      onType,
    });

   
    const savedAvis = await newAvis.save();

    res.status(201).json({
      status:httpStatus.SUCCESS,
      data: savedAvis,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getAvis=async(req,res)=>{
  try{
    const id=req.params.id;
    const avis=await Avis.find({reference:id});
    if(!avis){
      return res.status(404).json({status:httpStatus.NOT_FOUND,message:"Avis non trouvé"})}
      else{
        return res.status(200).json({status:httpStatus.SUCCESS,data:avis});
      }
  }catch(e){
     res.status(500).json({
       status: httpStatus.ERROR,
       message: error.message,
     });

  }
}

export default { createAvis,getAvis };