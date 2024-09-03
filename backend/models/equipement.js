import mongoose from "mongoose";

const equipementSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:''
    },
    prix:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    categorie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CategorieEquipement",
        required:true     
    },
    marque:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Marque"
    },
    images:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Image"
    }],
    couleurs:[
        {type:mongoose.Schema.Types.ObjectId,
         ref:"Couleur"
        }
    ],
    dateAjout:{
        type:Date,
        default:Date.now
        
    }

    
});

const Equipement =mongoose.model("equipement",equipementSchema,"equipement");

export default Equipement;