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
  TextField,
} from "@mui/material";
import { isWithinInterval, parseISO, differenceInDays } from "date-fns";
import NumberStepper from "@/components/ui/numberStepper";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

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
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const[adresse,setAdresse]=useState("")
  const [numBikes, setNumBikes] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservedPeriods, setReservedPeriods] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [duration,setDuration] = useState(0);
  const [availabilityError, setAvailabilityError] = useState("")

  const isDateDisabled = (date) => {
    return reservedPeriods.some((period) =>
      isWithinInterval(date, {
        start: parseISO(period.start),
        end: parseISO(period.end),
      })
    );
  };
  const validateDates = () => {
    const today = dayjs();
    if (!startDate || !endDate) {
      setErrors((prev) => ({
        ...prev,
        date: "Les dates de début et de fin sont requises.",
      }));
      return false;
    }
    if (startDate.isBefore(today, "day")) {
      setErrors((prev) => ({
        ...prev,
        startDate: "La date de début doit être dans le futur.",
      }));
      return false;
    }
    if (endDate.isBefore(startDate)) {
      setErrors((prev) => ({
        ...prev,
        endDate: "La date de fin doit être après la date de début.",
      }));
      return false;
    }
    setErrors({});
    return true;
  };

  const calculateTotalPrice = (start, end) => {
    if (start && end && velo.prixHeure) {
      const Duration = end.diff(start, "hour", true);
      setDuration(Duration)
      if (Duration > 0) {
        return Duration * velo.prixHeure * numBikes;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const price = calculateTotalPrice(startDate, endDate);
      setTotalPrice(price);
    }
  }, [startDate, endDate, numBikes, velo.prixHeure]);

  const validateForm = () => {
    try {
      rentalSchema.parse({
        pickupLocation,
        startDate: startDate ? startDate.toDate() : null,
        endDate: endDate ? endDate.toDate() : null,
        numBikes,
      });
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
        "http://localhost:4000/client/locations/check-availability",
        {
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
          numBikes,
          veloId: velo._id,
        }
      );
      const available = response.data.data.available;
    
      setLoading(false);
      return available;
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la disponibilité:",
        error
      );
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm() || !validateDates()) return;

    const isAvailable = await checkAvailability();

    if (isAvailable) {
     const reservationDetails = {
       velo,
       startDate: startDate ? startDate.toISOString() : null,
       endDate: endDate ? endDate.toISOString() : null,
       numBikes,
       totalPrice,
       pickupLocation,
       duration,
       adresse,
     };

     localStorage.setItem(
       "reservationDetails",
       JSON.stringify(reservationDetails)
     );

     // Rediriger vers la page de réservation
     navigate("/location");
    } else {
      setAvailabilityError("La quantité demandée n'est pas disponible pour ces dates.");
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
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setPickupLocation(selectedId);

                      // Chercher l'adresse complète après avoir récupéré l'ID
                      const selectedAddress = velo.adresseDisponible.find(
                        (adresse) => adresse._id === selectedId
                      );
                      if (selectedAddress) {
                        const fullAddress = `${selectedAddress.adresse}, ${selectedAddress.district}, ${selectedAddress.delegation}, ${selectedAddress.ville}`;
                        setAdresse(fullAddress);
                      }
                    }}
                    label="Local de récupération"
                    color="success"
                  >
                    {velo.adresseDisponible &&
                    velo.adresseDisponible.length > 0 ? (
                      velo.adresseDisponible.map((adresse) => {
                        const fullAddress = `${adresse.adresse}, ${adresse.district}, ${adresse.delegation}, ${adresse.ville}`;

                        return (
                          <MenuItem key={adresse._id} value={adresse._id}>
                            {fullAddress}
                          </MenuItem>
                        );
                      })
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
              <Grid item xs={20}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    sx={datePickerStyle}
                    label="Date Debut"
                    value={startDate}
                    onChange={(value) => setStartDate(dayjs(value))}
                  />
                </DemoContainer>
                {errors.startDate && (
                  <Typography color="error" variant="caption">
                    <br />
                    {errors.startDate}
                  </Typography>
                )}

                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    sx={datePickerStyle}
                    label="Date de fin"
                    value={endDate}
                    onChange={(value) => setEndDate(dayjs(value))}
                  />
                </DemoContainer>
                {errors.endDate && (
                  <Typography color="error" variant="caption">
                    <br />
                    {errors.endDate}
                  </Typography>
                )}
              </Grid>
            </Grid>
            {loading && (
              <div className="flex justify-center mt-2">
                <span className="loader"></span>
              </div>
            )}
            {availabilityError && (
              <Typography color="error" variant="caption" sx={{ mt: 2 }}>
                {availabilityError}
              </Typography>
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

const datePickerStyle = {
  "& .MuiInputBase-root": {
    borderColor: "#16A34A",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#16A34A",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#16A34A",
  },
};

export default RentalModal;
