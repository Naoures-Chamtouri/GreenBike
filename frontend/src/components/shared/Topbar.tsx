import { Input } from "../ui/input";
import { FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import axios from "axios";
import {useAuth} from "@/context/AuthContext"; 
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { user } = useAuth(); 
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommandeClick=()=>{
    navigate('/mes-commandes');
  }
  const handleLocationClick = () => {
    navigate("/mes-locations");
  };
   const handleReservationClick = () => {
     navigate("/mes-reservations");
   };

   const handleLogout = async () => {
     try {
       const response = await axios.post(
         "http://localhost:4000/client/logout",
         {},
         { withCredentials: true }
       );
       console.log(response);
       localStorage.removeItem("veloVenteCart");
       window.location.href = "/";
     } catch (error) {
       console.error("Error during logout:", error);
     }
   };

  return (
    <div className="topbar">
      <div className="w-full flex items-center justify-between px-6 bg-white shadow-black shadow-sm">
        <img src="/assets/images/logo.png" alt="logo" className="h-24" />

        <div className="relative w-full max-w-md mx-auto">
          <Input
            type="text"
            className="w-full max-w-xl pr-10 py-2 border rounded"
            placeholder="Recherche..."
          />
          <img
            src="/assets/icons/search-svgrepo-com.svg"
            className="w-6 absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
            alt="search"
          />
        </div>

        <div className="flex space-x-3 mr-12">
          <div className="p-2 border-2 border-customGreen rounded-full">
            <FaInstagram className="w-6 h-6" />
          </div>
          <div className="p-2 border-2 border-customGreen rounded-full">
            <TbBrandFacebook className="w-6 h-6" />
          </div>
          <div className="p-2 border-2 border-customGreen rounded-full">
            <MdOutlineEmail className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 45, height: 45 }}>
                  {user ? user.initials : "nn"}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="menu-compte"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 2,
                  width: 300,
                  borderRadius: "12px",
                  "& .MuiAvatar-root": {
                    width: 60,
                    height: 60,
                    marginBottom: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {user ? (
              <>
                <MenuItem
                  sx={{ flexDirection: "column", alignItems: "center" }}
                >
                  <Avatar
                    sx={{ width: 56, height: 56, backgroundColor: "green" }}
                  >
                    {user.initials}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {user.utilisateur.nomUtilisateur}
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2" color="text.primary">
                    Mon Profil
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={handleCommandeClick}>
                  <Typography variant="body2" color="text.primary">
                    Mes Commandes
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLocationClick}>
                  <Typography variant="body2" color="text.primary">
                    Locations Vélos
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleReservationClick}>
                  <Typography variant="body2" color="text.primary">
                    Réservation Balades
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body2" color="text.primary">
                    Déconnexion
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => (window.location.href = "/sign-in")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <MdLogin
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "8px",
                    color: "green",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Se connecter
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>

      <div className="mx-auto w-full px-4 z-20 shadow-customGreen shadow-sm sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex space-x-28">
            <a href="/" className="text-black hover:text-gray-500">
              Accueil
            </a>
            <a href="/velo-a-louer" className="text-black hover:text-gray-500">
              Location des Vélos
            </a>
            <a href="/velo-a-vendre" className="text-black hover:text-gray-500">
              Vente des Vélos
            </a>
            <a href="/balades" className="text-black hover:text-gray-500">
              Balades
            </a>
            <a href="#" className="text-black hover:text-gray-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
