import { Box, Rating, Typography } from "@mui/material";
import { FaComments } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
function AvisSection({id}) {

  const{data:avis}=useQuery({
    queryKey:[]
  })
  /* const moyenneNotes =
    avis.length > 0
      ? avis.reduce((total, avisItem) => total + avisItem.note, 0) / avis.length
      : 0; */
      console.log(avis)
  return (
    <div>
      <div className="bg-customGreen-dark h-14">
        <div className="text-white text-5xl flex pl-2">
          <h2>Avis</h2>
          <FaComments className="ml-2 mt-1" />
        </div>
        {!avis ? (
          <div>
            <h1>Pas d'Avis pour cet Article </h1>
            <MdOutlineRateReview />
          </div>
        ) : (
          <div>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ mr: 1 }}>
                Note Moyenne :
              </Typography>
              <Rating value={moyenneNotes} precision={0.1} readOnly />
            </Box> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvisSection;
