import Panier from "../../models/panier.js"
import LignePanier from "../../models/lignePanier.js";
import VeloVente from "../../models/veloVente.js";
import httpStatus from "../../utils/httpStatus.js"
import Marque from "../../models/marque.js";
import Type from "../../models/type.js";
import Image from "../../models/image.js";
import CategorieVelo from "../../models/categorieVelo.js";



const getPanier =async (req, res) => {
  const clientId = req.client._id; 

  try {
    const panier = await Panier.findOne({ client: clientId })
      .populate({
        path: "articles",
        populate: {
          path: "article",
          populate: {
            path: "velo",
            populate: [
              { path: "type", model: Type },
              { path: "categorie", model: CategorieVelo },
              { path: "marque", model: Marque },
              { path: "images", model: Image },
            ],
          },
          model: VeloVente,
        },
        model: LignePanier,
      })
      .exec();
   
    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    return res.json({status:httpStatus.SUCCESS,data:panier});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Erreur lors de la récupération du panier", error });
  }
}

const syncPanier=async (req, res) => {
  const clientId = req.client._id; 
  const { cartItems } = req.body; 

  try {
  
    const panier = await Panier.findOne({ client: clientId });

    if (!panier) {
      panier = new Panier({ articles: [], total: 0, client: clientId });
    }

    
    panier.articles = [];
    panier.total = 0;

    for (const item of cartItems) {
      const lignePanier = new LignePanier({

        article: item.id,
        quantité: item.quantité,
        total: item.total,
        onType:"VeloVente",
      });

      await lignePanier.save();
      panier.articles.push(lignePanier._id);
      panier.total += item.total; 
    }

    await panier.save();
    return res.json(panier);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Erreur lors de la synchronisation du panier", error });
  }
};



export default {getPanier,syncPanier}