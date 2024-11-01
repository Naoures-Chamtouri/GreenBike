import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Loader from "../shared/loader";


function ResumePanier({setTotal}) {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPanier = async () => {
    try{
    
       const response = await axios("http://localhost:4000/client/panier", {
      withCredentials: true,
    });
    setPanier(response.data.data);
    setLoading(false);
   
   
    
    }catch(e){
      console.log(e)
    }
   
  };

  useEffect(() => {
   
    fetchPanier();
    setTotal(panier.articles?.reduce((sum, item) => sum + item.total, 0));
   
    
     

  }, []);

 return (
  <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-md">
    <h2 className="text-2xl font-bold mb-6 border-b pb-4">
      Résumé de la Commande
    </h2>

    {loading ? (
      <Loader />
    ) :  (
      <div>
        {panier.articles.map((item) => (
          <div
            key={item._id}
            className="flex items-center space-x-4 border-b pb-4 mb-4"
          >
            <img
              src={
                item.article.velo.images[0]?.path ||
                "https://via.placeholder.com/100"
              }
              alt={item.article.velo.modele}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {item.article.velo.marque.nom} - {item.article.velo.modele}{" "}
                (Ref: {item.article.velo.ref})
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Catégorie:</strong>{" "}
                {item.article.velo.categorie.nom}
              </p>
              <p className="text-sm">
                <strong>Prix Unitaire:</strong> {item.article.prix} TND
              </p>
              <p className="text-sm">
                <strong>Quantité:</strong> {item.quantité}
              </p>
              <p className="text-sm font-medium text-green-600">
                <strong>Total:</strong> {item.total} TND
              </p>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold">
            Sous-total:{" "}
            {panier.articles.reduce((sum, item) => sum + item.total, 0)} TND
          </h3>
          <p className="text-sm text-gray-600">
            Total des articles dans votre commande.
          </p>
        </div>
      </div>
    ) }
  </div>
);
}

export default ResumePanier;
