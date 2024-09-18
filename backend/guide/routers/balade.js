import express from "express";
import baladeController from "../controllers/balade.js"


const router=express.Router();

router.post("/",baladeController.createBalade);
router.get("/:id",baladeController.getBaladeById);
router.put("/:id",baladeController.updateBaladeById);
router.get("/",baladeController.getBaladesByGuide);
router.delete("/:id",baladeController.deleteBaladeById);

export default router;