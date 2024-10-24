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

console.log(selectedNiveau)
  const fetchFilteredBalades = async () => {
    const response = await fetch(
      "http://localhost:4000/client/balades/filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lieu:selectedLieu,
          niveau:selectedNiveau,
          min:selectedMin,
          max:selectedMax
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch filtered balades");
    }
    const result = await response.json();
    console.log(result.data);
    return result.data;
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
    staleTime: 1 * 60 * 1000,
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