import Client from '../../models/client.js';
import Panier from '../../models/panier.js'
import httpStatus from '../../utils/httpStatus.js';
import generateToken from '../../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    console.log("Email reçu :", email);

    
    const clients = await Client.find({ "utilisateur.email": email }).limit(1);
    console.log("Clients trouvés :", clients);

    
    if (clients.length === 0) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Client non trouvé",
      });
    }

   
    const client = clients[0];
    console.log("Client trouvé :", client);

   
    if (client && client.utilisateur) {
      const isPasswordValid = bcrypt.compareSync(
        motDePasse,
        client.utilisateur.motDePasse
      );

      const clientObj = client.toObject();

     
      delete clientObj.utilisateur.motDePasse;

      if (isPasswordValid) {
        generateToken(res, client._id);
       return res.status(200).json({
          status: httpStatus.SUCCESS,
          data: clientObj,
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
    const { nomUtilisateur, email, motDePasse } =
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
        image,
        role:"client"
      },
    });
  

    await client.save();
      const panier = new Panier({
        client:client._id
      });
      await panier.save();

    generateToken(res, client._id);
const clientObj = client.toObject();


delete clientObj.utilisateur.motDePasse;
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: clientObj,
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