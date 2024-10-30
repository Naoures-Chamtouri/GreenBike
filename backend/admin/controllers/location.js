import Location from "../../models/location.js";
import httpStatus from "../../utils/httpStatus.js";
import VeloLocation from "../../models/veloLocation.js";
import AdresseLocal from "../../models/adresseLocal.js";
import Type from "../../models/type.js";
import CategorieVelo from "../../models/categorieVelo.js";
import Marque from "../../models/marque.js";
import Image from "../../models/image.js";
import Client from "../../models/client.js";
import sendEmail from "../../utils/sendMail.js";

const getAllLocations=async(req,res)=>{
    try {
      const locations = await Location.find()
        .populate({
          path: "velo",
          populate: {
            path: "velo",
            populate: [
              {
                path: "type",
                model: Type
              },
              { path: "categorie", model: CategorieVelo },
              { path: "marque", model: Marque },
              { path: "images", model: Image },
            ],
          },
          model: VeloLocation,
        })
        .populate({
          path: "localLocation",
          model: AdresseLocal,
        })
        .populate({ path: "client", model: Client });

         if (locations.length > 0) {
           return res.status(200).json({
             status: httpStatus.SUCCESS,
             data: locations,
           });
         } else {
           return res.status(200).json({
             status: httpStatus.SUCCESS,
             message: "pas de locations",
           });
         }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: httpStatus.ERROR, message: error });
    }}


const updateLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const newStatus = req.body.etat;

    // Find the location and update the status
    const location = await Location.findByIdAndUpdate(
      locationId,
      { etat: newStatus },
      { new: true }
    )
      .populate({
        path: "velo",
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
        model: VeloLocation,
      })
      .populate({
        path: "localLocation",
        model: AdresseLocal,
      })
      .populate({ path: "client", model: Client });
    if (!location) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Erreur lors de la mise à jour de la location",
      });
    }

    // Prepare the email content based on the new status
    const destinataire = location.client.utilisateur.email;
    const sujet = `Mise à jour de votre location n°${location._id}`;
    let emailText = `Bonjour ${location.client.utilisateur.nomUtilisateur},\n\n`;

    switch (newStatus) {
      case "Réservé":
        emailText += `Votre réservation de vélo a été confirmée. Elle commencera le ${location.dateDebut.toLocaleDateString()} et se terminera le ${location.dateFin.toLocaleDateString()}.\n\nMerci de votre confiance,\nL'équipe GreenBike`;
        break;

      case "En Cours":
        emailText += `Votre location de vélo est maintenant en cours depuis le ${location.dateDebut.toLocaleDateString()}.\n\nProfitez de votre trajet,\nL'équipe GreenBike`;
        break;

      case "Terminé":
        emailText += `Votre location de vélo est maintenant terminée. Nous espérons que vous avez apprécié votre expérience.\n\nMerci de votre confiance,\nL'équipe GreenBike`;
        break;

      case "Annulé":
        emailText += `Votre réservation de vélo a été annulée. Si vous avez des questions, n'hésitez pas à nous contacter.\n\nCordialement,\nL'équipe GreenBike`;
        break;

      case "En retard":
       emailText += `Votre location de vélo est en retard. Vous deviez rendre le vélo le ${location.dateFin.toLocaleDateString()}. Merci de le retourner dès que possible ou de contacter notre service client pour toute assistance.\n\nCordialement,\nL'équipe GreenBike`;
        break;

      default:
        emailText += `Votre location a été mise à jour.\n\nMerci de votre confiance,\nL'équipe GreenBike`;
    }

    // Send the email
  /*   await sendEmail(destinataire, sujet, emailText); */

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Location mise à jour avec succès",
      data: location,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


export default {getAllLocations,updateLocation}