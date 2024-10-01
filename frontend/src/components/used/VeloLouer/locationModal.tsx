import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { isWithinInterval, parseISO, differenceInDays } from "date-fns";
import NumberStepper from "@/components/ui/numberStepper";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { green } from "@mui/material/colors";

const rentalSchema = z.object({
  pickupLocation: z.string().nonempty("Le lieu de récupération est requis."),
  startDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "La date de début est requise.",
    }),
  endDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "La date de fin est requise.",
    }),
  numBikes: z.number().min(1, "Au moins un vélo est requis."),
});

function RentalModal({ open, onClose, velo }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [numBikes, setNumBikes] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservedPeriods, setReservedPeriods] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [startTime, setStartTime] = useState(null); // État pour l'heure de début
  const [endTime, setEndTime] = useState(null); // État pour l'heure de fin

  const isDateDisabled = (date) => {
    return reservedPeriods.some((period) =>
      isWithinInterval(date, {
        start: parseISO(period.start),
        end: parseISO(period.end),
      })
    );
  };

  const calculateTotalPrice = (start, end) => {
    if (start && end && velo.prixJour) {
      const days = differenceInDays(end, start) + 1;
      if (days > 0) {
        return days * velo.prixJour * numBikes;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const price = calculateTotalPrice(startDate, endDate);
      setTotalPrice(price);
    }
  }, [startDate, endDate, numBikes, velo.prixJour]);

  const validateForm = () => {
    try {
      rentalSchema.parse({ pickupLocation, startDate, endDate, numBikes });
      setErrors({});
      return true;
    } catch (err) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const checkAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/check-availability",
        {
          startDate,
          endDate,
          numBikes,
          veloId: velo._id,
        }
      );
      setAvailability(response.data.available);
      setLoading(false);
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la disponibilité:",
        error
      );
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    await checkAvailability();

    if (availability) {
      navigate("/location", {
        state: {
          velo,
          startDate,
          endDate,
          numBikes,
          totalPrice,
          pickupLocation,
        },
      });
    } else {
      alert("La quantité demandée n'est pas disponible pour ces dates.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
          >
            Location de Vélo
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="pickup-location-label">
                    Local de récupération
                  </InputLabel>
                  <Select
                    labelId="pickup-location-label"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    label="Local de récupération"
                    color="success"
                  >
                    {velo.adresseDisponible &&
                    velo.adresseDisponible.length > 0 ? (
                      velo.adresseDisponible.map((adresse) => (
                        <MenuItem key={adresse._id} value={adresse._id}>
                          {adresse.adresse}, {adresse.district},{" "}
                          {adresse.delegation}, {adresse.ville}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Aucune adresse disponible</MenuItem>
                    )}
                  </Select>
                  {errors.pickupLocation && (
                    <Typography color="error" variant="caption">
                      {errors.pickupLocation}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Nombre de Vélos
                </Typography>
                <NumberStepper stock={velo.stock} setvalue={setNumBikes} />
                {errors.numBikes && (
                  <Typography color="error" variant="caption">
                    {errors.numBikes}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date Debut"
                    value={startDate}
                    onChange={(value) => {
                      setStartDate(value);
                    }}
                  />
                </DemoContainer>
                {errors.startDate && (
                  <Typography color="error" variant="caption">
                    <br />
                    {errors.startDate}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Heure de début"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                  />
                </DemoContainer>
              </Grid>

              <Grid item xs={6}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Basic date picker"
                    value={endDate}
                    onChange={(value) => {
                      setEndDate(value);
                    }}
                  />
                </DemoContainer>
                {errors.endDate && (
                  <Typography color="error" variant="caption">
                    <br />
                    {errors.endDate}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Heure de fin"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                  />
                </DemoContainer>
              </Grid>
            </Grid>

            {loading && (
              <div className="flex justify-center mt-2">
                <span className="loader"></span>
              </div>
            )}

            <Typography variant="h6" sx={{ mt: 2 }}>
              Prix Total: {totalPrice} TND
            </Typography>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Vérification..." : "Confirmer la Réservation"}
            </Button>
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}

export default RentalModal;
