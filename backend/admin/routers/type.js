import typeController from "../controllers/type.js"
import express from "express";

const router=express.Router();
router.post("/",typeController.createType);
router.get("/:categorie",typeController.getTypesbyCategory);

export default router;