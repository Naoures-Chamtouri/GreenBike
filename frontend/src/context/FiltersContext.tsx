import { createContext, useState, useContext } from "react";

// Create the context
const FiltersContext = createContext({});

// Create the context provider
export function FiltersProvider({ children }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMarques, setSelectedMarques] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    types: selectedTypes,
    marques: selectedMarques,
  });

  const updateFilters = (filterType, newValues) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: newValues,
    }));
  };

  return (
    <FiltersContext.Provider
      value={{
        selectedFilters,
        updateFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

// Custom hook to use the filters context
export function useFilters() {
  return useContext(FiltersContext);
}
