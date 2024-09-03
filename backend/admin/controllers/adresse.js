import Adresse from "../../models/adresse.js"


 const addAdresse = async (req, res) => {
  try {
    const { ville, codePostal } = req.body;
    if (!ville || !codePostal ) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    const newAdresse = new Adresse({
      ville,
      codePostal
    });

    await newAdresse.save();

    res.status(201).json(newAdresse);
  } catch (error) {
    
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
export default {addAdresse};