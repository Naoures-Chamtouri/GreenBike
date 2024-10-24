import Location from "../../models/location.js";
import httpStatus from "../../utils/httpStatus.js";
import VeloLocation from "../../models/veloLocation.js";
import AdresseLocal from "../../models/adresseLocal.js";
import Type from "../../models/type.js";
import CategorieVelo from "../../models/categorieVelo.js";
import Marque from "../../models/marque.js";
import Image from "../../models/image.js";
import Client from "../../models/client.js";

const getAllLocations=async(req,res)=>{
    try {
      const locations = await Location.find()
        .populate({
          path: "velo",
          populate: {
            path: "velo",
            populate: [
              {
                path: "type",
                model: Type
              },
              { path: "categorie", model: CategorieVelo },
              { path: "marque", model: Marque },
              { path: "images", model: Image },
            ],
          },
          model: VeloLocation,
        })
        .populate({
          path: "localLocation",
          model: AdresseLocal,
        })
        .populate({ path: "client", model: Client });

         if (locations.length > 0) {
           return res.status(200).json({
             status: httpStatus.SUCCESS,
             data: locations,
           });
         } else {
           return res.status(200).json({
             status: httpStatus.SUCCESS,
             message: "pas de locations",
           });
         }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: httpStatus.ERROR, message: error });
    }}


const updateLocation=async(req,res)=>{
    try{
        const locationId=req.params.id;
        const newStatus=req.body.etat;
        const location = await Location.findByIdAndUpdate(
          locationId,
          { etat: newStatus },
          { new: true }
        )
          .populate({
            path: "velo",
            populate: {
              path: "velo",
              populate: [
                {
                  path: "type",
                  model: Type,
                },
                { path: "categorie", model: CategorieVelo },
                { path: "marque", model: Marque },
                { path: "images", model: Image },
              ],
            },
            model: VeloLocation,
          })
          .populate({
            path: "localLocation",
            model: AdresseLocal,
          })
          .populate({ path: "client", model: Client });;
        if(location){
            return res.status(200).json({
                status:httpStatus.SUCCESS,
                message:"location mise a jour avec succes",
                data:location})
            }
            else{
                return res.status(404).json({
                    status:httpStatus.ERROR,
                    message:"error lors mise a jour "
                })}

    }catch(error){
        console.log(error);
        return res
          .status(500)
          .json({ status: httpStatus.ERROR, message: error });
    }
}

export default {getAllLocations,updateLocation}