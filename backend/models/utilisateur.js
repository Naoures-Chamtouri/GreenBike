import mongoose from "mongoose";

const utilisateurSchema= new mongoose.Schema({
    nomUtilisateur:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    numTelephone:{type:Number},
    image:{type:String},
    adresse:{type:mongoose.Schema.Types.ObjectId,ref:"Adresse"},
    motDePasse:{type:String, required:true},

});

const Utilisateur=mongoose.model("utilisateur",utilisateurSchema,"utilisateur");
export default Utilisateur;
