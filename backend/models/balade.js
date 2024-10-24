import mongoose from "mongoose";
import generateNumericId from "../utils/generateId.js"
const baladeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  dateDepart: { type: Date, required: true },
  duree: { type: Number, required: true },
/*   guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true }, */
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
  adresseDepart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdresseBalade",
    required: false,
  },
  adresseArrivée: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdresseBalade",
    required: false,
  },
  trajet:[
    {
    lat:Number,
    lng:Number
}],
  tarif: { type: Number, required: true },
  distance: { type: Number, required: true },
  Difficulté: { type: String, enum: ["facile", "modéré", "difficile"] },
  images: [{ type: mongoose.Schema.Types.ObjectId,ref:"Image" }],
  etat: { type: String, enum:["Publiée","Archivée"] },
  ref: {
    type: String,
    unique: true,
    required: true,
    default:generateNumericId,
  },
  typeVelo: { type: String },
  conseils: [{ type: String }],
});

const Balade = mongoose.model("balade", baladeSchema,"balade");

export default Balade;
