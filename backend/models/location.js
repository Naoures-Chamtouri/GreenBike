import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
       return value > this.dateDebut;
        
      },
      message: "La date de fin doit être postérieure à la date de début",
    },
  },

  prixLocation:{
    type: Number,
    default:0
  }
  ,
  velo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'VeloLocation'
  }
});