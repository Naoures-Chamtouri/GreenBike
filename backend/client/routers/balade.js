import baladeController from "../controllers/balade.js"
import express from "express";

const router=express.Router();

router.get("/",baladeController.getAllBalades);
router.get("/:id",baladeController.getBaladebyId);


export default router