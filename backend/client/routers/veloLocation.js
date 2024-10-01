import express from "express";
import veloLocationController from "../controllers/veloLocation.js"
const router=express.Router();

router.get("/",veloLocationController.getAllVeloLocations);
router.get("/:id",veloLocationController.getVeloLocationById);
router.post("/filter",veloLocationController.getVeloLocationsByFilter);


export default router;