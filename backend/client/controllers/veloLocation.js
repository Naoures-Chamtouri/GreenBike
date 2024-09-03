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
        ],
      })
      .populate({ path: "avis", model: Avis });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getVeloLocationById = async (req, res) => {
  try {
    const { id } = req.params;

    const veloLocation = await VeloLocation.findById(id)
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
        ],
      })
      .populate({ path: "avis", model: Avis });

    if (!veloLocation) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo en location non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocation,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getVeloLocationsByFilter = async (req, res) => {
  try {
    const filter = {};

    // Example of possible filters
    if (req.query.type) {
      filter["velo.type"] = req.query.type;
    }

    if (req.query.marque) {
      filter["velo.marque"] = req.query.marque;
    }

    if (req.query.prixMin) {
      filter.prixJour = { ...filter.prixJour, $gte: req.query.prixMin };
    }

    if (req.query.prixMax) {
      filter.prixJour = { ...filter.prixJour, $lte: req.query.prixMax };
    }

    const veloLocations = await VeloLocation.find(filter)
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
        ],
      })
      .populate({ path: "avis", model: Avis });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

export default {
  getAllVeloLocations,
  getVeloLocationById,
  getVeloLocationsByFilter,
};
