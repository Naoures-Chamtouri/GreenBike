import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const FilterBaladeContext = createContext([]);

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterBaladeContext = () => useContext(FilterBaladeContext);

const FilterBaladeProvider = ({ children }) => {
  const [selectedNiveau, setSelectedNiveau] = useState([]);
  const [selectedLieu, setSelectedLieu] = useState("");
  const [selectedMin, setSelectedMin] = useState("");
   const [selectedMax, setSelectedMax] = useState("");
   const [loading, setLoading] = useState(true);

const fetchFilteredBalades = async () => {
  const response = await fetch("http://localhost:4000/client/balades/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      niveau: selectedNiveau,
      min: selectedMin,
      max: selectedMax,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch filtered balades");
  }

  const result = await response.json();

  let balades = result.data;

  // Filtrer par lieu si un lieu est sélectionné
  if (selectedLieu) {
    balades = balades.filter((balade) => {
      const adresseDepart = balade.adresseDepart.nom?.toLowerCase() || "";
      const adresseArrivée = balade.adresseArrivée.nom?.toLowerCase() || "";
      return (
        adresseDepart.includes(selectedLieu.toLowerCase()) ||
        adresseArrivée.includes(selectedLieu.toLowerCase())
      );
    });
  }
   setLoading(false)
  return balades;
};

  const {
    data: filteredBalades,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "filteredBalades",
      selectedLieu,selectedMax,selectedMin,selectedNiveau
    ],
    queryFn: fetchFilteredBalades,
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });

  const resetBaladesFilters = () => {
    setSelectedLieu("");
    setSelectedMax("")
    setSelectedMin("")
    setSelectedNiveau([]);
  };

  const removeBaladesFilter = (filter, type) => {
    if (type === "lieu") {
      setSelectedLieu("");
    } else if (type === "niveau") {
     setSelectedNiveau((prevSelectedniveau) =>
        prevSelectedniveau.filter((t) => t !== filter))
    } else if (type === "min") {
      setSelectedMin("");
    } else if (type === "max") {
      setSelectedMax("");
    }
  };

  return (
    <FilterBaladeContext.Provider
      value={{
        setSelectedNiveau,selectedNiveau,
        setSelectedLieu,selectedLieu,
        setSelectedMax,selectedMax,
        setSelectedMin,selectedMin,
        resetBaladesFilters,
        removeBaladesFilter,
        filteredBalades,
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
    </FilterBaladeContext.Provider>
  );
};

export default FilterBaladeProvider;
