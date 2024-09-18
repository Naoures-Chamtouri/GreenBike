import mongoose from "mongoose";
import Utilisateur from "./utilisateur.js";

const guideSchema = new mongoose.Schema({
  utilisateur: { type: Utilisateur.schema, required: true },
  cv:{type:String},
  etat:{type:String,enum:["accepté","refusé"],default:"refusé"}
});

const Guide = mongoose.model("guide", guideSchema, "guide");
export default Guide;
