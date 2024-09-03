import mongoose from "mongoose";

const marqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: {
    type: String,
    enum: ["Vélo", "Equipement", "Vélo et Equipement"],
    required: true,
  },
});
const Marque=mongoose.model("marque",marqueSchema,"marque");
export default Marque;