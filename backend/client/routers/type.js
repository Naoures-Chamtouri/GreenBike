import express from "express";
import typeController from "../controllers/type.js"
const router = express.Router()

router.get("/", typeController.getAllTypes);
router.get("/:categorie",typeController.getTypesbyCategory);

export default router;