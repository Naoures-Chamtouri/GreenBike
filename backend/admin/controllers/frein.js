import Frein from "../../models/frein.js";
const addFrein = async (req, res) => {
  try {
    const { type } = req.body;

  
    if (!type) {
      return res.status(400).json({
        status: "error",
        message: "Le type de frein est requis",
      });
    }

    // Création d'une nouvelle instance du modèle Frein
    const nouveauFrein = new Frein({
      type: type,
    });

    // Sauvegarde dans la base de données
    const freinEnregistre = await nouveauFrein.save();

    // Retourner une réponse de succès avec les détails du frein ajouté
    res.status(201).json({
      status: "success",
      data: freinEnregistre,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout du frein",
      error: error.message,
    });
  }
};
export default {addFrein}