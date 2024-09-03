import CategorieAge from "../../models/categorieAge.js";

// Fonction pour ajouter une nouvelle catégorie d'âge
const addCategorieAge = async (req, res) => {
  try {
    const { nom } = req.body;

    // Vérifie si le nom est fourni
    if (!nom) {
      return res.status(400).json({
        status: "error",
        message: "Le nom de la catégorie d'âge est requis",
      });
    }

    // Création d'une nouvelle instance du modèle CategorieAge
    const nouvelleCategorieAge = new CategorieAge({
      nom: nom,
    });

    // Sauvegarde dans la base de données
    const categorieAgeEnregistree = await nouvelleCategorieAge.save();

    // Retourner une réponse de succès avec les détails de la catégorie d'âge ajoutée
    res.status(201).json({
      status: "success",
      data: categorieAgeEnregistree,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout de la catégorie d'âge",
      error: error.message,
    });
  }
};
export default {addCategorieAge}