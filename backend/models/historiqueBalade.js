import mongoose from "mongoose";

const historiqueBaladeSchema=new mongoose.Schema({
    balade:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Balade"
    }
});
const HistoriqueBalade = mongoose.model(
  "historiqueBalade",
  historiqueBaladeSchema,
  "historiqueBalade"
);
export default HistoriqueBalade;