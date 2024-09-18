import mongoose from "mongoose";

const adresseBaladeSchema = new mongoose.Schema({
  lat:{type:Number,default:0} ,
  lng:{type:Number,default:0},
  location:String
});

const AdresseBalade = mongoose.model("adresseBalade", adresseBaladeSchema, "adresseBalade");
export default AdresseBalade;
