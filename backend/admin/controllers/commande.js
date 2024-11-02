import Commande from "../../models/commande.js";
import LignePanier from "../../models/lignePanier.js";
import Adresse from "../../models/adresse.js";
import httpStatus from "../../utils/httpStatus.js";
import VeloVente from "../../models/veloVente.js";
import Type from "../../models/type.js";
import CategorieVelo from "../../models/categorieVelo.js";
import Marque from "../../models/marque.js";
import Image from "../../models/image.js";
import Client from "../../models/client.js";
import Ville from "../../models/ville.js";
import District from "../../models/district.js";
import Delegation from "../../models/delegation.js";
import sendEmail from "../../utils/sendMail.js";


const getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate({
        path: "articles",
        populate: {
          path: "article",
          populate: {
            path: "velo",
            populate: [
              {
                path: "type",
                model: Type,
              },
              { path: "categorie", model: CategorieVelo },
              { path: "marque", model: Marque },
              { path: "images", model: Image },
            ],
          },
          model: VeloVente,
        },
        model: LignePanier,
      })
      .populate({
        path: "adresseLivraison",

        populate: [
          { path: "ville", model: Ville },
          { path: "district", model: District },
          { path: "delegation", model: Delegation },
        ],
        model: Adresse,
      })
      .populate({
        path: "client",
        model: Client,
        select:
          "utilisateur.nomUtilisateur utilisateur.email utilisateur.numTelephone ",
      });
    if (commandes.length > 0) {
      return res
        .status(200)
        .json({ status: httpStatus.SUCCESS, data: commandes });
    }
    return res
      .status(200)
      .json({ status: httpStatus.NOT_FOUND, data:[] });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: httpStatus.BAD_REQUEST, message: e });
  }
};

const getCommande = async (req, res) => {
  try {
    const commandeId = req.params.commandeId;
    const commandes = await Commande.findById(commandeId)
      .populate({
        path: "articles",
        populate: {
          path: "article",
          populate: {
            path: "velo",
            populate: [
              {
                path: "type",
                model: Type,
              },
              { path: "categorie", model: CategorieVelo },
              { path: "marque", model: Marque },
              { path: "images", model: Image },
            ],
          },
          model: VeloVente,
        },
        model: LignePanier,
      })
      .populate({
        path: "adresseLivraison",

        populate: [
          { path: "ville", model: Ville },
          { path: "district", model: District },
          { path: "delegation", model: Delegation },
        ],
        model: Adresse,
      })
      .populate({
        path: "client",
        model: Client,
        select:
          "utilisateur.nomUtilisateur utilisateur.email utilisateur.numTelephone ",
      });
    if (commandes) {
      return res
        .status(200)
        .json({ status: httpStatus.SUCCESS, data: commandes });
    }
    return res
      .status(200)
      .json({ status: httpStatus.NOT_FOUND, data:[] });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: httpStatus.BAD_REQUEST, message: e });
  }
};
const updateCommande = async (req, res) => {
  try {
    const { commandeId } = req.params;
    const { statutCommande, dateLivraison } = req.body;

    // Définir les champs à mettre à jour
    const updateFields = {};
    let emailText = "";

    // Vérifier si dateLivraison doit être mise à jour
    if (dateLivraison) {
      updateFields.dateLivraison = dateLivraison;
      /* emailText = `Bonjour ${commande.client.utilisateur.nomUtilisateur},

Votre commande passée le ${commande.dateCommande.toLocaleDateString()} est prévue pour être livrée le ${new Date(
        dateLivraison
      ).toLocaleDateString()}.

Merci de votre confiance.
L'équipe GreenBike`; */
    }
  updateFields.statutCommande = statutCommande;
    // Vérifier si statutCommande doit être mis à jour
    if (statutCommande === "expédiée" || statutCommande === "livrée") {
    
     /*  emailText = `Bonjour ${commande.client.utilisateur.nomUtilisateur},

Votre commande passée le ${commande.dateCommande.toLocaleDateString()} a été ${statutCommande}.

Merci de votre confiance.
L'équipe GreenBike`; */
    }

    // Mettre à jour la commande et peupler les données associées
    const commande = await Commande.findByIdAndUpdate(
      commandeId,
      updateFields,
      { new: true }
    )
      .populate({
        path: "articles",
        populate: {
          path: "article",
          populate: [
            { path: "type", model: Type },
            { path: "categorie", model: CategorieVelo },
            { path: "marque", model: Marque },
            { path: "images", model: Image },
          ],
        },
        model: VeloVente,
      })
      .populate({ path: "adresseLivraison", model: Adresse })
      .populate({
        path: "client",
        model: Client,
        select:
          "utilisateur.nomUtilisateur utilisateur.email utilisateur.numTelephone",
      });

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Envoyer l'email si nécessaire
    /* if (emailText) {
      const sujet = `Mise à jour de votre commande n°${commande._id}`;
      await sendEmail(commande.client.utilisateur.email, sujet, emailText);
    } */

    return res.status(200).json({ status: httpStatus.SUCCESS, data: commande });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const getCommandeByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const commande = await Commande.find({ client: clientId });
    if (commande) {
      return res
        .status(200)
        .json({ status: httpStatus.SUCCESS, data: commande })
        .populate({
          path: "articles",
          populate: {
            path: "article",
            populate: {
              path: "velo",
              populate: [
                {
                  path: "type",
                  model: Type,
                },
                { path: "categorie", model: CategorieVelo },
                { path: "marque", model: Marque },
                { path: "images", model: Image },
              ],
            },
            model: VeloVente,
          },
          model: LignePanier,
        })
        .populate({
          path: "adresseLivraison",
          model: Adresse,
        });
    }
    return res
      .status(200)
      .json({ status: httpStatus.NOT_FOUND, message: "pas de commande ", data:[] });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: httpStatus.BAD_REQUEST, message: e });
  }
};

const getCommandesbyVelo=async(req,res)=>{
  try{
   const veloId=req.params.id

   const commandes = await Commande.find({ "articles.article": veloId });
   return res.status(200).json({ hasOrders: commandes.length > 0 });

  }catch(error){
 console.log("Erreur lors de la vérification des commandes:", error);
 return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

export default {
  getAllCommandes,
  getCommande,
  getCommandeByClient,
  updateCommande,
  getCommandesbyVelo
};
