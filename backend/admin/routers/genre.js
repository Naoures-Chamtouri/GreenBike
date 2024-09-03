import genreController from "../controllers/genre.js"
import express from "express"

const router=express.Router();

router.post("/",genreController.addGenre);

export default router;