import Location from "../../models/location.js"
import httpStatus from "../../utils/httpStatus.js"
import VeloLocation from "../../models/veloLocation.js"
import AdresseLocal from "../../models/adresseLocal.js"
import Type from "../../models/type.js";
import CategorieVelo from "../../models/categorieVelo.js";
import Marque from "../../models/marque.js";
import Image from "../../models/image.js";


const createLocation=async(req,res)=>{
    try{
        const{nom,numTelephone,velo,dateDebut,dateFin,quantité,prixLocation,localLocation}=req.body
       const client=req.client._id; 
        const location=new Location({
            client,
            nom,
            numTelephone,
            velo,
            dateDebut,
            dateFin,
            quantité,
            prixLocation,
            localLocation,
            etat:"Réservé"
    })

    const savedLocation=await location.save();
    return res.status(200).json({status:httpStatus.SUCCESS,data:savedLocation})

}catch(error){
    console.log(error)
    return res.status(500).json({status:httpStatus.ERROR,message:error})
}
}

const getLocationbyUser=async(req,res)=>{
    try{
        const id=req.client._id

        const locations = await Location.find({ client: id })
          .populate({
            path: "velo",populate:{path:"velo",
            populate: [
              {
                path: "type",
                model: Type,
              },
              { path: "categorie", model: CategorieVelo },
              { path: "marque", model: Marque },
              { path: "images", model: Image },
            ]},
            model: VeloLocation
          })
           .populate({
            path: "localLocation",
            model: AdresseLocal,
          }); 

          if(locations.length==0){
            return res.status(200).json({
              status:httpStatus.SUCCESS,
              message:"pas de locations"
            })
          }
          return res.status(200).json({status:httpStatus.SUCCESS,data:locations})
    }catch(error){
      console.log(error)
         return res
           .status(500)
           .json({ status: httpStatus.ERROR, message: error });
    }
}

const checkAvailability = async (req, res) => {
  try {
    const { startDate, endDate, numBikes, veloId } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const locations = await Location.find({
      velo: veloId,
      $or: [
        {
          dateDebut: { $lte: end },
          dateFin: { $gte: start },
        },
        {
          dateDebut: { $gte: start, $lte: end },
        },
      ],
    });

    const totalRentedBikes = locations.reduce((total, location) => {
      return total + location.quantité;
    }, 0);

    const bike = await VeloLocation.findById(veloId);

    if (!bike) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "Vélo non trouvé.",
      });
    }

    const availableBikes = bike.stock;
    if (totalRentedBikes + numBikes > availableBikes) {
      return res.status(200).json({
        status: httpStatus.SUCCESS,
        message: "Quantité demandée non disponible pour ces dates.",
        data:{available:false}
      });
    }

    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Vélo disponible pour la location.",
      availableBikes: availableBikes - totalRentedBikes,
      data: { available: true },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};

export default {createLocation,getLocationbyUser,checkAvailability}