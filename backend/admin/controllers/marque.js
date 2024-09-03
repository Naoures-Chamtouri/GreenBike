import Marque from "../../models/marque.js"
import httpStatus from "../../utils/httpStatus.js";

const createMarque = async (req, res) => {
  try {
    const { nom, type } = req.body;

    const existingMarque = await Marque.findOne({nom});
    if (existingMarque) {
      return res
        .status(400)
        .json({ status:httpStatus.FAIL, message: "La marque existe déjà." });
    }

    
    const newMarque = new Marque({ nom, type });
    await newMarque.save();

    res.status(201).json({ status: httpStatus.SUCCESS, data: newMarque });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status:httpStatus.BAD_REQUEST,
        message: "Validation error: " + error.message,
      });
    }
    res
      .status(500)
      .json({
        status:httpStatus.ERROR,
        message: "Erreur lors de la création de la marque.",
        error: error.message,
      });
  }
};

export default {createMarque}