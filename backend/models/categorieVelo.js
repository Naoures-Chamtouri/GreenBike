import mongoose from "mongoose";

const categorieVeloSchema=new mongoose.Schema({
    nom:{type:String,required:true}
});
const CategorieVelo=mongoose.model("categorieVelo",categorieVeloSchema,"categorieVelo");
export default CategorieVelo;