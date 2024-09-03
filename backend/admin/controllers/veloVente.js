import Velo from "../../models/velo.js";
import VeloVente from "../../models/veloVente.js";
import Image from "../../models/image.js";

const createVeloVente = async (req, res) => {
  try {
    const {
      type,
      modele,
      poids,
      nbrVitesse,
      suspension,
      description,
      marque,
      couleur,
      imagesData,
      genre,
      roue,
      cadre,
      selle,
      frein,
      categorieAge,
      moteur,
      pliable,
      stock,
      prix,
      etat,
      duréeUtilisation,
    } = req.body;

    // Créez et sauvegardez les objets Image
    const images = await Promise.all(
      imagesData.map(async (imageData) => {
        const newImage = new Image(imageData);
        return await newImage.save();
      })
    );

    // Créez l'objet Velo à inclure dans VeloVente
    const veloData = {
      type,
      modele,
      poids,
      nbrVitesse,
      suspension,
      description,
      marque,
      couleur,
      images: images.map((image) => image._id), // Référence aux IDs des images
      genre,
      roue,
      cadre,
      selle,
      frein,
      categorieAge,
      moteur,
      pliable,
    };

    // Créez l'objet VeloVente avec l'objet Velo inclus
    const newVeloVente = new VeloVente({
      velo: veloData, // Inclure l'objet Velo directement ici
      stock,
      prix,
      etat,
      duréeUtilisation,
    });

    // Enregistrez l'objet VeloVente dans la base de données
    const savedVeloVente = await newVeloVente.save();

    // Répondez avec le nouvel objet VeloVente
    res.status(201).json({
      status: "success",
      data: savedVeloVente,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default { createVeloVente };
