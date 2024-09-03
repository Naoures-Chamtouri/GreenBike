import Client from "../../models/client.js";
import httpStatus from "../../utils/httpStatus.js";
import bcrypt from "bcryptjs";
import Adresse from "../../models/adresse.js";

const getClient = async (req, res) => {
  try {
    const { id } = req.params; 

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomUtilisateur, email, motDePasse, numTelephone, adresse } =
      req.body;
    const image = req.file ? req.file.path : undefined; 

    const updateFields = {}; 

    if (nomUtilisateur)
      updateFields["utilisateur.nomUtilisateur"] = nomUtilisateur;
    if (email) updateFields["utilisateur.email"] = email;
    if (motDePasse)
      updateFields["utilisateur.motDePasse"] = bcrypt.hashSync(motDePasse, 10); 
    if (numTelephone) updateFields["utilisateur.numTelephone"] = numTelephone;
    if (image) updateFields["utilisateur.image"] = image;
    if (adresse) updateFields["utilisateur.adresse"] = adresse;

    const client = await Client.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params.id; 

  
    const client = await Client.findById(userId);

    if (!client) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client non trouvé",
      });
    }

    
    const isPasswordValid =await bcrypt.compare(
      oldPassword,
      client.utilisateur.motDePasse
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: httpStatus.ERROR,
        message: "Ancien mot de passe incorrect",
      });
    }

     
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

    client.utilisateur.motDePasse = hashedNewPassword;
    await client.save();

    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Mot de passe mis à jour avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
export default {
  getClient,
  updateClient,
  updatePassword
};
