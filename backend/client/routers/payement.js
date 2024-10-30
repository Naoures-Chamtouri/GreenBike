import express from "express"
import payement from "../controllers/payement.js"
const router=express.Router()
router.post("/",payement);

export default router