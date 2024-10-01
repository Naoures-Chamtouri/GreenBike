import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";
import panierController from "../controllers/panier.js"
import express from "express";

const router =express.Router();

router.get("/",clientAuthMiddleware,panierController.getPanier);
router.post("/sync",clientAuthMiddleware,panierController.syncPanier);


export default router;