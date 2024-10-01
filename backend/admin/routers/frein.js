import freinController from "../controllers/frein.js"
import express from "express"

const router=express.Router()

router.post("/",freinController.addFrein);
router.get("/",freinController.getAllFreins);

export default router;