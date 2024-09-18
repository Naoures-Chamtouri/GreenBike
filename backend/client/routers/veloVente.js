import veloVenteController from "../controllers/veloVente.js";
import express from "express";

const router=express.Router();
router.get("/",veloVenteController.getAllVeloVentes);
router.get("/:id",veloVenteController.getVeloVenteById);
router.post("/filter",veloVenteController.getVeloVentesByFilter);

export default router;