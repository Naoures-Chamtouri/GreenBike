import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  numTelephone:{type:String},
  nom:String,
  
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

  prixLocation: {
    type: Number,
    default: 0,
  },
  velo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VeloLocation",
  },
  quantité: { type: Number },
  localLocation: { type: mongoose.Schema.Types.ObjectId, ref: "AdresseLocal" },
  etat: { type: String, enum: ["Réservé","En Cours","Terminé","Annulé","En retard"] },
});


const Location=mongoose.model("location",locationSchema,"location");

export default Location;