import VeloLocation from "../../models/veloLocation.js";
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
import Image from "../../models/image.js";
import CategorieVelo from "../../models/categorieVelo.js";
import AdresseLocal from "../../models/adresseLocal.js";

const getAllVeloLocations = async (req, res) => {
  try {
    const veloLocations = await VeloLocation.find()
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type,
            populate: { path: "categorie", model: CategorieVelo },
          },
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
          { path: "couleur", model: Couleur },
        ],
      })
      .populate({ path: "avis", model: Avis })
      .populate({ path: "adresseDisponible", model: AdresseLocal });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getVeloLocationById = async (req, res) => {
  try {
    const { id } = req.params;

    const veloLocations = await VeloLocation.findById(id)
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type,
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
          { path: "couleur", model: Couleur },
        ],
      })
      .populate({ path: "avis", model: Avis })
      .populate({ path: "adresseDisponible", model: AdresseLocal });

    if (!veloLocation) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo en location non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getVeloLocationsByFilter = async (req, res) => {
  try {
    const types = req.body.types || [];
    const marques = req.body.marques || [];
    const categorie = req.body.categorie || "";

 

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

    const query = {};

  
    if (typeIds.length > 0) {
      query["velo.type"] = { $in: typeIds };
    } else if (types.length > 0 || categorie !== "") {
     
     
      return res.status(200).json({
        status: httpStatus.SUCCESS,
        data: [], 
      });
    }

   
    if (marqueIds.length > 0) {
      query["velo.marque"] = { $in: marqueIds };
    }

   

   
    const veloLocations = await VeloLocation.find(query)
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type,
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
          { path: "couleur", model: Couleur },
        ],
      })
      .populate({ path: "avis", model: Avis })
      .populate({ path: "adresseDisponible", model: AdresseLocal });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


export default {
  getAllVeloLocations,
  getVeloLocationById,
  getVeloLocationsByFilter
};
