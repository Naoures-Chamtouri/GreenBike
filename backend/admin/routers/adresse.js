import express from "express";
import adresseController from "../controllers/adresse.js";

const router = express.Router();


/* router.post("/add",adresseController.addAdresse); */
router.get("/",adresseController.getAdresse);

export default router;
