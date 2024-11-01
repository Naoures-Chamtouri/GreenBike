import express from "express"
import payementController from "../controllers/payement.js"
const router=express.Router()
router.post("/braintree/checkout", payementController.payement);
router.get("/braintree/token",payementController.keyClient);

export default router