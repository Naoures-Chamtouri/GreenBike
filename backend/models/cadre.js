import mongoose from "mongoose";


const cadreSchema= new mongoose.Schema({
    materiau:{
        type:String,
        default:''
    },
    taille:{
        type:String,
        default:''
    }
})

const Cadre= mongoose.model("cadre",cadreSchema,"cadre");
export default Cadre;