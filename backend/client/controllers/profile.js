import Client from "../../models/client.js";
import httpStatus from "../../utils/httpStatus.js";
import bcrypt from "bcryptjs";
import Image from "../../models/image.js";
import Utilisateur from "../../models/utilisateur.js";


const updateClient = async (req, res) => {
  try {
    const  id  = req.client._id;
    const { nomUtilisateur, numTelephone, image } = req.body;
  

    const updateFields = {};

    if (nomUtilisateur)
      updateFields["utilisateur.nomUtilisateur"] = nomUtilisateur;
    if (numTelephone) updateFields["utilisateur.numTelephone"] = numTelephone;

    if (image) {
      const newImage = new Image({
        name: image.name,
        path: image.photo,
      });
      await newImage.save();

      updateFields["utilisateur.image"] = newImage._id;
    }

    const client = await Client.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).populate({path:'utilisateur',populate:{path:"image",model:Image}}); 
    

    if (!client) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Client non trouvé",
      });
    }

    res.status(200).json({
      status: httpStatus.OK,
      data: client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { motDePasseActuel, nouveauMotDePasse } = req.body;
   
    const id= req.client._id;

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Client non trouvé",
      });
    }

    const isPasswordValid = await bcrypt.compareSync(
      motDePasseActuel,
      client.utilisateur.motDePasse
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: httpStatus.BAD_REQUEST,
        message: "Ancien mot de passe incorrect",
      });
    }

    const hashedNewPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    client.utilisateur.motDePasse = hashedNewPassword;
    await client.save();

    res.status(200).json({
      status: httpStatus.OK,
      message: "Mot de passe mis à jour avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}; 0
export default {
 
  updateClient,
  updatePassword
};
