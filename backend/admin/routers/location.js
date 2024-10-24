import locationController from "../controllers/location.js"
import express from "express";


const router=express.Router();
router.get("/",locationController.getAllLocations);
router.put("/:id",locationController.updateLocation);


export default router;