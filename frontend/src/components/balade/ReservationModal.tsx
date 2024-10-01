import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Popover,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const ReservationModal = ({ open, handleClose ,idBalade,setAnchorElPopOver,setSuccessMessage,handlePopoverClose}) => {
  const [nom, setNom] = useState("");
  const [numTelephone, setNumTelephone] = useState("");
  const { user } = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/client/reservations", {
        participant: user._id,
        numTelephone: user.utilisateur.numTelephone || numTelephone,
        balade:idBalade
      });

   
      setSuccessMessage("Réservation ajoutée !");
      setAnchorElPopOver(true); 
      setTimeout(handlePopoverClose, 2000); 

      handleClose();
    } catch (error) {
      console.error("Erreur lors de la réservation", error);

    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          className="bg-white rounded-lg p-10 mx-auto my-16 w-full max-w-lg shadow-lg border-2 border-green-500"
          sx={{
            "@media (max-width: 600px)": { padding: "16px" }, // Styles responsifs si nécessaire
          }}
        >
          <Typography
            variant="h5"
            className="mb-6 text-customgreen font-bold text-center"
            sx={{ fontSize: "28px" }}
          >
            Réservation de Balade
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              fullWidth
              value={user ? user.utilisateur.nomUtilisateur : nom}
              onChange={(e) => setNom(e.target.value)}
              className="mb-6 "
              required
              disabled={!!user.utilisateur.nomUtilisateur}
              InputLabelProps={{
                style: { color: "black" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "green" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "green" },
                },
                mt: 5,
              }}
            />

            <TextField
              label="Numéro de téléphone"
              fullWidth
              value={
                user.utilisateur.numTelephone
                  ? user.utilisateur.numTelephone
                  : numTelephone
              }
              onChange={(e) => setNumTelephone(e.target.value)}
              className="mb-6 "
              required
              disabled={!!user.utilisateur.numTelephone}
              InputLabelProps={{
                style: { color: "black" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "green" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "green" },
                },
                mt: 5,
              }}
            />

            <RadioGroup value="presentiel" className="mb-8 ">
              <FormControlLabel
                value="presentiel"
                control={
                  <Radio
                    sx={{
                      color: "#52B71D",
                      "&.Mui-checked": { color: "green" },
                    }}
                  />
                }
                label="Paiement en présentiel"
                className="text-gray-800"
              />
            </RadioGroup>

            <Typography
              variant="body1"
              className="mb-6 text-gray-600 "
              sx={{ lineHeight: "1.5", fontSize: "16px" }}
            >
              ⚠️ Vous pouvez annuler la réservation jusqu'à 3 jours avant la
              date de la balade.
            </Typography>

            <Button
              type="submit"
              variant="contained"
              className="w-full "
              sx={{
                backgroundColor: "green",
                "&:hover": { backgroundColor: "green" },
                padding: "12px 16px",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "18px",
                mt: 6,
              }}
            >
              Réserver
            </Button>
          </form>
        </Box>
      </Modal>

      
    
    </>
  );
};

export default ReservationModal;
