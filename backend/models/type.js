import mongoose from "mongoose";


const typeSchema=new mongoose.Schema({
    nom:{type:String,required:true},
    categorie:{type:mongoose.Schema.Types.ObjectId,ref:"CategorieVelo"}
})

const Type=mongoose.model("type",typeSchema,"type");
export default Type;