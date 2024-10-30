import express from "express";
import upload from "../../utils/multer.js";
import authenticationController from "../controllers/authentication.js";
import {adminAuthMiddleware} from "../../authMiddleware/authAdminMiddleware.js";

const router = express.Router();

router.post("/login", authenticationController.loginAdmin);
router.post(
  "/register",
  authenticationController.registerAdmin
);
router.post("/logout", authenticationController.logout);
router.get("/auth", adminAuthMiddleware, (req, res) => {
  
  return res.json({ data: req.admin });
});

export default router;
