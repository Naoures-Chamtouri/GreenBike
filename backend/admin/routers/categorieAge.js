import categorieAgeController from "../controllers/categorieAge.js"
import express from "express"

const router=express.Router();
router.post("/",categorieAgeController.addCategorieAge);
router.get("/",categorieAgeController.getAllCategorieAge);

export default router;