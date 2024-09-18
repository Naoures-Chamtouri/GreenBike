import express from "express";
import authenticationController from "../controllers/authentication.js";

const router=express.Router();

router.post("/request",authenticationController.sendRequest);
router.post("/register",authenticationController.register);
router.post("/login",authenticationController.login);
router.post("/logout",authenticationController.logout);

export default router;