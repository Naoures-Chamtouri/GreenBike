import mongoose from "mongoose";


const selleSchema=new mongoose.Schema({
    materiau:{type:String,default:''}

});
const Selle=mongoose.model('selle',selleSchema,"selle");
export default Selle;