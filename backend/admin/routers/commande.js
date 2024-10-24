import commandeController from "../controllers/commande.js"
import express from "express";

const router=express.Router();
router.get("/",commandeController.getAllCommandes);
router.get("/:commandeId",commandeController.getCommande);
router.put("/:commandeId",commandeController.updateCommande);

export default router;