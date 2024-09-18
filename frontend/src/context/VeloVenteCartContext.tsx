import { createContext, useContext, useState } from "react";

const VeloVenteCartContext = createContext({});


const VeloVenteProvider = ({ children }) => {
  const [VeloVenteCartItems, setVeloVenteCartItems] = useState([]);

  
  const getItemQuantity = (id) => {
    return VeloVenteCartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const itemNumber = () => {
   
    return VeloVenteCartItems.reduce((total, item) => total + item.quantity, 0);
  };

  
  const addProductToCart = (id, quantity) => {
    console.log({id,quantity})
    setVeloVenteCartItems((currentItems) => {
     
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity }];
      } else {
    
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
      }
    });
    console.log(VeloVenteCartItems)
  };

  const removeFromCart = (id) => {
    setVeloVenteCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const decreaseItemQuantity = (id) => {
    setVeloVenteCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          // If quantity is 1, remove item from the cart
          if (item.quantity === 1) {
            return removeFromCart(id);
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        } else {
          return item;
        }
      });
    });
  };

 
  const clearCart = () => {
    setVeloVenteCartItems([]);
  };

  return (
    <VeloVenteCartContext.Provider
      value={{
        VeloVenteCartItems,
        getItemQuantity,
        addProductToCart,
        removeFromCart,
        decreaseItemQuantity,
        clearCart,
        itemNumber
      }}
    >
      {children}
    </VeloVenteCartContext.Provider>
  );
};

export default VeloVenteProvider;

// Custom hook to use VeloVenteCart context
// eslint-disable-next-line react-refresh/only-export-components
export const useVeloVenteCart = () => {
  return useContext(VeloVenteCartContext);
};
