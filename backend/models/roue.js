import mongoose from "mongoose";

const roueSchema = new mongoose.Schema({
    materiau:{type:String,default:''},
    taille:{type:Number,default:0},
    nbrRayon:{type:Number,default:0},
    largeurjante:{type:Number,default:0},
    poids:{type:Number,default:0}
    
});

const Roue=mongoose.model("roue",roueSchema,"roue");
export default Roue;