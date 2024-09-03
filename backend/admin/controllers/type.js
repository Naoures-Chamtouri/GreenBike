import Type from "../../models/type.js"; 
import httpStatus from "../../utils/httpStatus.js" 
import CategorieVelo from "../../models/categorieVelo.js"; 

 const createType = async (req, res) => {
  try {
    const { nom, categorie } = req.body;
    console.log(nom);
    console.log(categorie)

    const existingCategory = await CategorieVelo.findById(categorie);
    if (!existingCategory) {
      return res.status(400).json({ status:http, message: "Catégorie non trouvée" });
    }
    const newType = new Type({ nom, categorie });
    const savedType = await newType.save();

    res.status(201).json({status:httpStatus.SUCCESS,data:savedType});
  } catch (error) {
    res
      .status(500)
      .json({ status:httpStatus.ERROR ,message: "Erreur lors de la création du type de vélo", error });
  }
};

export default {createType};