import CategorieAge from "../../models/categorieAge.js";
import httpStatus from "../../utils/httpStatus.js";


const addCategorieAge = async (req, res) => {
  try {
    const { nom } = req.body;

    
    if (!nom) {
      return res.status(400).json({
        status: "error",
        message: "Le nom de la catégorie d'âge est requis",
      });
    }

   
    const nouvelleCategorieAge = new CategorieAge({
      nom: nom,
    });

    const categorieAgeEnregistree = await nouvelleCategorieAge.save();

   
    res.status(201).json({
      status: "success",
      data: categorieAgeEnregistree,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout de la catégorie d'âge",
      error: error.message,
    });
  }
};

const getAllCategorieAge=async(req,res)=>{
  try{

     const categories=await CategorieAge.find();
     res.status(200).json({
      status:httpStatus.SUCCESS,
      data:categories
      });
  }catch(error){
     console.log(error)
    res.status(500).json({
      status: httpStatus.ERROR,
      message: "Erreur lors de la récupération des categorie d'ages de vélos.",
      error: error.message || error
    });
  }
}
export default {addCategorieAge,getAllCategorieAge}