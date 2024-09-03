import express from "express"
import veloLocationController from "../controllers/veloLocation.js"

const router=express.Router();

router.post("/",veloLocationController.createVeloLocation);

export default router;