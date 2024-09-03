import mongoose from "mongoose"

const freinSchema= new mongoose.Schema({
    type:{type:String}
})

const Frein=mongoose.model("frein",freinSchema,"frein");
export default Frein;