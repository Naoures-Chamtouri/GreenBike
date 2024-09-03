import avisController from "../controllers/avis.js"
import express from "express";

const router=express.Router();

router.post("/",avisController.createAvis);
router.get("/:id",avisController.getAvis);

export default router;