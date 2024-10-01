import categorieVeloController from "../controllers/categorieVelo.js";
import express from "express";
const router = express.Router();
router.post("/", categorieVeloController.ajouterCategorieVelo);
router.get("/",categorieVeloController.getAllCategories);

export default router;
