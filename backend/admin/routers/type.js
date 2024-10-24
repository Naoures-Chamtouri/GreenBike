import typeController from "../controllers/type.js"
import express from "express";

const router=express.Router();
router.post("/",typeController.createType);
router.get("/:categorie",typeController.getTypesbyCategory);
router.get("/",typeController.getAllTypes)

export default router;