import baladeController from "../controllers/balade.js"
import express from "express";

const router=express.Router();

router.get("/",baladeController.getAllBalades);
router.get("/:id",baladeController.getBaladebyId);
router.post("/filter",baladeController.filterBalades);



export default router