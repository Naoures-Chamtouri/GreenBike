import moteurController from "../controllers/moteur.js";
import express from "express";

const router=express.Router();

router.post("/",moteurController.addMoteur);

export default router;