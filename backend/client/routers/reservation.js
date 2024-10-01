import reservationController from "../controllers/reservation.js";
import express from "express";

const router=express.Router();

router.post("/",reservationController.createReservation);

export default router;