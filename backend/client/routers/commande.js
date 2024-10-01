import commandeController from "../controllers/commande.js";
import express from "express"
import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";

const router=express.Router();

router.post("/",clientAuthMiddleware,commandeController.passerCommande);
router.get("/",clientAuthMiddleware,commandeController.getCommandes);

export default router;