import express from "express";
import couleurController from "../controllers/couleur.js";

const router = express.Router();

// Route pour ajouter une nouvelle couleur
router.post("/", couleurController.addCouleur);

export default router;
