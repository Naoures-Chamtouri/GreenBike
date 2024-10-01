import selleController from "../controllers/selle.js"
import express from "express";

const router=express.Router();

router.post("/",selleController.addSelle);
router.get("/",selleController.getAllSelles)

export default router