import mongoose from "mongoose";

const delegationSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  ville:{type:mongoose.Schema.Types.ObjectId,ref:"Ville"}
});

const Delegation = mongoose.model("delegation", delegationSchema, "delegation");
export default Delegation;
