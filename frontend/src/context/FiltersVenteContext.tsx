import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Create context
const FilterVenteContext = createContext([]);

// Custom hook to use the context


const FilterVenteProvider = ({ children }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMarques, setSelectedMarques] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory,setSelectedCategory]=useState("")

  
  const fetchFilteredVelos = async () => {
    
    const response = await fetch("http://localhost:4000/client/veloVentes/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        types: selectedTypes,
        marques: selectedMarques,
        prix: selectedPrice,
       categorie:selectedCategory 
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch filtered velos");
    }
    const result = await response.json();
    console.log(result.data)
    return result.data;
  };


  const {
    data: filteredVelos,
    error,
    isLoading,
  } = useQuery({
    queryKey:["filteredVelos", selectedTypes, selectedMarques, selectedPrice,selectedCategory],
    queryFn:fetchFilteredVelos,
      staleTime: 5 * 60 * 1000,
      placeholderData:[]
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
        selectedCategory,setSelectedCategory,
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
      }}
    >
      {children}
    </FilterVenteContext.Provider>
  );
};
export default FilterVenteProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useFilterVenteContext = () =>{ return useContext(FilterVenteContext)};