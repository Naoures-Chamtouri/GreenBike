import veloVenteController from "../controllers/veloVente.js"
import express from "express";
import upload from "../../utils/multer.js"

const router =express.Router();

router.post("/", upload.single("ownerLicense"), veloVenteController.createVeloVente);
router.get("/",veloVenteController.getAllVeloVentes);
router.get("/:id",veloVenteController.getVeloVenteById);

export default router;