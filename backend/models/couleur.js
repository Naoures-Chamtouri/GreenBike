import mongoose from "mongoose";

const couleurSchema= new mongoose.Schema({

    nom:{
        type:String
    }
})

const Couleur= mongoose.model("couleur",couleurSchema,"couleur");
export default Couleur;