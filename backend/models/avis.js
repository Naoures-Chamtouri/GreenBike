import mongoose from "mongoose";


const avisSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  note: { type: Number, min: 1, max: 5, required: true },
  commentaire: { type: String },
  date: { type: Date, default: Date.now },
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onType",
  },
  onType: {
    type: String,
    required: true,
    enum: ["VeloLocation", "VeloVente", "Equipement","Balade"],
  },
});

const Avis = mongoose.model("avis", avisSchema,"avis");
export default Avis;
