import express from "express";
import baladeController from "../controllers/balade.js";
import upload from "../../utils/multer.js";

const router = express.Router();

router.post("/",upload.single("ownerLicense"), baladeController.createBalade);
router.get("/:id", baladeController.getBaladeById);
router.put(
  "/:id",
  upload.single("ownerLicense"),
  baladeController.updateBaladeById
);
router.get("/", baladeController.getAllBalades);
router.delete("/:id", baladeController.deleteBaladeById);

export default router;
