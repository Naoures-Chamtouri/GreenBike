import { ajouterCategorieVelo } from "../controllers/categorieVelo.js";
import express from "express";
const router = express.Router();
router.post("/", ajouterCategorieVelo);

export default router;
