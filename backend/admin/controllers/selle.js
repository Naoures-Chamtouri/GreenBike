import Selle from "../../models/selle.js";
import httpStatus from "../../utils/httpStatus.js";

const addSelle = async (req, res) => {
  try {
    const { materiau } = req.body;

    // Création d'une nouvelle instance du modèle Selle
    const nouvelleSelle = new Selle({
      materiau: materiau || "",
    });

    // Sauvegarde dans la base de données
    const selleEnregistree = await nouvelleSelle.save();

    // Retourner une réponse de succès avec les détails de la selle ajoutée
    res.status(201).json({
      status:httpStatus.SUCCESS,
      data: selleEnregistree,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: "Erreur lors de l'ajout de la selle",
      error: error.message,
    });
  }
};
const getAllSelles=async(req,res)=>{
  try{
const selles=await Selle.find();
return res.json({status:"success",data:selles})
  }catch(error){
    return res.status(500).json('error')
  }
}
export default {addSelle,getAllSelles}