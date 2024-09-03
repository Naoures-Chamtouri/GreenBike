import express from "express";
import marqueController from "../controllers/marque.js";
 
const router = express.Router();
router.post("/",marqueController.createMarque);

export default router;