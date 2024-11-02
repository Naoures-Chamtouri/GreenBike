import Type from "../../models/type.js"; 
import httpStatus from "../../utils/httpStatus.js" 
import CategorieVelo from "../../models/categorieVelo.js"; 

 const createType = async (req, res) => {
  try {
    const { nom, categorie } = req.body;
 

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

const getTypesbyCategory = async (req, res) => {
  try {
    const { categorie } = req.params;
   

   
    if (!categorie) {
      const types=await Type.find();
      return res.status(400).json({
        status: httpStatus.BAD_REQUEST,
        message: "La catégorie est requise pour cette requête.",
      });
    }

    const types = await Type.find({ categorie: categorie });

    if (types.length > 0) {
      res.status(200).json({
        status: httpStatus.SUCCESS,
        data: types,
      });
    } else {
      res.status(200).json({
        status: httpStatus.NOT_FOUND,
        message: "Aucun type de vélo trouvé pour la catégorie spécifiée.",
        data:[]
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: "Erreur lors de la récupération des types de vélos.",
      error: error.message || error
    });
  }
};

const getAllTypes=async(req,res)=>{
  try{
    const types=await Type.find();
      if (types.length > 0) {
        res.status(200).json({
          status: httpStatus.SUCCESS,
          data: types,
        });
      } else {
        res.status(200).json({
          status: httpStatus.NOT_FOUND,
          message: "Aucun type de vélo trouvé",
          data: [],
        });
      }

  }catch(error){
    console.log(error)
     return res.status(500).json({
       status: httpStatus.ERROR,
       message: "Erreur lors de la récupération des types de vélos.",
       error: error.message || error,
     });
  }
}

export default {createType,getTypesbyCategory,getAllTypes};