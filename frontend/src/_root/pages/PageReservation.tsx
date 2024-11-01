import PaymentComponent from "@/components/payement/PaymentComponent";
import { useAuth } from "@/context/AuthContext";
import {
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function PageReservation() {
  const location = useLocation();
  const { balade } = location.state || {};
  const [nom, setNom] = useState("");
  const [numTelephone, setNumTelephone] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);

  const handleSubmit = async () => {
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(numTelephone)) {
      alert("Le numéro de téléphone doit contenir exactement 8 chiffres.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/client/reservations", {
        participant: user._id,
        numTelephone: user.utilisateur.numTelephone || numTelephone,
        balade: balade._id,
      });
      setShowPopover(true);
      setTimeout(() => {
        navigate("/balades");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la réservation", error);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mt={6} mx={4}>
        {/* Section gauche (lfaroe) */}
        <Box flex={1} mr={2}>
          <Typography
            variant="h5"
            className="mb-6 text-customgreen font-bold "
            sx={{ fontSize: "28px" }}
          >
            Réservation de Balade
          </Typography>

          {/* Informations sur la balade */}
          <Card variant="outlined" sx={{ mb: 4, borderRadius: 2, mt: 4 }}>
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h6" color="success" gutterBottom>
                Informations sur la Balade
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Départ :</strong>{" "}
                {balade?.adresseDepart?.nom || "Non spécifié"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Arrivée :</strong>{" "}
                {balade?.adresseArrivée?.nom || "Non spécifié"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Date de départ :</strong>{" "}
                {format(new Date(balade.dateDepart), "dd/MM/yyyy HH:mm") ||
                  "Non spécifié"}
              </Typography>
              <Typography variant="body1">
                <strong>Tarif :</strong>{" "}
                {balade?.tarif ? `${balade.tarif} TND` : "Non spécifié"}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nom"
                fullWidth
                value={user ? user.utilisateur?.nomUtilisateur : nom}
                onChange={(e) => setNom(e.target.value)}
                required
                disabled={!!user?.utilisateur.nomUtilisateur}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "green" },
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "green" },
                  },
                  mb: 3,
                }}
              />

              <TextField
                label="Numéro de téléphone"
                fullWidth
                value={user ? user.utilisateur?.numTelephone : numTelephone}
                onChange={(e) => setNumTelephone(e.target.value)}
                required
                disabled={!!user?.utilisateur?.numTelephone}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "green" },
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "green" },
                  },
                }}
              />
            </form>
          </Card>
        </Box>

        <Box flex={1} ml={2} mt={10}>
          <Card sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
            <PaymentComponent
              montant={balade?.tarif}
              onSuccess={handleSubmit}
              validate={true}
            />
          </Card>
        </Box>
      </Box>

      {showPopover && (
        <div className="fixed top-10 right-4 p-4 bg-green-500 text-white rounded shadow-lg">
          Réservation ajoutée avec succès !
        </div>
      )}
    </div>
  );
}

export default PageReservation;
