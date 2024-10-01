import locationController from "../controllers/location.js"
import express from "express";

const router =express.Router();

router.post("/",locationController.createLocation);
router.get("/",locationController.getLocationbyUser);

export default router;