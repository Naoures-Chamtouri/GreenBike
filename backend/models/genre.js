import mongoose from "mongoose";

const genreSchema= new mongoose.Schema({
    nom:{type:String}
});

const Genre= mongoose.model("genre",genreSchema,"genre");

export default Genre;