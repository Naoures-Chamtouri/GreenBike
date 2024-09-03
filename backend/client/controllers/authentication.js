import Client from '../../models/client.js';
import httpStatus from '../../utils/httpStatus.js';
import generateToken from '../../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    console.log("Email reçu :", email);

    // Recherche du client
    const clients = await Client.find({ "utilisateur.email": email }).limit(1);
    console.log("Clients trouvés :", clients);

    // Si aucun client n'est trouvé ou le tableau est vide
    if (clients.length === 0) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client non trouvé",
      });
    }

    // Prendre le premier client du tableau
    const client = clients[0];
    console.log("Client trouvé :", client);

    // Vérifiez si le client a été trouvé
    if (client && client.utilisateur) {
      const isPasswordValid = bcrypt.compareSync(
        motDePasse,
        client.utilisateur.motDePasse
      );

      if (isPasswordValid) {
        generateToken(res, client._id);
        res.status(200).json({
          status: httpStatus.SUCCESS,
          data: client,
        });
      } else {
        return res.status(404).json({
          status: httpStatus.ERROR,
          message: "Email ou mot de passe invalide",
        });
      }
    } else {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client non trouvé",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const register = async (req, res) => {
  try {
    const { nomUtilisateur, email, motDePasse, numTelephone, adresse } =
      req.body;
    const image =req.file ? req.file.path : undefined;

    const clientExistant = await Client.findOne({ "utilisateur.email": email });

    if (clientExistant) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client déjà existant",
      });
    }

    const motDePasseHache = bcrypt.hashSync(motDePasse, 10);

    const client = new Client({
      utilisateur: {
        nomUtilisateur,
        email,
        motDePasse: motDePasseHache,
        numTelephone,
        image,
        adresse,
      },
    });

    await client.save();

    generateToken(res, client._id);

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const logout = (req, res) => {
  try {
    
    res.clearCookie("jwt", {
      httpOnly: true
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


export default {
    register,login,logout
}