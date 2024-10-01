import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  delegation:{type:mongoose.Schema.Types.ObjectId,ref:"Delegation"}
});

const District = mongoose.model("district", districtSchema, "district");
export default District;
