import mongoose from "mongoose";


const moteurSchema= new mongoose.Schema({
    type:String,
    puissance:Number,
    typeBatterie:String,
    autonomie:Number
});

const Moteur= mongoose.model('moteur',moteurSchema,'moteur');
export default Moteur;