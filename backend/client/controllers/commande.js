import Commande from "../../models/commande.js";
import Panier from "../../models/panier.js";
import LignePanier from "../../models/lignePanier.js";
import Adresse from "../../models/adresse.js";
import VeloVente from "../../models/veloVente.js";
import Type from "../../models/type.js";
import CategorieVelo from "../../models/categorieVelo.js";
import Marque from "../../models/marque.js";
import Image from "../../models/image.js";

const passerCommande = async (req, res) => {
  try {
    const clientId = req.client._id;
    const {adresseLivraison,dateLivraison,numTelephone}=req.body
   
    const panier = await Panier.findOne({ client: clientId }).populate(
      {path:"articles",model:LignePanier}
    );

    
    const articlesCopiés = panier.articles.map((article) => ({
      article: article.article,
      quantité: article.quantité,
      total: article.total,
      onType:"VeloVente"
    }));
    const adresse = new Adresse({
        ville:adresseLivraison.ville,
        delegation:adresseLivraison.delegation,
        district:adresseLivraison.district,
        adresse:adresseLivraison.adresse
    })
  for (const article of panier.articles) {

      const veloVente = await VeloVente.findById(article.article);
    
      if (veloVente.stock < article.quantité) {
        return res.status(400).json({
          message: `Le stock est insuffisant pour le vélo ${veloVente._id}.`,
        });
      }
      
      veloVente.stock -= article.quantité;
      await veloVente.save();
   
    
  }
    const nouvelleCommande = new Commande({
      client: clientId,
      numTelephone:numTelephone,
      articles: articlesCopiés, 
      total: panier.total,
      adresseLivraison:adresse,
      dateLivraison:dateLivraison,
      statutCommande:"en cours"
    });

   
    await nouvelleCommande.save();

   
    const lignePanierIds = panier.articles.map((article) => article._id);
    await LignePanier.deleteMany({ _id: { $in: lignePanierIds } });

   
    await Panier.findOneAndUpdate(
      { client: clientId },
      { $set: { articles: [], total: 0 } }
    );


    return res
      .status(201)
      .json({
        message: "Commande passée avec succès.",
        commande: nouvelleCommande,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Erreur lors du passage de la commande." });
  }
};

const getCommandes=async(req,res)=>{
  try{
    const clientId=req.client._id;
    const commandes = await Commande.find({ client: clientId })
      .populate({ path: "articles",populate:{path:"article",populate:{
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
      },model:VeloVente}, model: LignePanier })
      .populate({
        path: "adresseLivraison",
        model: Adresse
      });
 return res.status(201).json({
   status: "success",
   data: commandes,
 });

  }catch(error){
    console.log(error);
    return res
      .status(500)
      .json({ message: "Erreur lors de venir des commandes." });

  }
}

export default {passerCommande,getCommandes};
