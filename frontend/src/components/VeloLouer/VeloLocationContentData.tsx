import { useFilterLocationContext } from "@/context/FiltersLocationContext";
import VeloLocationCard from "./VeloLocationCard";
import { Box, CircularProgress } from "@mui/material";

function VeloLocationContentData() {
 const { filteredVelos, loading } = useFilterLocationContext();
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
    <div className="mr-3 mt-8 ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {filteredVelos?.map((velo) => (
        <VeloLocationCard key={velo._id} velo={velo} />
      ))}
    </div>
  );
}

export default VeloLocationContentData;
