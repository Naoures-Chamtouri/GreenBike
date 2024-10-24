import locationController from "../controllers/location.js"
import express from "express";
import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";

const router =express.Router();

router.post("/", clientAuthMiddleware, locationController.createLocation);
router.get("/", clientAuthMiddleware, locationController.getLocationbyUser);
router.post("/check-availability", locationController.checkAvailability);

export default router;