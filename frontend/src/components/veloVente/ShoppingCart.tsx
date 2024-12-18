import { useEffect, useState } from "react";
import { Drawer, Typography, Badge, Button } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbShoppingCartOff } from "react-icons/tb";

import ShoppingCartItem from "./ShoppingCartItem"; // Assurez-vous que le chemin est correct
import { useNavigate } from "react-router-dom";
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";

function ShoppingCart() {

  const navigate=useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { VeloVenteCartItems, itemNumber ,getTotalPrice,syncCartWithBackend} = useVeloVenteCart(); // Utilisation des articles du contexte
  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const handleCheckout = async() => {
 await syncCartWithBackend(); 
    navigate("/commande")
  };
  const itemNumb = itemNumber(); 
  const totalPrice = getTotalPrice();
  

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="absolute right-6 rounded-full p-4 top-2 border-2 border-customGreen hover:bg-gray-100"
      >
        <Badge
          badgeContent={itemNumb}
          color="success"
          classes={{ badge: "bg-customGreen" }}
        >
          <AiOutlineShoppingCart className="w-7 h-7" />
        </Badge>
      </button>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className="p-4 min-w-[400px] min-h-[400px] flex flex-col justify-between">
          <div>
            <Typography variant="h6">Votre Panier</Typography>
            {VeloVenteCartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl text-gray-500">Le panier est vide.</h2>
                <TbShoppingCartOff className="w-14 h-12 text-gray-500" />
              </div>
            ) : (
              <div>
                {VeloVenteCartItems.map((item) => (
                  <ShoppingCartItem
                    key={item.id}
                    id={item.id}
                    initialQuantity={item.quantity}
                  />
                ))}
              </div>
            )}
          </div>

          {VeloVenteCartItems.length > 0 && (
            <>
              <div className="mt-4 flex justify-end">
                <Typography variant="h6">
                  Total: {totalPrice.toFixed(2)} TND
                </Typography>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCheckout}
                  className="bg-customGreen"
                >
                  Commander
                </Button>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default ShoppingCart;
