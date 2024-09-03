import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";


function Cart() {
     const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const open = Boolean(anchorEl);
      const id = open ? "cart-popover" : undefined;
  return (
    <div>
      <button
        onClick={handleClick}
        className="absolute right-6 rounded-full p-4 top-2 border-2 border-customGreen hover:bg-gray-100"
      >
        <AiOutlineShoppingCart className="w-7 h-7  " />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="p-4 min-w-[400px]  min-h-[400px]">
          <Typography variant="h6">Votre Panier</Typography>
          {/* Ajoutez ici le contenu du panier */}
          <Typography variant="body2">Le panier est vide.</Typography>
        </div>
      </Popover>
    </div>
  );
}

export default Cart
