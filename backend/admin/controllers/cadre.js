import Cadre from "../../models/cadre.js";

// Fonction pour ajouter un nouveau cadre
const addCadre = async (req, res) => {
  try {
    const { materiau, taille } = req.body;

    // Création d'une nouvelle instance du modèle Cadre
    const nouveauCadre = new Cadre({
      materiau: materiau || "",
      taille: taille || "",
    });

    // Sauvegarde dans la base de données
    const cadreEnregistre = await nouveauCadre.save();

    // Retourner une réponse de succès avec les détails du cadre ajouté
    res.status(201).json({
      status: "success",
      data: cadreEnregistre,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout du cadre",
      error: error.message,
    });
  }
};
export default {addCadre};