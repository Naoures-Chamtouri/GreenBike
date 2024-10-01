import Balade from "../../models/balade.js";
import httpStatus from "../../utils/httpStatus.js";
import AdresseBalade from "../../models/adresseBalade.js";

// Fonction pour créer une nouvelle ba
const createBalade = async (req, res) => {
  try {
    const {
      nom,
      guide,
      description,
      dateDepart,
      duree,
      participants,
      adresseDepart,
      adresseArrivée,
      tarif,
      longeur,
      Difficulté,
      images,
      typeVelo, 
      conseils, 
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

    // Création d'une nouvelle balade
    const newBalade = new Balade({
      nom,
      description,
      dateDepart,
      duree,
      guide,
      participants,
      adresseDepart: adresseDepartId,
      adresseArrivée: adresseArrivéeId,
      tarif,
      longeur,
      Difficulté,
      images,
      typeVelo,
      conseils,
      etat: "true", 
    });

    
    await newBalade.save();

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: newBalade,
    });
  } catch (error) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};



const getBaladesByGuide = async (req, res) => {
  try {
    const balades = await Balade.find({ guide: req.guide._id });

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: balades,
    });
  } catch (error) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

// Fonction pour obtenir une balade spécifique par ID
const getBaladeById = async (req, res) => {
  try {
    const { id } = req.params;
    const balade = await Balade.findById(id);

    if (!balade) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Balade non trouvée",
      });
    }

    
    if (balade.guide.toString() !== req.guide._id.toString()) {
      return res.status(404).json({
        status: httpStatus.BAD_REQUEST,
        message: "Accès refusé",
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

// Fonction pour mettre à jour une balade par ID
const updateBaladeById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Trouve la balade par ID
    const balade = await Balade.findById(id);

    if (!balade) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Balade non trouvée",
      });
    }

    // Vérifie si la balade appartient au guide
    if (balade.guide.toString() !== req.guide._id.toString()) {
      return res.status(404).json({
        status: httpStatus.BAD_REQUEST,
        message: "Accès refusé",
      });
    }

    // Met à jour la balade
    const updatedBalade = await Balade.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: updatedBalade,
    });
  } catch (error) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

// Fonction pour supprimer une balade par ID
const deleteBaladeById = async (req, res) => {
  try {
    const { id } = req.params;
    const balade = await Balade.findById(id);

    if (!balade) {
      return res.status(400).json({
        status: httpStatus.NOT_FOUND,
        message: "Balade non trouvée",
      });
    }

    // Vérifie si la balade appartient au guide
    if (balade.guide.toString() !== req.guide._id.toString()) {
      return res.status(404).json({
        status: httpStatus.BAD_REQUEST,
        message: "Accès refusé",
      });
    }

    // Supprime la balade
    await Balade.findByIdAndDelete(id);

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Balade supprimée avec succès",
    });
  } catch (error) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};


export default {createBalade,getBaladeById,getBaladesByGuide,updateBaladeById,deleteBaladeById}