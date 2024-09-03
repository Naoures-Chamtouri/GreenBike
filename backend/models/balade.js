import mongoose from "mongoose";
const baladeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  dateDepart: { type: Date, required: true },
  duree: { type: Number, required: true },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
  adresseDepart: { type: mongoose.Schema.Types.ObjectId, ref: "Adresse" },
  adresseArrivée: { type: mongoose.Schema.Types.ObjectId, ref: "Adresse" },
  tarif: { type: Number, required: true },
  longeur: { type: Number, required: true },
  Difficulté: { type: String, enum: ["facile", "modéré", "difficile"] },
});

const Balade = mongoose.model("Balade", baladeSchema);

export default Balade;
