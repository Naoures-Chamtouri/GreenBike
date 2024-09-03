import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox"; 
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button"; 
import Stack from "@mui/material/Stack";
import { wrap } from "module";

function Filters({selectedCategory}) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMarques, setSelectedMarques] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
   const url = selectedCategory
     ? `http://localhost:4000/client/types/${selectedCategory.id}`
     : "http://localhost:4000/client/types";

     console.log()

  const { data: types } = useQuery({
    queryKey: ["types",selectedCategory],
    queryFn: async () => {

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch types");
      }
      const result = await response.json();
      return result.data;
    },
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
  });

  const handleTypeChange = (typeId) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(typeId)
        ? prevSelectedTypes.filter((id) => id !== typeId)
        : [...prevSelectedTypes, typeId]
    );
  };

  const handleMarqueChange = (marqueId) => {
    setSelectedMarques((prevSelectedMarques) =>
      prevSelectedMarques.includes(marqueId) ? prevSelectedMarques.filter((id) => id !== marqueId)
        : [...prevSelectedMarques, marqueId]
    );
  };

  const handleRemoveFilter = (filter, type) => {
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

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedMarques([]);
    setSelectedPrice("");
  };

  const filtres=[...selectedMarques,...selectedTypes,...selectedPrice]

  return (
    <div className="w-1/5 pr-3 border-r-2 border-gray-100 pt-3">
      {filtres.length > 0 && (
        <div>
          <h3 className="text-lg">
            Filtres Actifs (
            {selectedTypes.length +
              selectedMarques.length +
              (selectedPrice ? 1 : 0)}
            )
          </h3>
          <Button
            variant="text"
            onClick={handleResetFilters}
            style={{ marginLeft: "auto", color: "green" }}
          >
            Reset Filters
          </Button>
          <Stack direction="row" spacing={1} marginTop={2} flexWrap={"wrap"}>
            {selectedTypes.map((type, index) => (
              <Chip
                key={index}
                label={type}
                onDelete={() => handleRemoveFilter(type, "type")}
                color="success"
                variant="outlined"
              />
            ))}
            {selectedMarques.map((marque, index) => (
              <Chip
                key={index}
                label={marque}
                onDelete={() => handleRemoveFilter(marque, "marque")}
                color="success"
                variant="outlined"
              />
            ))}
            {selectedPrice && (
              <Chip
                label={`Prix: ${selectedPrice}`}
                onDelete={() => handleRemoveFilter(selectedPrice, "price")}
                color="success"
                variant="outlined"
              />
            )}
          </Stack>
        </div>
      )}

      {/* Section Filtres Par Prix */}
      <div className="prix-filtre ">
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">Par Prix</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2">
                <button
                  className={`mx-6 text-center border px-3 py-2 font-bold rounded-sm ${
                    selectedPrice === "200-700"
                      ? "border-customGreen "
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedPrice("200-700")}
                >
                  200-700d
                </button>
                <button
                  className={`mx-6 text-center border px-3 py-2 font-bold rounded-sm ${
                    selectedPrice === "+700"
                      ? "border-customGreen"
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedPrice("+700")}
                >
                  +700d
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Section Filtres Par Type */}
      {types?.length >0 &&(<div className="type-filtre pl-4">
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
                    checked={selectedTypes.includes(type.nom)}
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
      </div>)}

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
                    checked={selectedMarques.includes(marque.nom)}
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
