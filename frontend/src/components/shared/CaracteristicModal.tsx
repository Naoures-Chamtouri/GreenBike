import { Box, Modal, Typography } from "@mui/material";
import {
  FaWeightHanging,
  FaBicycle,
  FaCogs,
  FaPalette,
  FaTransgender,
  FaCircle,
  FaMotorcycle,
  FaRulerCombined,
  FaWheelchair,
  FaToolbox,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function CaracteristicModal({ openModal, handleCloseModal, velo }) {
  const {
    poids,
    nbrVitesse,
    suspension,
    couleur,
    genre,
    roue,
    cadre,
    selle,
    frein,
    categorieAge,
    moteur,
    pliable,
  } = velo.velo;

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="caracteristiques-title"
      aria-describedby="caracteristiques-description"
    >
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
          border: "1px solid #ddd",
        }}
      >
        <Typography
          id="caracteristiques-title"
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
            color: "#52B71D",
          }}
        >
          Caractéristiques du Vélo
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaWeightHanging color="#52B71D" />
            <Typography>Poids: {poids} kg</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaCogs color="#52B71D" />
            <Typography>Vitesse: {nbrVitesse}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaBicycle color="#52B71D" />
            <Typography>Suspension: {suspension}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaPalette color="#52B71D" />
            <Typography>
              Couleurs: {couleur.map((c) => c.nom).join(", ")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaTransgender color="#52B71D" />
            <Typography>Genre: {genre.nom}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaWheelchair color="#52B71D" />
            <Typography>
              Roue: {roue.materiau} ({roue.taille} pouces)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaRulerCombined color="#52B71D" />
            <Typography>
              Cadre: {cadre.materiau} (taille: {cadre.taille})
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaToolbox color="#52B71D" />
            <Typography>Selle: {selle.materiau}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaCircle color="#52B71D" />
            <Typography>Frein: {frein.type}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaBicycle color="#52B71D" />
            <Typography>Catégorie d'âge: {categorieAge.nom}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaMotorcycle color="#52B71D" />
            <Typography>
              Moteur: {moteur?.type || "Non applicable"} (Puissance:{" "}
              {moteur?.puissance || "N/A"} kW)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {pliable ? <FaCheck color="green" /> : <FaTimes color="red" />}
            <Typography>Pliable: {pliable ? "Oui" : "Non"}</Typography>
          </Box>
        </Box>

        <button
          onClick={handleCloseModal}
          className="mt-4 w-full px-4 py-2 text-white bg-customgreen rounded shadow bg-green-600 transition-all duration-200"
        >
          Fermer
        </button>
      </Box>
    </Modal>
  );
}

export default CaracteristicModal;
