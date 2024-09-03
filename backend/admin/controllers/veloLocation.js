import VeloLocation from "../../models/veloLocation.js";
import Image from "../../models/image.js";

const createVeloLocation = async (req, res) => {
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
      prixHeure,
    } = req.body;

    const images = await Promise.all(
      imagesData.map(async (imageData) => {
        const newImage = new Image(imageData);
        return await newImage.save();
      })
    );

    // Create the Velo object to include in VeloLocation
    const veloData = {
      type,
      modele,
      poids,
      nbrVitesse,
      suspension,
      description,
      marque,
      couleur,
      images: images.map((image) => image._id), // Reference to image IDs
      genre,
      roue,
      cadre,
      selle,
      frein,
      categorieAge,
      moteur,
      pliable,
    };

    // Create the VeloLocation object with the Velo object included
    const newVeloLocation = new VeloLocation({
      velo: veloData, // Include the Velo object directly here
      prixHeure,
    });

    // Save the VeloLocation object to the database
    const savedVeloLocation = await newVeloLocation.save();

    // Respond with the new VeloLocation object
    res.status(201).json({
      status: "success",
      data: savedVeloLocation,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default { createVeloLocation };
