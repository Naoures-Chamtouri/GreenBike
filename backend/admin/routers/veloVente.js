import veloVenteController from "../controllers/veloVente.js"
import express from "express";

const router =express.Router();

router.post("/",veloVenteController.createVeloVente);

export default router;