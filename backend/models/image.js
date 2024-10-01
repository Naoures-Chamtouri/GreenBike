import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name:String,
  path: {
    type: String,
    default: "",
  }
}); 

const Image=mongoose.model("image",imageSchema,"image");
export default Image;