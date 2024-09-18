import Guide from "../../models/guide.js"
import httpStatus from "../../utils/httpStatus.js"
import sendMail from "../../utils/sendMail.js";


const getAllGuides =async(req,res)=>{
    try{

        const guides=await Guide.find({etat:"accepté"});

        if(guides.length>0){
            return res.status(200).json({
                status:httpStatus.SUCCESS,
                data:guides
            })
        }else{
            return res.status(404).json({status:httpStatus.NOT_FOUND,message:"pas de guide"})
        }

    }catch(error){
        console.log(error);
        return res
          .status(500)
          .json({
            status: httpStatus.ERROR,
            message: "Erreur interne du serveur",
          });
    }
}

const getGuidebyId=async(req,res)=>{
    try{
        const id=req.params.id;
        const guide=await Guide.findById(id);
        if(guide){
            return res.status(200).json({
                status:httpStatus.SUCCESS,
                data:guide
                })
                }else{
                    return res.status(404).json({status:httpStatus.NOT_FOUND,message:"pas de guide"})
                    
                    }
    }catch(error){
        console.log(error);
         return res.status(500).json({
           status: httpStatus.ERROR,
           message: "Erreur interne du serveur",
         });

    }}

const getAllGuideRequest=async(req,res)=>{
    try{
        const guideRequest=await Guide.find({etat:"refusé"});
        if(guideRequest.length>0){
            return res.status(200).json({
                status:httpStatus.SUCCESS,
                data:guideRequest
                })
                }else{
                    return res.status(404).json({status:httpStatus.NOT_FOUND,message:"pas de guide"})
                    }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            status:httpStatus.ERROR,
            message: "Erreur interne du serveur",   
            });
    }
}

const acceptGuide=async(req,res)=>{
    try{
      const id = req.params.id;
      const urlRegistre = " http://localhost:5173/guide/register";
      const guide = await Guide.findById(id);
      if (guide) {
        guide.etat = "accepté";
        sendMail(
          guide.utilisateur.email,
          "Votre demande de guide a été acceptée",
          `Félicitations ! Votre demande de devenir guide a été acceptée. Veuillez terminer votre inscription en cliquant sur le lien suivant : ${urlRegistre}`
        );
        await guide.save();
        return res.status(200).json({
          status: httpStatus.SUCCESS,
          message: "guide accepté avec succès",
        });
      } else {
        return res
          .status(404)
          .json({ status: httpStatus.NOT_FOUND, message: "pas de guide" });
      }
    }catch(error){
       console.log(error);
       return res
         .status(500)
         .json({
           status: httpStatus.ERROR,
           message: "Erreur interne du serveur",
         });
    }
}

const rejectGuide=async(req,res)=>{
    try{
        const id=req.params.id;
        const guide = await Guide.findByIdAndDelete(id); // Supprime le guide de la base de données

    if (guide) {
      return res.status(200).json({
        status: httpStatus.SUCCESS,
        message: "Guide supprimé avec succès",
      });
    } else {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Guide non trouvé",
      });}
        
    }catch(error){
 console.log(error);
 return res.status(500).json({
   status: httpStatus.ERROR,
   message: "Erreur interne du serveur",
 });
    }
}

export default{
    getAllGuides,getGuidebyId,getAllGuideRequest,acceptGuide,rejectGuide
}