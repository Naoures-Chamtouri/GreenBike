import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import {format} from "date-fns"
import { FaMapMarkerAlt } from "react-icons/fa";

function CardBalade({ balade }) {

  const date = format(new Date(balade.dateDepart), "dd/MM/yyyy HH:mm");
    const navigate = useNavigate();

    const handleBaladeClick = (ref, balade) => {
      console.log(ref)
      navigate(`/balades/${ref}`, { state: { balade } });
    };
  return (
    <Card sx={{ maxWidth: 300, height: 460 }}>
      <CardActionArea
        onClick={() => {
          handleBaladeClick(balade.ref, balade);
        }}
      >
        <CardMedia
          component="img"
        
          image={balade.images[0].path}
          alt={balade.nom}
          sx={{
            height: "200px",
            objectFit: "cover", // Ajuste l'image pour couvrir le conteneur
            width: "100%", // Assure que l'image prend toute la largeur
            borderTopLeftRadius: "4px", // Pour des coins arrondis (optionnel)
            borderTopRightRadius: "4px", // Pour des coins arrondis (optionnel)
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {balade.nom}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", height: "10vh" }}
          >
            {balade.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              mb: 1,
            }}
          >
            <div className="flex">
              <FaMapMarkerAlt className=" h-5 w-5 text-gray-500 mr-1" />
              <Typography variant="body2">
                {balade.adresseDepart.nom}
              </Typography>
              
            </div>
            <div className="flex mt-3 ">
              <MdOutlineDateRange className=" h-5 w-5 text-gray-500 mr-1 " />
              <Typography variant="body2">{date}</Typography>
            </div>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                DISTANCE
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {balade.distance} km
              </Typography>
            </div>
            <div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                DURÉE
              </Typography>{" "}
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {balade.duree} heures
              </Typography>
            </div>
            <div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                NIVEAU
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {balade.Difficulté}
              </Typography>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardBalade;
