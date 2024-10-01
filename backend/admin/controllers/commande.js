import Commande from "../../models/commande.js";
import LignePanier from "../../models/lignePanier.js";
import Adresse from "../../models/adresse.js";
import httpStatus from "../../utils/httpStatus.js";
import VeloVente from "../../models/veloVente.js";
import Type from "../../models/type.js";
import CategorieVelo from "../../models/categorieVelo.js";
import Marque from "../../models/marque.js";
import Image from "../../models/image.js";


const getAllCommandes=async(req,res)=>{
    try{
        const commandes = await Commande.find();
        if (commandes.length>0){
            return res.status(200).json({status:httpStatus.SUCCESS,data:commandes});
        
        }
        return res.status(404).json({status:httpStatus.NOT_FOUND,data:"Aucune commande"});
    }catch(e){
        console.log(e);
        return res.status(500).json({status:httpStatus.BAD_REQUEST,message:e});
    }
}

const getCommande=async(req,res)=>{
    try{
        const commandeId=req.params.commandeId;
        const commandes = await Commande.findById({ commandeId })
          .populate({
            path: "articles",
            populate: {
              path: "article",
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
              model: VeloVente,
            },
            model: LignePanier,
          })
          .populate({
            path: "adresseLivraison",
            model: Adresse,
          });
        if (commandes){
            return res.status(200).json({status:httpStatus.SUCCESS,data:commandes});
        }
       return res
         .status(404)
         .json({ status: httpStatus.NOT_FOUND, data: "Aucune commande" });

    }catch(e){
        console.log(e);
        return res
          .status(500)
          .json({ status: httpStatus.BAD_REQUEST, message: e });
    }
}
const updateCommande = async (req, res) => {
  try {
    const { commandeId } = req.params;
    const { statutCommande, dateLivraison } = req.body;

   
    const commande = await Commande.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

  
    if (dateLivraison) {
      commande.dateLivraison = dateLivraison;
    }

    
    if (statutCommande) {
      commande.statutCommande = statutCommande;
    }

    
    await commande.save();

     return res
       .status(200)
       .json({ status: httpStatus.SUCCESS, data: commande });
  } catch (error) {
  console.log(error);
        return res
          .status(500)
          .json({ status: httpStatus.BAD_REQUEST, message: error });
    }
  }


const  getCommandeByClient=async(req,res)=>{
    try{
        const {clientId}=req.params;
        const commande=await Commande.find({client:clientId})
        if (commande) {
            return res
              .status(200)
              .json({ status: httpStatus.SUCCESS, data: commande })
              .populate({
                path: "articles",
                populate: {
                  path: "article",
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
                  model: VeloVente,
                },
                model: LignePanier,
              })
              .populate({
                path: "adresseLivraison",
                model: Adresse,
              });
            }
            return res.status(404).json({ status: httpStatus.NOT_FOUND,message:"pas de commande "})
}catch(e){
        console.log(e);
        return res
          .status(500)
          .json({ status: httpStatus.BAD_REQUEST, message: e });
    }
}

export default {getAllCommandes,getCommande,getCommandeByClient,updateCommande}


