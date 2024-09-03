import Genre from "../../models/genre.js";

// Fonction pour ajouter un nouveau genre
 const addGenre = async (req, res) => {
  try {
    const { nom } = req.body;

    // Vérifie si le nom est fourni
    if (!nom) {
      return res.status(400).json({
        status: "error",
        message: "Le nom du genre est requis",
      });
    }

    // Création d'une nouvelle instance du modèle Genre
    const nouveauGenre = new Genre({
      nom: nom,
    });

    // Sauvegarde dans la base de données
    const genreEnregistre = await nouveauGenre.save();

    // Retourner une réponse de succès avec les détails du genre ajouté
    res.status(201).json({
      status: "success",
      data: genreEnregistre,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout du genre",
      error: error.message,
    });
  }
};

export default {addGenre};