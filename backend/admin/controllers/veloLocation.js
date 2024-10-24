import VeloLocation from "../../models/veloLocation.js";
import Velo from "../../models/velo.js"
import Image from "../../models/image.js";
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
import CategorieVelo from "../../models/categorieVelo.js";
import AdresseLocal from "../../models/adresseLocal.js";

const createVeloLocation = async (req, res) => {
  try {
    const {
      categorie,
      type,
      modele,
      genre,
      age,
      taille,
      description,
      
      prix,
     
      stock,
      isPliable,
      suspension,
      vitesse,
      roue,
      cadre,
      moteur,
      selle,
      frein,
      ownerLicense,
      marque,
      newMarque,
      adresseDisponible,
      selectedCouleurs
    } = req.body;

    const images = await Promise.all(
      ownerLicense.map(async (imageData) => {
        const newImage = new Image({
          name: imageData.name,
          path: imageData.photo,
        });
        return await newImage.save();
      })
    );
    const newRoue = await Roue.create(roue);
    const newCadre = await Cadre.create(cadre);

    const newVelo = await Velo.create({
      categorie: categorie._id,
      type: type || null,
      modele,
      genre,
      categorieAge: age,
      taille,
      description,
      suspension,
      vitesse,
      roue: newRoue._id,
      cadre: newCadre._id,
      selle: selle,
      frein,
      pliable: isPliable,
      images: images.map((image) => image._id),
      couleur:selectedCouleurs
    
    });
    if (newMarque) {
      const newMarque = await Marque.create({ nom: newMarque });
      newVelo.marque = newMarque;
      await newVelo.save();
    } else {
      newVelo.marque = marque;
      await newVelo.save();
    }

    if (moteur.type) {
      const newMoteur = await Moteur.create(moteur);
      newVelo.moteur = newMoteur;
      await newVelo.save();
    }

    const newVeloLocation = await VeloLocation.create({
      velo: newVelo,
      stock,
      prixHeure: prix,
      adresseDisponible,
    });
    return res.status(201).json({
      status: "success",
      data: newVeloLocation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllVeloLocations = async (req, res) => {
  try {
    const veloLocations = await VeloLocation.find()
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type,
          },
          { path: "categorie", model: CategorieVelo },
          { path: "marque", model: Marque },
          { path: "images", model: Image },
          { path: "genre", model: Genre },
          { path: "roue", model: Roue },
          { path: "cadre", model: Cadre },
          { path: "selle", model: Selle },
          { path: "frein", model: Frein },
          { path: "categorieAge", model: CategorieAge },
          { path: "moteur", model: Moteur },
          { path: "couleur", model: Couleur },
        ],
      })
      .populate({ path: "avis", model: Avis })
      .populate({ path: "adresseDisponible", model: AdresseLocal });

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getVeloLocationById = async (req, res) => {
  try {
    const { id } = req.params;

    const veloLocations = await VeloLocation.findById(id)
      .populate({
        path: "velo",
        populate: [
          {
            path: "type",
            model: Type,
          },
          { path: "categorie", model: CategorieVelo },
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
          { path: "couleur", model: Couleur },
        ],
      })
      .populate({ path: "avis", model: Avis })
      .populate({ path: "adresseDisponible", model: AdresseLocal });

    if (!veloLocation) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo en location non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};
const updateVeloLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      categorie,
      type,
      modele,
      genre,
      age,
      taille,
      description,
     
      prix,
     adresseDisponible,
      stock,
      isPliable,
      suspension,
      vitesse,
      roue,
      cadre,
      moteur,
      selle,
      frein,
      marque,
      newMarque,
      selectedCouleurs,
      ownerLicense,
    } = req.body;
    console.log(categorie);
    // Recherche du vélo en vente avec son sous-document "velo"
    const veloLocation = await VeloLocation.findById(id).populate("velo");

    if (!veloLocation) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo de Location non trouvé",
      });
    }

    // Mise à jour des champs du sous-document "velo"
    if (categorie) veloLocation.velo.categorie = categorie._id;
    if (type && categorie.nom != "Vélos Electriques ")
      veloLocation.velo.type = type;
    if (modele) veloLocation.velo.modele = modele;
    if (genre) veloLocation.velo.genre = genre;
    if (age) veloLocation.velo.categorieAge = age;
    if (taille) veloLocation.velo.taille = taille;
    if (description) veloLocation.velo.description = description;
    if (suspension !== undefined) veloLocation.velo.suspension = suspension;
    if (vitesse) veloLocation.velo.vitesse = vitesse;
    if (isPliable !== undefined) veloLocation.velo.pliable = isPliable;
    if (selle) veloLocation.velo.selle = selle;
    if (frein) veloLocation.velo.frein = frein;
    if (selectedCouleurs) veloLocation.velo.couleur = selectedCouleurs;

    // Mise à jour des images
    if (ownerLicense && ownerLicense.length > 0) {
      const images = await Promise.all(
        ownerLicense.map(async (imageData) => {
          const newImage = new Image({
            name: imageData.name,
            path: imageData.photo,
          });
          return await newImage.save();
        })
      );
      veloLocation.velo.images = images.map((image) => image._id);
    }

 
    if (roue) {
      if (veloLocation.velo.roue) {
        await Roue.findByIdAndUpdate(veloLocation.velo.roue, roue, {
          new: true,
        });
      } else {
        const newRoue = await Roue.create(roue);
       veloLocation.velo.roue = newRoue._id;
      }
    }

    if (cadre) {
      if (veloLocation.velo.cadre) {
        await Cadre.findByIdAndUpdate(veloLocation.velo.cadre, cadre, {
          new: true,
        });
      } else {
        const newCadre = await Cadre.create(cadre);
        veloLocation.velo.cadre = newCadre._id;
      }
    }

    // Mise à jour du moteur (même logique que roue et cadre)
    if (moteur) {
      if (veloLocation.velo.moteur) {
        await Moteur.findByIdAndUpdate(veloLocation.velo.moteur, moteur, {
          new: true,
        });
      } else {
        const newMoteur = await Moteur.create(moteur);
       veloLocation.velo.moteur = newMoteur._id;
      }
    }

    // Mise à jour de la marque
    if (newMarque) {
      const createdMarque = await Marque.create({ nom: newMarque });
      veloLocation.velo.marque = createdMarque._id;
    } else if (marque) {
      veloLocation.velo.marque = marque;
    }

    
  
    if (prix) veloLocation.prixHeure = prix;
    if (adresseDisponible) veloLocation.adresseDisponible = adresseDisponible;
    if (stock) veloLocation.stock = stock;

    await veloLocation.save();

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloLocation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

export default { createVeloLocation,getAllVeloLocations,getVeloLocationById ,updateVeloLocation};
