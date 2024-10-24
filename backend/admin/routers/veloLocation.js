import express from "express"
import veloLocationController from "../controllers/veloLocation.js"
import upload from "../../utils/multer.js";

const router=express.Router();

router.post("/", upload.single("ownerLicense"),veloLocationController.createVeloLocation);
router.get("/",veloLocationController.getAllVeloLocations);
router.get("/:id",veloLocationController.getVeloLocationById);
router.put("/:id", upload.single("ownerLicense"),veloLocationController.updateVeloLocation);

export default router;