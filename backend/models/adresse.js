import mongoose from "mongoose";


const adresseSchema=new mongoose.Schema({
    ville:String,
    codePostal:String,
    Gouvernorat:String,
    rue:String
    

});

const Adresse=mongoose.model("adresse",adresseSchema,"adresse");
export default Adresse;