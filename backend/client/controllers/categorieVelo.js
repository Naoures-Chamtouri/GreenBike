import httpStatus from "../../utils/httpStatus.js"
import CategorieVelo from "../../models/categorieVelo.js"
const getAllCategories=async(req,res)=>{

    try{
        const categories=await CategorieVelo.find();
        if(!categories){
            return res.status(409).json({
          status: httpStatus.FAIL,
          message: "Pas des categories.",
        });
        
        }else{
            return res.status(200).json({
                status:httpStatus.SUCCESS,
                data:categories
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

export default {getAllCategories};