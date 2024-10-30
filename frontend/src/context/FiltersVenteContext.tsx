import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const FilterVenteContext = createContext([]);

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useFilterVenteContext = () => useContext(FilterVenteContext);

const FilterVenteProvider = ({ children }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMarques, setSelectedMarques] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFilteredVelos = async () => {
    const response = await fetch(
      "http://localhost:4000/client/veloVentes/filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          types: selectedTypes,
          marques: selectedMarques,
          prix: selectedPrice,
          categorie: selectedCategory,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch filtered velos");
    }
    const result = await response.json();
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
      selectedTypes,
      selectedMarques,
      selectedPrice,
      selectedCategory,
    ],
    queryFn: fetchFilteredVelos,
    staleTime: 1 * 60 * 1000,
    placeholderData: [],
  });

  const resetVenteFilters = () => {
    setSelectedTypes([]);
    setSelectedMarques([]);
    setSelectedPrice("");
  };

  const removeVenteFilter = (filter, type) => {
    if (type === "type") {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((t) => t !== filter)
      );
    } else if (type === "marque") {
      setSelectedMarques((prevSelectedMarques) =>
        prevSelectedMarques.filter((m) => m !== filter)
      );
    } else if (type === "price") {
      setSelectedPrice("");
    }
  };

  return (
    <FilterVenteContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTypes,
        setSelectedTypes,
        selectedMarques,
        setSelectedMarques,
        selectedPrice,
        setSelectedPrice,
        resetVenteFilters,
        removeVenteFilter,
        filteredVelos,
        isLoading,
        error,
        loading
      }}
    >
      {children}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        transitionDuration={{ appear: 500, enter: 500, exit: 500 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </FilterVenteContext.Provider>
  );
};

export default FilterVenteProvider;
