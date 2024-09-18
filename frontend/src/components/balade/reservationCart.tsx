import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { FaRoute } from "react-icons/fa";
import { TbShoppingCartOff } from "react-icons/tb";

function ReservationCart() {
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
        <FaRoute className="w-7 h-7  " />
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
        <div className=" relative p-4 min-w-[400px]  min-h-[400px]">
          <Typography variant="h6">Vos Réservation</Typography>
          <div className="absolute  left-20 top-36">
            <h2 className="text-2xl text-gray-500">Pas de balades réservées.</h2>
            <TbShoppingCartOff className="w-14 h-12 ml-28 text-gray-500" />
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default ReservationCart;
