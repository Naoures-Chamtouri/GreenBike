import Adresse from "../../models/adresse.js";
import httpStatus from "../../utils/httpStatus.js";
import Ville from "../../models/ville.js";
import Delegation from "../../models/delegation.js";
import District from "../../models/district.js"

const getAllVilles=async(req,res)=>{
    try{
      
        const villes=await Ville.find();
        return res.status(200).json({status:httpStatus.SUCCESS,data:villes})

    }catch(error){
    console.log(error)
        return res.status(500).json({status:httpStatus.ERROR,message:error.message});

    }
}

const getDelegationbyVille=async(req,res)=>{
    try{
        const id=req.params.villeId;
        const delegations= await Delegation.find({ville:id});
       
        return res.status(200).json({status:httpStatus.SUCCESS,data:delegations})
    }catch(error){
         return res
           .status(500)
           .json({ status: httpStatus.ERROR, message: error.message });
    }
}
const getDistrictbyDelegation=async(req,res)=>{
    try{
        const id=req.params.delegationId;
        const districts= await District.find({delegation:id});
        return res.status(200).json({status:httpStatus.SUCCESS,data:districts})
    }catch(error){
         return res
           .status(500)
           .json({ status: httpStatus.ERROR, message: error.message });
    }
}

export default {getAllVilles,getDelegationbyVille,getDistrictbyDelegation}