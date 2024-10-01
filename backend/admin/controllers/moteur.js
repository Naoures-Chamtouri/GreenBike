import httpStatus from "../../utils/httpStatus.js";
import Moteur from "../../models/moteur.js";

// Fonction pour ajouter un nouveau moteur
const addMoteur = async (req, res) => {
  try {
    const { type, puissance } = req.body;

    // Création d'une nouvelle instance du modèle Moteur
    const nouveauMoteur = new Moteur({
      type: type || "",
      puissance: puissance || 0,
      
    });

    // Sauvegarde dans la base de données
    const moteurEnregistre = await nouveauMoteur.save();

    // Retourner une réponse de succès avec les détails du moteur ajouté
    res.status(201).json({
      status:httpStatus.SUCCESS,
      data: moteurEnregistre,
    });
  } catch (error) {
    res.status(500).json({
      status:httpStatus.ERROR,
      message: "Erreur lors de l'ajout du moteur",
      error: error.message,
    });
  }
};
export default {addMoteur};