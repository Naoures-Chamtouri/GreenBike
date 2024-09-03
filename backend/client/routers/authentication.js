import express from "express";
import upload from "../../utils/multer.js";
import authenticationController from "../controllers/authentication.js";

const router=express.Router();

router.post("/login",authenticationController.login);
router.post("/register",upload.single("image"),authenticationController.register);
router.post("/logout",authenticationController.logout);

export default router;
