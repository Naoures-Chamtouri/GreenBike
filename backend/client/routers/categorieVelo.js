import express from "express";
import CategorieVeloController from "../controllers/categorieVelo.js"

const router=express.Router();
router.get('/',CategorieVeloController.getAllCategories);

export default router;