import mongoose from "mongoose";


const adresseSchema = new mongoose.Schema({
  ville: { type: mongoose.Schema.Types.ObjectId, ref: "Ville" },
  delegation: { type: mongoose.Schema.Types.ObjectId, ref: "Delegation" },
  district: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
  adresse: String,
});

const Adresse=mongoose.model("adresse",adresseSchema,"adresse");
export default Adresse;