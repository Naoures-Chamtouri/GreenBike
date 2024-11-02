import Velo from "../../models/velo.js";
import VeloVente from "../../models/veloVente.js";
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

const createVeloVente = async (req, res) => {
  try {
    const {
      categorie,
      type,
      modele,
      genre,
      age,
      taille,
      description,
      etat,
      prix,
      duree,
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
      selectedCouleurs,
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
      nbrVitesse: vitesse,
      roue: newRoue._id,
      cadre: newCadre._id,
      selle: selle,
      frein,
      pliable: isPliable,
      images: images.map((image) => image._id),
      couleur: selectedCouleurs,
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

    const newVeloVente = await VeloVente.create({
      velo: newVelo,
      stock,
      prix,
      etat,
      duréeUtilisation: duree,
    });
    return res.status(201).json({
      status: "success",
      data: newVeloVente,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllVeloVentes = async (req, res) => {
  try {
    const veloVentes = await VeloVente.find()
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
      .populate({ path: "avis", model: Avis });

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloVentes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};
const getVeloVenteById = async (req, res) => {
  try {
    const { id } = req.params;

    const veloVente = await VeloVente.findById(id).populate({
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
        { path: "couleur", model: Couleur },
      ],
    });

    if (!veloVente) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo en vente non trouvé",
      });
    }

    const avis = await Avis.find({ reference: id, onType: "VeloVente" });
    

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

const updateVeloVente = async (req, res) => {
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
      etat,
      prix,
      duree,
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
  
    // Recherche du vélo en vente avec son sous-document "velo"
    const veloVente = await VeloVente.findById(id).populate("velo");

    if (!veloVente) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo en vente non trouvé",
      });
    }

    // Mise à jour des champs du sous-document "v
    if (categorie) veloVente.velo.categorie = categorie;
    if (type != "undefined") veloVente.velo.type = type;
    if (modele) veloVente.velo.modele = modele;
    if (genre) veloVente.velo.genre = genre;
    if (age) veloVente.velo.categorieAge = age;
    if (taille) veloVente.velo.taille = taille;
    if (description) veloVente.velo.description = description;
    if (suspension !== undefined) veloVente.velo.suspension = suspension;
    if (vitesse) veloVente.velo.nbrVitesse = vitesse;
    if (isPliable !== undefined) veloVente.velo.pliable = isPliable;
    if (selle) veloVente.velo.selle = selle;
    if (frein) veloVente.velo.frein = frein;
    if (selectedCouleurs) veloVente.velo.couleur = selectedCouleurs;

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
      veloVente.velo.images = images.map((image) => image._id);
    }

    // Mise à jour de la roue et du cadre (avec vérification s'ils existent déjà)
    if (roue) {
      if (veloVente.velo.roue) {
        await Roue.findByIdAndUpdate(veloVente.velo.roue, roue, { new: true });
      } else {
        const newRoue = await Roue.create(roue);
        veloVente.velo.roue = newRoue._id;
      }
    }

    if (cadre) {
      if (veloVente.velo.cadre) {
        await Cadre.findByIdAndUpdate(veloVente.velo.cadre, cadre, {
          new: true,
        });
      } else {
        const newCadre = await Cadre.create(cadre);
        veloVente.velo.cadre = newCadre._id;
      }
    }

    // Mise à jour du moteur (même logique que roue et cadre)
    if (moteur) {
      if (veloVente.velo.moteur) {
        await Moteur.findByIdAndUpdate(veloVente.velo.moteur, moteur, {
          new: true,
        });
      } else {
        const newMoteur = await Moteur.create(moteur);
        veloVente.velo.moteur = newMoteur._id;
      }
    }

    // Mise à jour de la marque
    if (newMarque) {
      const createdMarque = await Marque.create({ nom: newMarque });
      veloVente.velo.marque = createdMarque._id;
    } else if (marque) {
      veloVente.velo.marque = marque;
    }

    // Mise à jour des informations spécifiques à VeloVente
    if (etat !== undefined) veloVente.etat = etat;
    if (prix) veloVente.prix = prix;
    if (duree) veloVente.duréeUtilisation = duree;
    if (stock) veloVente.stock = stock;

    await veloVente.save();

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloVente,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const deleteVeloVente = async (req, res) => {
  try {
    const id = req.params.id;
   
    const result = await VeloVente.deleteOne({ _id: id });
    if (result) {
      return res.status(200).json({
        status: httpStatus.SUCCESS,
        message: "delete avec success",
      });
    }
    return res.status(400).json({
      status: httpStatus.ERROR,
      message: "erreur dans le delete",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

export default {
  createVeloVente,
  getAllVeloVentes,
  getVeloVenteById,
  updateVeloVente,
  deleteVeloVente,
};
