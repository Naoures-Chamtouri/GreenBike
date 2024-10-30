import Admin from "../../models/admin.js"; 
import httpStatus from "../../utils/httpStatus.js";
import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Contrôleur pour l'inscription
const registerAdmin = async (req, res) => {
  const { nomUtilisateur, email, motDePasse } = req.body;

  try {
    // Vérifier si l'admin existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin déjà enregistré" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Créer un nouvel admin
    const newAdmin = new Admin({
      nomUtilisateur,
      email,
      motDePasse: hashedPassword,
      
    });

    await newAdmin.save();

    generateToken(res,newAdmin._id);

    const adminObj = newAdmin.toObject();
    delete adminObj.motDePasse;
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: adminObj,
    });
  
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

// Contrôleur pour la connexion
const loginAdmin = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Trouver l'admin par email
    const admin = await Admin.findOne({ email }).populate({
      path: "image",
      model: Image,
    });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compareSync(motDePasse, admin.motDePasse);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }
  const adminObj = admin.toObject();

  delete adminObj.motDePasse;

     generateToken(res, admin._id);
     return res.status(200).json({
       status: httpStatus.SUCCESS,
       data: adminObj,
     });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

// Contrôleur pour la déconnexion
const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
    });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


export default {logout,loginAdmin,registerAdmin}