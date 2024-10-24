import mongoose from "mongoose";

const adresseBaladeSchema = new mongoose.Schema({
  lat:{type:Number,default:0} ,
  lng:{type:Number,default:0},
  nom:String
});

const AdresseBalade = mongoose.model("adresseBalade", adresseBaladeSchema, "adresseBalade");
export default AdresseBalade;
