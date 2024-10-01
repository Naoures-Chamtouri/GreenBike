import AdresseLocal from "../../models/adresseLocal.js"


 const getAdresse=async(req,res)=>{
  try{
    const adresses=await AdresseLocal.find()
    return res.status(200).json({status:"success",data:adresses})
    
  }catch(e){
    console.log(error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la synchronisation du panier", error });
  }
 }
export default {getAdresse};