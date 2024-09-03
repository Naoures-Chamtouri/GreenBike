import mongoose from "mongoose";
import Velo from "./velo.js";

const veloVenteSchema = new mongoose.Schema({
  velo: { type: Velo.schema, required: true },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  etat: { type: String, required: true },
  duréeUtilisation:{type: String, required: true },
  avis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avis",
      default:null
    },
  ],
});

const VeloVente = mongoose.model("veloVente", veloVenteSchema, "veloVente");
export default VeloVente;
