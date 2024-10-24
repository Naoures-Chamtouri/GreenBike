import adresseLocalController from "../controllers/adresseLocal.js";
import express from "express";

const router =express.Router();
router.get("/",adresseLocalController.getAllAdresses);

export default router;
