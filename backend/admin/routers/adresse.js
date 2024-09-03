import express from "express";
import adresseController from "../controllers/adresse.js";

const router = express.Router();

// Route pour ajouter une nouvelle adresse
router.post("/add",adresseController.addAdresse);

export default router;
