import mongoose from "mongoose";

const reservationSchema=new mongoose.Schema({
    participant:{type:mongoose.Schema.Types.ObjectId,ref:"Client"},
    balade:{type:mongoose.Schema.Types.ObjectId,ref:"Balade"
    }
});
const Reservation=mongoose.model("reservation",reservationSchema,"reservation");
export default Reservation;