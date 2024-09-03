import mongoose from "mongoose";
import Utilisateur from "./utilisateur";

const guideSchema = new mongoose.Schema({
  utilisateur: { type: Utilisateur.schema, required: true },
  specialité:[{type:String}]
});

const Guide = mongoose.model("guide", clientSchema, "guide");
export default Guide;
