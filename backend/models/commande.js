import mongoose from "mongoose";

const commandeSchema = new mongoose.Schema({
  panier: { type: mongoose.Schema.Types.ObjectId, ref: "Panier" },
  adresseLivraison: {
    type: String,
    required: true,
  },
  statutCommande: {
    type: String,
    enum: ["en cours", "expédiée", "livrée", "annulée"],
    default: "en cours",
  },
  dateCommande: {
    type: Date,
    default: Date.now,
  },
  dateLivraison: {
    type: Date,
  }
});