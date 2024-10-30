import { useFilterBaladeContext } from "@/context/FiltersBaladeContext";
import CardBalade from "./CardBalade";
import { Box, CircularProgress } from "@mui/material";


function ContentBarBalade() {
  const {filteredBalades,loading}=useFilterBaladeContext()
   if (loading) {
     return (
       <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         marginLeft="70vh"
         marginBottom="70vh"
       >
         <CircularProgress color="success" />
       </Box>
     );
   }
  return (
    <div className="mr-3 mt-8 ml-8 grid grid-cols-1 sm:grid-cols-3 gap-7 p-4">
      {filteredBalades?.map((balade) => (
        <CardBalade key={balade._id} balade={balade}  />
      ))}
    </div>
  );
}

export default ContentBarBalade
