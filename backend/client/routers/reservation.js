import reservationController from "../controllers/reservation.js";
import express from "express";
import clientAuthMiddleware from "../../authMiddleware/authClientMiddleware.js";

const router=express.Router();

router.post("/",reservationController.createReservation);
router.get('/',clientAuthMiddleware,reservationController.getReservationsByUser)

export default router;