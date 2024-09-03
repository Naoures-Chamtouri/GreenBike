import freinController from "../controllers/frein.js"
import express from "express"

const router=express.Router()

router.post("/",freinController.addFrein);

export default router;