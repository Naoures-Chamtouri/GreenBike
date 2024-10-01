import mongoose from "mongoose";
import Velo from "./velo.js";

const veloLocationSchema= new mongoose.Schema({

    velo:{type:Velo.schema,
        required:true    },
    prixJour:{
        type:Number,
        required:true

    },
    disponibilité:{
        type:Boolean,
        default:true
    },
    avis:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Avis"
    }],
    stock:{type:Number,required:true},

    adresseDisponible:[{type:mongoose.Schema.Types.ObjectId,
        ref:"AdresseLocal"
    }]
});
const VeloLocation = mongoose.model(
  "veloLocation",
  veloLocationSchema,
  "veloLocation"
);
export default VeloLocation;