import express from "express";
import upload from "../../utils/multer.js";
import profileController from "../controllers/profile.js";
import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";

const router=express.Router();


router.put("/",clientAuthMiddleware,profileController.updateClient);
router.put("/mdp",clientAuthMiddleware,profileController.updatePassword);

export default router;