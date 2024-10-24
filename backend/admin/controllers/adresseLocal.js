import AdresseLocal from "../../models/adresseLocal.js"
import HttpStatus from "../../utils/httpStatus.js"

const getAllAdresses=async(req,res)=>{
try{
    const adresses =await AdresseLocal.find();

    return res.status(200).json({
        status:HttpStatus.SUCCESS,
        data:adresses
    })
}
catch(error){
    console.log(error);
    return res.status(500).json({ status: HttpStatus.ERROR, message: error });

}
}

export default {getAllAdresses}