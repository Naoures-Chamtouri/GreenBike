import mongoose from "mongoose";
import Image from "./image.js";

const adminSchema = new mongoose.Schema({
  nomUtilisateur: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
});
const Admin=mongoose.model("admin",adminSchema,"admin")
export default Admin