import Velo from "../../models/velo.js";
import Moteur from "../../models/moteur.js";
import Selle from "../../models/selle.js";
import Roue from "../../models/roue.js";
import Cadre from "../../models/cadre.js";
import Frein from "../../models/frein.js";
import Marque from "../../models/marque.js";
import Couleur from "../../models/couleur.js";
import Genre from "../../models/genre.js";
import CategorieAge from "../../models/categorieAge.js";
import Type from "../../models/type.js";
export const addVelo = async (req, res) => {
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
      images,
      genre,
      roue,
      cadre,
      selle,
      frein,
      categorieAge,
      moteur,
      pliable,
    } = req.body;

    // Vérification des IDs existants pour categorieAge et genre
    if (!categorieAge || !categorieAge._id) {
      return res.status(400).json({
        status: "error",
        message:
          "categorieAge est requis et doit exister dans la base de données.",
      });
    }

    if (!genre || genre.length === 0 || genre.some((g) => !g._id)) {
      return res.status(400).json({
        status: "error",
        message:
          "Tous les genres doivent être sélectionnés parmi les objets existants.",
      });
    }

    // Gestion des autres caractéristiques (moteur, selle, roue, cadre, etc.)
    const moteurId =
      moteur?._id || (moteur && (await new Moteur(moteur).save())._id);
    const selleId =
      selle?._id || (selle && (await new Selle(selle).save())._id);
    const roueIds = await Promise.all(
      (roue || []).map(async (r) => r._id || (await new Roue(r).save())._id)
    );
    const cadreId =
      cadre?._id || (cadre && (await new Cadre(cadre).save())._id);
    const freinIds = await Promise.all(
      (frein || []).map(async (f) => f._id || (await new Frein(f).save())._id)
    );

    const marqueId =
      marque?._id || (marque && (await new Marque(marque).save())._id);
    const couleurIds = await Promise.all(
      (couleur || []).map(
        async (c) => c._id || (await new Couleur(c).save())._id
      )
    );

    // Création du vélo avec les caractéristiques spécifiées
    const nouveauVelo = new Velo({
      type,
      modele,
      poids,
      nbrVitesse,
      suspension,
      description,
      marque: marqueId,
      couleur: couleurIds,
      images,
      genre: genre.map((g) => g._id),
      roue: roueIds,
      cadre: cadreId,
      selle: selleId,
      frein: freinIds,
      categorieAge: categorieAge._id,
      moteur: moteurId,
      pliable,
    });

    // Sauvegarde du vélo dans la base de données
    const veloEnregistre = await nouveauVelo.save();

    // Réponse avec les détails du vélo enregistré
    res.status(201).json({
      status: "success",
      data: veloEnregistre,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout du vélo",
      error: error.message,
    });
  }
};
