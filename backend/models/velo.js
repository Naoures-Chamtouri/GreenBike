import mongoose from "mongoose";
import shortid from "shortid";
const veloSchema = new mongoose.Schema({
  ref:{
    type:String,
    unique:true,
    required:true,
    default:shortid.generate
  },
  taille:String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    default:''
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
  },

  modele: { type: String, required: true, default: "" },
  poids: {
    type: Number,
    required: true,
    default: 0,
  },
  nbrVitesse: {
    type: Number,
    default: 0,
  },
  suspension: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
    required: true,
  },

  marque: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marque",
  },
  couleur: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Couleur",
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  genre: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  roue: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roue",
    },
  
  cadre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cadre",
  },
  selle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Selle",
  },
  frein: { type: mongoose.Schema.Types.ObjectId, ref: "Frein" },
  categorieAge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategorieAge",
  },
  moteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Moteur",
  },
  pliable: {type:Boolean,default:false},
  dateAjout: {
    type: Date,
    default: Date.now,
  },
});

const Velo=mongoose.model("velo",veloSchema,"velo");
export default Velo;