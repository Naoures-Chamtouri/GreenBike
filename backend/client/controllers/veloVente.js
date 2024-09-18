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
        { path: "type", model: Type ,populate:{path:"categorie",model:CategorieVelo}},
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
    const types = req.body.types || [];
    const marques = req.body.marques || [];
    const prix = req.body.prix || "";
    const categorie = req.body.categorie || "";

    let minPrix, maxPrix;

    if (prix.includes("-")) {
      [minPrix, maxPrix] = prix.split("-").map(Number);
    } else {
      minPrix = Number(prix.slice(1));
      maxPrix = null;
    }

    console.log("Types:", types);
    console.log("Marques:", marques);
    console.log("Prix:", prix);
    console.log("Min Prix:", minPrix);
    console.log("Max Prix:", maxPrix);
    console.log("Categorie:", categorie);

    // Si aucun filtre n'est appliqué, renvoyer tous les vélos
    if (types.length === 0 && marques.length === 0 && !prix && !categorie) {
      const allVeloVentes = await VeloVente.find()
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

      return res.status(200).json({
        status: httpStatus.SUCCESS,
        data: allVeloVentes,
      });
    }

    let typeIds = [];

    // Recherche des types basés sur les noms fournis
    if (types.length > 0) {
      const foundTypes = await Type.find({ nom: { $in: types } }).select("_id");
      typeIds = foundTypes.map((type) => type._id);
    } else if (categorie !== "") {
      // Sinon, trouver les types basés sur la catégorie
      const foundTypesByCategory = await Type.find({
        categorie: categorie, // Assure-toi que la catégorie est bien un ObjectId ou le bon format
      }).select("_id");

      typeIds = foundTypesByCategory.map((type) => type._id);
    }

    // Si aucun type n'est trouvé après recherche, retourner une réponse vide
    if (typeIds.length === 0) {
      return res.status(200).json({
        status: httpStatus.SUCCESS,
        data: [], // Pas de vélos correspondant à cette catégorie
      });
    }

    let marqueIds = [];
    if (marques.length > 0) {
      const foundMarques = await Marque.find({ nom: { $in: marques } }).select(
        "_id"
      );
      marqueIds = foundMarques.map((marque) => marque._id);
    }

    // Construction de la requête pour filtrer les vélos
    const query = {};

    // Ajout du filtre sur les types si applicable
    if (typeIds.length > 0) {
      query["velo.type"] = { $in: typeIds };
    }

    // Ajout du filtre sur les marques si applicable
    if (marqueIds.length > 0) {
      query["velo.marque"] = { $in: marqueIds };
    }

    // Ajout du filtre sur le prix
    if (maxPrix !== null) {
      query["prix"] = { $gte: minPrix, $lte: maxPrix };
    } else {
      query["prix"] = { $gte: minPrix };
    }

    // Recherche des vélos correspondant aux filtres
    const veloVentes = await VeloVente.find(query)
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
