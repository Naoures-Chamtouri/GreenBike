import adresseController from "../controllers/adresse.js"
import express from "express";
import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";

const router=express.Router();
router.get("/villes", adresseController.getAllVilles);
router.get("/delegations/:villeId",adresseController.getDelegationbyVille);
router.get("/districts/:delegationId",adresseController.getDistrictbyDelegation);

export default router;