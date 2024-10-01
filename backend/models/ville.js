import mongoose from "mongoose";

const villeSchema= new mongoose.Schema({

    nom:{
        type:String
    }
})

const Ville= mongoose.model("ville",villeSchema,"ville");
export default Ville;