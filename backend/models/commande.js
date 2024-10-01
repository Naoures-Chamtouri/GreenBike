import mongoose from "mongoose";
import LignePanier from "./lignePanier.js";

const commandeSchema = new mongoose.Schema({
  client:{type:mongoose.Schema.Types.ObjectId,ref:"Client"},
  numTelephone:{type:String},
 articles :[{type:LignePanier.schema}],
  adresseLivraison: {
    type: mongoose.Schema.Types.ObjectId,ref:"Adresse",
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
  },
  total:Number
});

const Commande= mongoose.model("commande",commandeSchema,"commande");
export default Commande;