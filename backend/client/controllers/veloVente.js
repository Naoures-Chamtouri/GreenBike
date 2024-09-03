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
    const { id } = req.params; // ID du vélo en vente

    // Récupérer le vélo en vente avec tous les champs nécessaires
    const veloVente = await VeloVente.findById(id).populate({
      path: "velo",
      populate: [
        { path: "type", model: Type },
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

    // Récupérer les avis spécifiques à ce vélo en vente
    const avis = await Avis.find({ reference: id, onType: "VeloVente" });
    console.log(avis)

    // Ajouter les avis à l'objet veloVente
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
    const filter = {};

    // Filtrage par catégorie
    if (req.query.categorie) {
      filter["velo.type.categorie"] = req.query.categorie;
    }

    // Filtrage par type
    if (req.query.type) {
      filter["velo.type"] = req.query.type;
    }

    // Filtrage par marque
    if (req.query.marque) {
      filter["velo.marque"] = req.query.marque;
    }

    // Filtrage par prix
    if (req.query.prixMin) {
      filter.prix = { ...filter.prix, $gte: Number(req.query.prixMin) };
    }

    if (req.query.prixMax) {
      filter.prix = { ...filter.prix, $lte: Number(req.query.prixMax) };
    }

    // Trouver les vélos avec les filtres appliqués
    const veloVentes = await VeloVente.find(filter)
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type,
            populate: { path: "categorie", model: Categorie },
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
      data: veloVentes,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


export default {getAllVeloVentes,getVeloVenteById,getVeloVentesByFilter}
