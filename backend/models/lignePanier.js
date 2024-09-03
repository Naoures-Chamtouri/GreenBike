import mongoose from "mongoose";

const lignePanierSchema = new mongoose.Schema({
  onType: {
    type: String,
    required: true,
    enum: ["VeloVente", "Equipement"],
  },
  article:{
    type: mongoose.Schema.Types.ObjectId,
    refPath:"onType",
    required:true
  },
 quantité:{
    type:Number,
    min:1,
    required:true
 },
 total:{type:Number}
});

const LignePanier=mongoose.model("lignePanier",lignePanierSchema,"lignePanier");
export default LignePanier;