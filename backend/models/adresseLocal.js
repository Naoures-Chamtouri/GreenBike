import mongoose from "mongoose";

const adresseLocalSchema = new mongoose.Schema({
  ville:String,
  delegation: String,
  district: String,
  adresse: String,
});

const AdresseLocal = mongoose.model("adresseLocal", adresseLocalSchema, "adresseLocal");
export default AdresseLocal;
