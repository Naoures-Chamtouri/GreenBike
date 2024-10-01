import { useFilterVenteContext } from "@/context/FiltersVenteContext";
import VeloVenteCard from "./VeloVenteCard";
import Loader from "../shared/loader";
import { useState } from "react";

function VeloVenteContentData({ velos, selectedCategory }) {
   const [loading,setLoading]=useState(true)
  const{filteredVelos}=useFilterVenteContext()
 


  return (
  
    <div className="mr-3 mt-8 ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {filteredVelos?.map((velo) => (
        <VeloVenteCard key={velo._id} velo={velo}  />
      ))}
    </div>
  );
}

export default VeloVenteContentData;
