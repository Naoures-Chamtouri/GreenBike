import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const FilterLocationContext = createContext([]);


// eslint-disable-next-line react-refresh/only-export-components
export const useFilterLocationContext = () => useContext(FilterLocationContext);

const FilterLocationProvider = ({ children }) => {
  const [selectedLocationTypes, setSelectedLocationTypes] = useState([]);
  const [selectedLocationMarques, setSelectedLocationMarques] = useState([]);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState("");
  const [loading, setLoading] = useState(true);
 
  const fetchFilteredVelos = async () => {
    const response = await fetch(
      "http://localhost:4000/client/veloLocations/filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          types: selectedLocationTypes,
          marques: selectedLocationMarques,
          categorie: selectedLocationCategory,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch filtered velos");
    }
    const result = await response.json();
    console.log(result.data)
    setLoading(false)
    return result.data;
  };

  const {
    data: filteredVelos,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "filteredVelos",
      selectedLocationTypes,
      selectedLocationMarques,
      
      selectedLocationCategory,
    ],
    queryFn: fetchFilteredVelos,
    staleTime: 1 * 60 * 1000,
    placeholderData: [],
  });

  const resetLocationFilters = () => {
    setSelectedLocationTypes([]);
    setSelectedLocationMarques([]);
    
  };

  const removeLocationFilter = (filter, type) => {
    if (type === "type") {
      setSelectedLocationTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((t) => t !== filter)
      );
    } else if (type === "marque") {
      setSelectedLocationMarques((prevSelectedMarques) =>
        prevSelectedMarques.filter((m) => m !== filter)
      );
    } 
  };

  return (
    <FilterLocationContext.Provider
      value={{
        selectedLocationCategory,
        setSelectedLocationCategory,
        selectedLocationTypes,
        setSelectedLocationTypes,
        selectedLocationMarques,
        setSelectedLocationMarques,
        resetLocationFilters,
        removeLocationFilter,
        filteredVelos,
        isLoading,
        error,
        loading
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {children}
    </FilterLocationContext.Provider>
  );
};

export default FilterLocationProvider;
