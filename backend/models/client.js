import mongoose from "mongoose";
import Utilisateur from "./utilisateur.js";

const clientSchema=new mongoose.Schema({
    utilisateur:{type:Utilisateur.schema,required:true}
});

const Client=mongoose.model("client",clientSchema,"client");
export default Client;