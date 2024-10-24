import mongoose from "mongoose";

const reservationSchema=new mongoose.Schema({
    participant:{type:mongoose.Schema.Types.ObjectId,ref:"Client"},
    numTelephone:{type:String,required:true},
    balade:{type:mongoose.Schema.Types.ObjectId,ref:"Balade"},
    dateReservation:{type:Date,required:true,default:Date.now()},
    status:{type:String,enum:["payée","annulée"],default:"payée"}
});
const Reservation=mongoose.model("reservation",reservationSchema,"reservation");
export default Reservation;