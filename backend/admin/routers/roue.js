import roueController from "../controllers/roue.js"
import express from "express";

const router=express.Router();

router.post("/",roueController.addRoue);
export default router