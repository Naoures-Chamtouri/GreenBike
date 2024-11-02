import Balade from "../../models/balade.js";
import httpStatus from "../../utils/httpStatus.js";
import AdresseBalade from "../../models/adresseBalade.js";
import Image from "../../models/image.js";
import sendEmail from '../../utils/sendMail.js'
import Reservation from "../../models/reservation.js";
import Client from "../../models/client.js";
// Fonction pour créer une nouvelle ba
const createBalade = async (req, res) => {
  try {
    const {
      nom,
      description,
      dateDepart,
      duree,
      adresseDepart,
      adresseArrivée,
      tarif,
      distance,
      Difficulté,
      ownerLicense,
      typeVelo,
      conseils,
      trajet
    } = req.body;

    let adresseDepartId = null;
    if (adresseDepart) {
      const newAdresseDepart = new AdresseBalade(adresseDepart);
      const savedAdresseDepart = await newAdresseDepart.save();
      adresseDepartId = savedAdresseDepart._id;
    }

    let adresseArrivéeId = null;
    if (adresseArrivée) {
      const newAdresseArrivée = new AdresseBalade(adresseArrivée);
      const savedAdresseArrivée = await newAdresseArrivée.save();
      adresseArrivéeId = savedAdresseArrivée._id;
    }

    const images = await Promise.all(
      ownerLicense.map(async (imageData) => {
        const newImage = new Image({
          name: imageData.name,
          path: imageData.photo,
        });
        return await newImage.save();
      })
    );

    const newBalade =await Balade.create({
      nom,
      description,
      dateDepart,
      duree,
      trajet,
      adresseDepart: adresseDepartId,
      adresseArrivée: adresseArrivéeId,
      tarif,
      distance,
      Difficulté,
      images:images.map((image) => image._id),
      typeVelo,
      conseils,
      etat:"Publiée"
    
    });

    await newBalade.save();

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: newBalade,
    });
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

const getAllBalades = async (req, res) => {
  try {
    const Balades = await Balade.find()
      .populate({ path: "adresseDepart", model: AdresseBalade })
      .populate({ path: "adresseArrivée", model: AdresseBalade }).populate({path:"images",model:Image})
    if(Balades.length>0){  return res.status(200).json({ status: httpStatus.SUCCESS, data: Balades });}
    else{  return res.status(200).json({ status: httpStatus.SUCCESS, data:[] });}
  } catch (error) {
    return res.status(500).json({ staus: httpStatus.ERROR, message: error.message });
  }
};



const getBaladeById = async (req, res) => {
  try {
    const { id } = req.params;
    const balade = await Balade.findById(id)
      .populate({ path: "adresseDepart", model: AdresseBalade })
      .populate({ path: "adresseArrivée", model: AdresseBalade })
      .populate({ path: "images", model: Image });

    if (!balade) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Balade non trouvée",
      });
    }

    

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: balade,
    });
  } catch (error) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


const updateBaladeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { etat} = req.body;

    // Trouve la balade par ID
    const balade = await Balade.findById(id);

    if (!balade) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Balade non trouvée",
      });
    }
   
    
    const updatedBalade = await Balade.findByIdAndUpdate(
      id,
      {
        etat: etat,
      },
      { new: true }
    )
      .populate({ path: "adresseDepart", model: AdresseBalade })
      .populate({ path: "adresseArrivée", model: AdresseBalade })
      .populate({ path: "images", model: Image });;
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: updatedBalade,
    });
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


const deleteBaladeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Rechercher la balade à supprimer
    const balade = await Balade.findById(id)
      .populate({ path: "adresseDepart", model: AdresseBalade })
      .populate({ path: "adresseArrivée", model: AdresseBalade });

    if (!balade) {
      return res.status(400).json({
        status: httpStatus.NOT_FOUND,
        message: "Balade non trouvée",
      });
    }

    // Récupérer les réservations associées à cette balade
    const reservations = await Reservation.find({ balade: id }).populate({
      path: 'participant',
      populate: {
        path: 'utilisateur', // On accède à utilisateur pour récupérer l'e-mail
        select: 'email', // On sélectionne uniquement l'e-mail
      },model:Client
    });

    // Détails de la balade pour le message
    const nomBalade = balade.nom;
    const dateDepart = balade.dateDepart.toLocaleString(); // Formatage de la date
    const adresseDepart = balade.adresseDepart.nom;
    const adresseArrivee = balade.adresseArrivée.nom;

    // Message personnalisé
    const message = `
      Bonjour,

      Nous vous informons que la balade "${nomBalade}", prévue pour le ${dateDepart}, a été annulée.
      Départ : ${adresseDepart}
      Arrivée : ${adresseArrivee}

      Nous nous excusons pour la gêne occasionnée et vous remercions de votre compréhension.

      Cordialement,
      L'équipe de GreenBike
    `;

    // Envoyer un e-mail à chaque participant de la balade
    for (const reservation of reservations) {
      const email = reservation.participant.utilisateur.email;

      if (email) {
        // Envoi de l'e-mail de notification avec le message détaillé
        await sendEmail(
          email,
          'Annulation de la balade',
          message
        );
      }
    }

     await Reservation.deleteMany({ balade: id });
    await Balade.findByIdAndDelete(id);

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Balade supprimée avec succès, et les participants ont été informés.",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};




export default {
  createBalade,
  getAllBalades,
  getBaladeById,
  updateBaladeById,
  deleteBaladeById,
};
