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
      marque,newMarque,selectedCouleurs
    } = req.body;

    const images = await Promise.all(
      ownerLicense.map(async (imageData) => {
        const newImage = new Image({
          name:imageData.name,
          path:imageData.photo
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
      couleur: selectedCouleurs,
    });
    if (newMarque) {
      const newMarque = await Marque.create({ nom: newMarque });
      newVelo.marque=newMarque;
      await newVelo.save()
    } else {
      newVelo.marque=marque;
      await newVelo.save()
      }


      if (moteur.type) {
        const newMoteur = await Moteur.create(moteur);
        newVelo.moteur=newMoteur;
        await newVelo.save()  
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
   console.log(error)
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
          {path:"couleur",model:Couleur}
        ],
      })
      .populate({ path: "avis", model: Avis });

    return  res.status(200).json({
      status: httpStatus.SUCCESS,
      data: veloVentes,
    });
  } catch (error) {
    console.log(error)
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
    console.log(avis);

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

export default { createVeloVente,getAllVeloVentes,getVeloVenteById };
