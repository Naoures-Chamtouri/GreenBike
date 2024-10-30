import mongoose from "mongoose";
import Image from "./image.js";
const utilisateurSchema = new mongoose.Schema({
  nomUtilisateur: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  numTelephone: { type: Number },
  image:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  adresse: { type: mongoose.Schema.Types.ObjectId, ref: "Adresse" },
  motDePasse: {
    type: String,
    required: function () {
      return this.etat === "accepté";
    },
  },
  role: { type: String, enum: ["admin", "guide", "client"], default: "client" },
});

const Utilisateur = mongoose.model(
  "utilisateur",
  utilisateurSchema,
  "utilisateur"
);
export default Utilisateur;
