import mongoose from "mongoose";

const categorieAgeSchema=new mongoose.Schema({
    nom:{type:String,required:true}
});
const CategorieAge=mongoose.model("categorieAge",categorieAgeSchema,"categorieAge");
export default CategorieAge;
