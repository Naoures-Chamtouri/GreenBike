import express from "express";
import reservationController from "../controllers/reservation.js";
const router = express.Router();
router.get("/", reservationController.getReservations);
router.get("/:baladeId",reservationController.getReservationsbyBalade);
router.put("/:id",reservationController.updateReservation);


export default router;