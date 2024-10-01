import express from "express"
import veloLocationController from "../controllers/veloLocation.js"

const router=express.Router();

router.post("/",veloLocationController.createVeloLocation);
router.get("/",veloLocationController.getAllVeloLocations);
router.get("/:id",veloLocationController.getVeloLocationById)

export default router;