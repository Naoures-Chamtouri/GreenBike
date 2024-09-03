import selleController from "../controllers/selle.js"
import express from "express";

const router=express.Router();

router.post("/",selleController.addSelle);

export default router