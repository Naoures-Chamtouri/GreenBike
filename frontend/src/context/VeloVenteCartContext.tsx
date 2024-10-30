import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";


const VeloVenteCartContext = createContext({});

const VeloVenteProvider = ({ children }) => {
   const { user } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const [VeloVenteCartItems, setVeloVenteCartItems] = useState([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("veloVenteCart")) || [];
    setVeloVenteCartItems(localCart);
  }, []);

  const syncCartWithBackend = async () => {
    try {
      const backendCart = await axios.get(
        "http://localhost:4000/client/panier",
        {
          withCredentials: true,
        }
      );

       const backendItems =backendCart.data.articles?backendCart.data.articles.map((item) => ({
             ...item,
            
           })):[]
       

      const mergedCart = mergeCarts(
        VeloVenteCartItems,
        backendItems
      );
      setVeloVenteCartItems(mergedCart);
      console.log("merg",mergedCart)
      localStorage.setItem("veloVenteCart", JSON.stringify(mergedCart));

      const response= await axios.post(
        "http://localhost:4000/client/panier/sync",

        { cartItems: mergedCart },
        {
          withCredentials: true,
        }
      );
      console.log(response)
    } catch (error) {
      console.error("Erreur lors de la synchronisation du panier:", error);
    }
  };

  const addProductToCart = (id, quantity, prix, stock) => {
    setVeloVenteCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id);
      const total = prix * quantity;

      if (!existingItem) {
        setAlertOpen(true);
        const newItem = { id, quantité: quantity, prix, total };
        const updatedItems = [...currentItems, newItem];
        localStorage.setItem("veloVenteCart", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = currentItems.map((item) => {
          if (item.id === id && item.quantité + quantity <= stock) {
            setAlertOpen(true);
            return {
              ...item,
              quantité: item.quantité + quantity,
              total: item.total + total,
            };
          }
          return item;
        });
        localStorage.setItem("veloVenteCart", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  const removeFromCart = (id) => {
    setVeloVenteCartItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== id);
      localStorage.setItem("veloVenteCart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const decreaseItemQuantity = (id) => {
    setVeloVenteCartItems((currentItems) => {
      const updatedItems = currentItems.map((item) => {
        if (item.id === id) {
          if (item.quantité === 1) {
            removeFromCart(id);
          } else {
            return {
              ...item,
              quantité: item.quantité - 1,
              total: item.total - item.prix,
            };
          }
        }
        return item;
      });
      localStorage.setItem("veloVenteCart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setVeloVenteCartItems([]);
    localStorage.removeItem("veloVenteCart");
  };

  const getTotalPrice = () => {
    return VeloVenteCartItems.reduce((total, item) => total + item.total, 0);
  };

  const mergeCarts = (localCart, backendCart) => {
    const mergedCart = [...backendCart];
    localCart.forEach((localItem) => {
      const existingItem = mergedCart.find(
        (item) => item.article === localItem.id
      );
      if (existingItem) {
        existingItem.quantité += localItem.quantité;
        existingItem.total += localItem.total; 
      } else {
        mergedCart.push({
          id: localItem.id,
          quantité: localItem.quantité,
          prix: localItem.prix,
          total: localItem.total,
        });
      }
    });
    return mergedCart;
  };
 const itemNumber = () => {
   return VeloVenteCartItems.reduce((total, item) => total + item.quantité, 0);
 };
  const getItemQuantity = (id) => {
    return VeloVenteCartItems.find((item) => item.id === id)?.quantité || 0;
  };
  return (
    <VeloVenteCartContext.Provider
      value={{
        VeloVenteCartItems,
        addProductToCart,
        removeFromCart,
        decreaseItemQuantity,
        clearCart,
        syncCartWithBackend,
        getTotalPrice,
        itemNumber,
        getItemQuantity
      }}
    >
      {children}
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Produit ajouté au panier avec succès !
        </Alert>
      </Snackbar>
    </VeloVenteCartContext.Provider>
  );
};

export default VeloVenteProvider;


// eslint-disable-next-line react-refresh/only-export-components
export const useVeloVenteCart = () => {
  return useContext(VeloVenteCartContext);
};
