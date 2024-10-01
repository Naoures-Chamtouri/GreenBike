import CategorieVelo from "../../models/categorieVelo.js";
import httpStatus from "../../utils/httpStatus.js";

 const ajouterCategorieVelo = async (req, res) => {
  const { nom } = req.body;

  if (!nom) {
    return res.status(400).json({
      status: httpStatus.ERROR,
      message: "Le nom de la catégorie est requis.",
    });
  }
  try {
    const categorieExistante = await CategorieVelo.findOne({ nom });
    if (categorieExistante) {
      return res.status(409).json({
          status: httpStatus.FAIL,
          message: "Cette catégorie existe déjà.",
        });
    }

    const nouvelleCategorie = new CategorieVelo({ nom });

    const categorieSauvegardee = await nouvelleCategorie.save();

    res.status(200).json({ status: httpStatus.SUCCESS, data: categorieSauvegardee });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie de vélo :", error);
    res.status(500).json({ message: "Erreur du serveur." });
  }
};

const getAllCategories=async(req,res)=>{
  try{
    const categories=await CategorieVelo.find();
    res.status(200).json({status:httpStatus.SUCCESS,data:categories})

  }catch(error){
    console.error("Erreur lors de la récupération des catégories de vélo :", error);
  }
}

export default {ajouterCategorieVelo,getAllCategories}
