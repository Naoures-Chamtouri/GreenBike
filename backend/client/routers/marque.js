import express from "express";
import marqueController from "../controllers/marque.js"
const router = express.Router()
router.get('/', marqueController.getMarque);
router.get('/:type',marqueController.getMarquebyType);

export default router