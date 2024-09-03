import VeloVente from "../../models/veloVente.js";
import httpStatus from "../../utils/httpStatus.js";
import Balade from "../../models/balade.js";
import mongoose from "mongoose";

const obtenirBalade= async(req,res)=>{
    try{
       const id =req.params.id;
       const balade=await Balade.findById()
    }catch{

    }
}