import VeloVente from "../../models/veloVente.js";
import httpStatus from "../../utils/httpStatus.js";
import Avis from "../../models/avis.js";
import Moteur from "../../models/moteur.js";
import CategorieAge from "../../models/categorieAge.js";
import Frein from "../../models/frein.js";
import Selle from "../../models/selle.js";
import Cadre from "../../models/cadre.js";
import Roue from "../../models/roue.js";
import Genre from "../../models/genre.js";
import Couleur from "../../models/couleur.js";
import Marque from "../../models/marque.js";
import Type from "../../models/type.js";
import Image from "../../models/image.js"
import CategorieVelo from "../../models/categorieVelo.js";


const getAllVeloVentes = async (req, res) => {
  try {
    const veloVentes = await VeloVente.find()
      .populate({
        path: "velo",
        populate: [
          { path: "type" ,model:Type,populate:{path:"categorie",model:CategorieVelo}},
          { path: "marque",model:Marque },
          { path: "couleur" ,model:Couleur},
          { path: "images" ,model:Image},
          { path: "genre" ,model:Genre},
          { path: "roue" ,model:Roue},
          { path: "cadre",model:Cadre },
          { path: "selle",model:Selle },
          { path: "frein" ,model:Frein},
          { path: "categorieAge" ,model:CategorieAge },
          { path: "moteur" ,model:Moteur},
        ],
      })
      .populate({path:"avis",model:Avis});

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloVentes,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};
const getVeloVenteById = async (req, res) => {
  try {
    const { id } = req.params; 

   
    const veloVente = await VeloVente.findById(id).populate({
      path: "velo",
      populate: [
        { path: "type", model: Type },
        { path: "categorie", model: CategorieVelo },
        { path: "marque", model: Marque },
        { path: "couleur", model: Couleur },
        { path: "images", model: Image },
        { path: "genre", model: Genre },
        { path: "roue", model: Roue },
        { path: "cadre", model: Cadre },
        { path: "selle", model: Selle },
        { path: "frein", model: Frein },
        { path: "categorieAge", model: CategorieAge },
        { path: "moteur", model: Moteur },
      ],
    });

    if (!veloVente) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo en vente non trouvé",
      });
    }

   
    const avis = await Avis.find({ reference: id, onType: "VeloVente" });
    console.log(avis)

    
    veloVente.avis = avis;

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloVente,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


const getVeloVentesByFilter = async (req, res) => {
  try {
    const types = req.body.types || [];
    const marques = req.body.marques || [];
    const prix = req.body.prix || "";
    const categorie = req.body.categorie || "";

    let minPrix, maxPrix;

  
    if (prix.includes("-")) {
      [minPrix, maxPrix] = prix.split("-").map(Number);
    } else {
      minPrix = Number(prix.slice(1)) || 0;
      maxPrix = null;
    }

    console.log("Types:", types);
    console.log("Marques:", marques);
    console.log("Prix:", prix);
    console.log("Min Prix:", minPrix);
    console.log("Max Prix:", maxPrix);
    console.log("Categorie:", categorie);

    let typeIds = [];

 
    if (types.length > 0) {
      const foundTypes = await Type.find({ nom: { $in: types } }).select("_id");
      typeIds = foundTypes.map((type) => type._id);
    }
    
    else if (categorie !== "") {
      const foundTypesByCategory = await Type.find({
        categorie: categorie,
      }).select("_id");

     
      if (foundTypesByCategory.length === 0) {
        return res.status(200).json({
          status: httpStatus.SUCCESS,
          data: [], 
        });
      }

      typeIds = foundTypesByCategory.map((type) => type._id);
    }

    let marqueIds = [];
    if (marques.length > 0) {
      const foundMarques = await Marque.find({ nom: { $in: marques } }).select(
        "_id"
      );
      marqueIds = foundMarques.map((marque) => marque._id);
    }

    const query = {  stock: { $gt: 0 } };

    
    if (typeIds.length > 0) {
      query["velo.type"] = { $in: typeIds };
    }


    if (marqueIds.length > 0) {
      query["velo.marque"] = { $in: marqueIds };
    }


    if (minPrix !== undefined) {
      if (maxPrix !== null) {
        query["prix"] = { $gte: minPrix, $lte: maxPrix };
      } else {
        query["prix"] = { $gte: minPrix };
      }
    }

    console.log("Query finale:", query);

  
    const veloVentes = await VeloVente.find(query)
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type
          },
          { path: "categorie", model: CategorieVelo },
          { path: "marque", model: Marque },
          { path: "couleur", model: Couleur },
          { path: "images", model: Image },
          { path: "genre", model: Genre },
          { path: "roue", model: Roue },
          { path: "cadre", model: Cadre },
          { path: "selle", model: Selle },
          { path: "frein", model: Frein },
          { path: "categorieAge", model: CategorieAge },
          { path: "moteur", model: Moteur },
        ],
      })
      .populate({ path: "avis", model: Avis });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloVentes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};





export default {getAllVeloVentes,getVeloVenteById,getVeloVentesByFilter}
