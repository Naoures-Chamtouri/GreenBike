import Frein from "../../models/frein.js";
const addFrein = async (req, res) => {
  try {
    const { type } = req.body;

  
    if (!type) {
      return res.status(400).json({
        status: "error",
        message: "Le type de frein est requis",
      });
    }

    
    const nouveauFrein = new Frein({
      type: type,
    });

   
    const freinEnregistre = await nouveauFrein.save();

    res.status(201).json({
      status: "success",
      data: freinEnregistre,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout du frein",
      error: error.message,
    });
  }
};

const getAllFreins=async(req,res)=>{
  try{
    const freins=await Frein.find();
    return res.json({status:"success",data:freins})

  }catch(e){
    return res.status(500).json({
      status:"error",
      message:"Erreur lors de la récupération des freins",
    })
  }
}
export default {addFrein,getAllFreins}