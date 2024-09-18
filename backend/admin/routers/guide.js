import guideController from "../controllers/guide.js";
import express from "express";

const router=express.Router();

router.get("/",guideController.getAllGuides);
router.get("/:id",guideController.getGuidebyId);
router.get("/requests",guideController.getAllGuideRequest);
router.get("/accept",guideController.acceptGuide);
router.get("/delete",guideController.rejectGuide);

export default router;
