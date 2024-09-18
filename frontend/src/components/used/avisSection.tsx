import { Box, Rating, Typography } from "@mui/material";
import { FaComments } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

function AvisSection({ id }) {
  // Utilisation de React Query pour récupérer les avis
  const { data: avis = [] } = useQuery({
    queryKey: ["avis", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/client/avis/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch avis");
      }
      const result = await response.json();
      return result.data; // Retourner les avis
    },
  });

  // Calcul de la moyenne des notes
  const moyenneNotes =
    avis.length > 0
      ? avis.reduce((total, avisItem) => total + avisItem.note, 0) / avis.length
      : 0;

  return (
    <div className="">
      <div className="p-4 bg-customGreen-dark h-14 flex items-center pl-4 mb-4">
        <h2 className="text-white text-3xl">Avis</h2>
        <FaComments className="text-white text-2xl ml-2" />
      </div>

      {/* Vérification de l'existence d'avis */}
      {avis.length === 0 ? (
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-lg">Pas d'Avis pour cet Article</h1>
          <MdOutlineRateReview className="text-4xl mt-2" />
        </div>
      ) : (
        <div className="flex justify-between">
          <div>
            {avis.map((avisItem, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="body1">{avisItem.commentaire}</Typography>
                <Rating sx={{marginLeft:"3rem"}} value={avisItem.note} precision={0.1} readOnly />
              </Box>
            ))}
          </div>
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 2,
                marginRight:"3rem",
                marginTop:"2rem"
              }}
            >
              <Typography variant="h6" sx={{ mr: 1 }}>
                Note Moyenne :
              </Typography>
              <Rating value={moyenneNotes} precision={0.1} readOnly />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvisSection;
