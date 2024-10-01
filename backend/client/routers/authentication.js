import express from "express";
import upload from "../../utils/multer.js";
import authenticationController from "../controllers/authentication.js";
import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";

const router=express.Router();

router.post("/login",authenticationController.login);
router.post("/register",upload.single("image"),authenticationController.register);
router.post("/logout",authenticationController.logout);
router.get("/auth",clientAuthMiddleware,(req,res)=>{
    return res.json({data:req.client})
})

export default router;
