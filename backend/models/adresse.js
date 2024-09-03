import mongoose from "mongoose";


const adresseSchema=new mongoose.Schema({
    ville:String,
    codePostal:String,
    

});

const Adresse=mongoose.model("adresse",adresseSchema,"adresse");
export default Adresse;