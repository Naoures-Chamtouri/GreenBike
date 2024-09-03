import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "LignePanier" }],
  total: { type: Number },
  client:{type:mongoose.Schema.Types.ObjectId,ref:"Client"}
});
const Panier = mongoose.model("panier", panierSchema, "panier");
export default Panier;
