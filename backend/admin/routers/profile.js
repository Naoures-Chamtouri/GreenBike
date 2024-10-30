import express from "express";

import profileController from "../controllers/profile.js";
import {adminAuthMiddleware} from "../../authMiddleware/authAdminMiddleware.js";

const router = express.Router();

router.put("/", adminAuthMiddleware, profileController.updateAdmin);
router.put("/mdp", adminAuthMiddleware, profileController.updatePassword);

export default router;
