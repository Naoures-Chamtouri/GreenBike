import AdresseLocal from "../../models/adresseLocal.js"


 const getAdresse=async(req,res)=>{
  try{
    const adresses=await AdresseLocal.find()
    return res.status(200).json({status:"success",data:adresses})
    
  }catch(e){
    console.log(e);
    return res
      .status(500)
      .json({ message: "Erreur lors de la synchronisation du panier", e });
  }
 }
export default {getAdresse};