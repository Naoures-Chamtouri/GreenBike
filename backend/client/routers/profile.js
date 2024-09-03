import express from "express";
import upload from "../../utils/multer.js";
import profileController from "../controllers/profile.js";

const router=express.Router();

router.get("/:id",profileController.getClient);
router.post("/:id",upload.single("image"),profileController.updateClient);
router.put("/:id",profileController.updatePassword);

export default router;