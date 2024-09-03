import Couleur from "../../models/couleur.js";

const addCouleur = async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom) {
      return res.status(400).json({ message: "Le champ 'nom' est requis." });
    }

    const newCouleur = new Couleur({ nom });
    await newCouleur.save();

    res.status(201).json(newCouleur);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
export default {addCouleur};