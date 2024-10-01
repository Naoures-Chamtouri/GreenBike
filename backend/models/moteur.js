import mongoose from "mongoose";


const moteurSchema= new mongoose.Schema({
    type:String,
    puissance:Number,
   
});

const Moteur= mongoose.model('moteur',moteurSchema,'moteur');
export default Moteur;