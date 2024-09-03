import mongoose from "mongoose";

const factureSchema = new mongoose.Schema({
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commande",
    required: true,
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
  montantTotal: {
    type: Number,
    required: true,
  },
  statutPaiement: {
    type: String,
    enum: ["en attente", "payée", "annulée"],
    default: "en attente",
  },
  dateEmission: {
    type: Date,
    default: Date.now,
  },
  datePaiement: {
    type: Date,
  },
});

const Facture = mongoose.model("Facture", factureSchema, "facture");
export default Facture;
