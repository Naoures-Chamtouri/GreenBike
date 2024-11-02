import Type from "../../models/type.js"; 
import httpStatus from "../../utils/httpStatus.js";


 const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find(); 

    res.status(200).json({status:httpStatus.SUCCESS ,data:types});
  } catch (error) {
    res
      .status(500)
      .json({ 
        status: httpStatus.ERROR,
        message: "Erreur lors de la récupération des types de vélos",
        error,
      });
  }
};
const getTypesbyCategory = async (req, res) => {
  try {
    const { categorie } = req.params;


   
    if (!categorie) {
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
    res.status(500).json({
      status: httpStatus.ERROR,
      message: "Erreur lors de la récupération des types de vélos.",
      error: error.message || error
    });
  }
};


export default {getAllTypes ,getTypesbyCategory}