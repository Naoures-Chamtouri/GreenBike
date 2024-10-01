import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useFilterLocationContext } from "@/context/FiltersLocationContext";

function Filters({ selectedCategory }) {
  const {
    selectedLocationTypes,
    setSelectedLocationTypes,
    selectedLocationMarques,
    setSelectedLocationMarques,
    resetLocationFilters,
    removeLocationFilter,
  } = useFilterLocationContext();
  const url = selectedCategory
    ? `http://localhost:4000/client/types/${selectedCategory.id}`
    : "http://localhost:4000/client/types";

  console.log();

  const { data: types } = useQuery({
    queryKey: ["types", selectedCategory],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch types");
      }
      const result = await response.json();
      return result.data;
    },
    staleTime: 1 * 60 * 1000,
    placeholderData: [],
  });

  const { data: marques } = useQuery({
    queryKey: ["marques"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/client/marques");
      if (!response.ok) {
        throw new Error("Failed to fetch marques");
      }
      const result = await response.json();
      return result.data;
    },
    staleTime: 1 * 60 * 1000,
    placeholderData: [],
  });

  const handleTypeChange = (typeId) => {
    setSelectedLocationTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(typeId)
        ? prevSelectedTypes.filter((id) => id !== typeId)
        : [...prevSelectedTypes, typeId]
    );
  };

  const handleMarqueChange = (marqueId) => {
    setSelectedLocationMarques((prevSelectedMarques) =>
      prevSelectedMarques.includes(marqueId)
        ? prevSelectedMarques.filter((id) => id !== marqueId)
        : [...prevSelectedMarques, marqueId]
    );
  }; 
   
   const filtres = [...selectedLocationMarques, ...selectedLocationTypes]; 

  return (
    <div className="w-1/5 pr-3 border-r-2 border-gray-100 pt-3">
       {filtres.length > 0 && (
        <div>
          <h3 className="text-lg">
            Filtres Actifs (
            {selectedLocationTypes.length +
              selectedLocationMarques.length }
            )
          </h3>
          <Button
            variant="text"
            onClick={resetLocationFilters}
            style={{ marginLeft: "auto", color: "green" }}
          >
            Reset Filters
          </Button>
          <Stack direction="row" spacing={1} marginTop={2} flexWrap={"wrap"}>
            {selectedLocationTypes.map((type, index) => (
              <Chip
                key={index}
                label={type}
                onDelete={() => removeLocationFilter(type, "type")}
                color="success"
                variant="outlined"
              />
            ))}
            {selectedLocationMarques.map((marque, index) => (
              <Chip
                key={index}
                label={marque}
                onDelete={() => removeLocationFilter(marque, "marque")}
                color="success"
                variant="outlined"
              />
            ))}

          </Stack>
        </div>
      )}

      {/* Section Filtres Par Type */}
      {types?.length > 0 && (
        <div className="type-filtre pl-4">
          <Accordion type="single" defaultValue="item-2" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Par Type</AccordionTrigger>
              <AccordionContent>
                {types?.map((type) => (
                  <div
                    key={type._id}
                    className="mt-4 flex items-center space-x-2"
                  >
                    <Checkbox
                      id={type._id}
                      checked={selectedLocationTypes.includes(type.nom)}
                      className="h-4 w-4 rounded border-gray-300 text-customGreen focus:ring-green-500"
                      onCheckedChange={() => handleTypeChange(type.nom)}
                    />
                    <label htmlFor={type._id} className="text-gray-700">
                      {type.nom}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

     <div className="marque-filtre pl-4">
        <Accordion type="single" defaultValue="item-3" collapsible>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Par Marque</AccordionTrigger>
            <AccordionContent>
              {marques?.map((marque) => (
                <div
                  key={marque._id}
                  className="mt-4 flex items-center space-x-2"
                >
                  <Checkbox
                    id={marque._id}
                    checked={selectedLocationMarques.includes(marque.nom)}
                    className="h-4 w-4 rounded border-gray-300 text-customGreen focus:ring-green-500"
                    onCheckedChange={() => handleMarqueChange(marque.nom)}
                  />
                  <label htmlFor={marque._id} className="text-gray-700">
                    {marque.nom}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> 
    </div>
  );
}

export default Filters;
