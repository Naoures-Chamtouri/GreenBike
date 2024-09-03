import mongoose from "mongoose";

const categorieEquipSchema= new mongoose.Schema({
    nom:String
});

const CategorieEquipement = mongoose.model(
  "categorieEquipement",
  categorieEquipSchema,
  "categorieEquipement"
);
export default CategorieEquipement;