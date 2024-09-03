import httpStatus from "../../utils/httpStatus.js";
import Roue from "../../models/roue.js";


const addRoue = async (req, res) => {
  try {
    const { materiau, taille, nbrRayon, largeurJante, poids } = req.body;


    const nouvelleRoue = new Roue({
      materiau: materiau || "",
      taille: taille || 0,
      nbrRayon: nbrRayon || 0,
      largeurJante: largeurJante || 0,
      poids: poids || 0,
    });

    
    const roueEnregistree = await nouvelleRoue.save();

   
    res.status(201).json({
      status: httpStatus.SUCCESS,
      data: roueEnregistree,
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: "Erreur lors de l'ajout de la roue",
      error: error.message,
    });
  }
};

export default {addRoue};