import mongoose from "mongoose";
import generateNumericId from "../utils/generateId.js"
const baladeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  dateDepart: { type: Date, required: true },
  duree: { type: Number, required: true },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },
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
  tarif: { type: Number, required: true },
  longeur: { type: Number, required: true },
  Difficulté: { type: String, enum: ["facile", "modéré", "difficile"] },
  images: [{ type: String }],
  etat: { type: String, default: "false" },
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
