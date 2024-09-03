import cadreController from "../controllers/cadre.js"
import express from "express";

const router=express.Router();

router.post("/",cadreController.addCadre);
export default router