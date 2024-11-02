import Admin from "../../models/admin.js";
import httpStatus from "../../utils/httpStatus.js";
import bcrypt from "bcryptjs";
import Image from "../../models/image.js";


const updateAdmin = async (req, res) => {
  try {
    const id = req.admin._id;
    const { nomUtilisateur, image } = req.body;


    const updateFields = {};

    if (nomUtilisateur)
      updateFields["nomUtilisateur"] = nomUtilisateur;
 
    if (image) {
      const newImage = new Image({
        name: image.name,
        path: image.photo,
      });
      await newImage.save();

      updateFields["image"] = newImage._id;
    }

    const admin = await Admin.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).populate({ path: "image", model: Image });
    

    if (!admin) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Admin non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.OK,
      data: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { motDePasseActuel, nouveauMotDePasse } = req.body;
  
    const id = req.admin._id;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "admin non trouvé",
      });
    }

    const isPasswordValid = await bcrypt.compareSync(
      motDePasseActuel,
      admin.motDePasse
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: httpStatus.BAD_REQUEST,
        message: "Ancien mot de passe incorrect",
      });
    }

    const hashedNewPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    admin.motDePasse = hashedNewPassword;
    await admin.save();

    res.status(200).json({
      status: httpStatus.OK,
      message: "Mot de passe mis à jour avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
0;
export default {
  updateAdmin,
  updatePassword,
};
