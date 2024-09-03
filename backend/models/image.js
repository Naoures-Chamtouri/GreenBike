import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  path: {
    type: String,
    default: "",
  }
}); 

const Image=mongoose.model("image",imageSchema,"image");
export default Image;