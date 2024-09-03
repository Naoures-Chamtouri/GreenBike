import Marque from "../../models/marque.js"
import httpStatus from "../../utils/httpStatus.js";
const getMarque=async(req,res)=>{
    try{
        const marques=await Marque.find();
        if(!marques){
            return res.status(409).json({
          status: httpStatus.FAIL,
          message: "Pas des marques.",
        });
        
        }else{
            return res.status(200).json({
                status:httpStatus.SUCCESS,
                data:marques
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status:httpStatus.ERROR,
            message:"erreur de serveur"
        })


    }
}

const getMarquebyType=async(req,res)=>{
    try{
        const type=req.params.type;
        if((type!="Vélo")&&(type!="Equipement")&&(type!="Vélo et Equipement")){
            res.status(400).json({
                status:httpStatus.BAD_REQUEST,
                message:"type non valide"
            })
        }
        const marques = await Marque.find({
          type: { $in: [type, "Vélo et Equipement"] },
        });
        if(marques.length>0){
            res.status(200).json({
                status:httpStatus.SUCCESS,
                data:marques
            })
        }else{
            res.status(400).json({
                status:httpStatus.FAIL,
                message:"aucune marque trouvée pour le type specifié "
            })
        }

    }catch(e){
        res.status(500).json({
            status:httpStatus.ERROR,
            message:"erreur de serveur",
            erreur:e
        })

    }
}

export default {getMarque,getMarquebyType }