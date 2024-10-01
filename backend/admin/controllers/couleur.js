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

const getAllCouleurs=async(req,res)=>{
  try{
    const couleurs=await Couleur.find();
    return res.status(200).json(
      {staus:"success",data:couleurs}
    )
  }
  catch(e){
    console.log(e)
  }
}
export default {addCouleur,getAllCouleurs};