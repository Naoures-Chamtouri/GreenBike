import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Close as CloseIcon,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilterBaladeContext } from "@/context/FiltersBaladeContext"; 

function FiltresBalade() {
  const {
    selectedNiveau,
    setSelectedNiveau,
    selectedLieu,
    setSelectedLieu,
    selectedMin,
    setSelectedMin,
    selectedMax,
    setSelectedMax,
    resetBaladesFilters,} =useFilterBaladeContext();

  const [searchPlace, setSearchPlace] = useState(""); // État temporaire pour la saisie


  const handlePlaceInput = (e) => {
    setSearchPlace(e.target.value);
  };

  const handlePlaceSearch = () => {
    setSelectedLieu(searchPlace);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePlaceSearch();
    }
  };
const resetFilters=()=>{
  resetBaladesFilters();
  setSearchPlace("")
}
  const filtres = [
    ...selectedNiveau,
    selectedLieu,
    selectedMin && selectedMax && `Durée: ${selectedMin}h - ${selectedMax}h`,
  ].filter(Boolean);

  return (
    <div className="w-1/5 pr-7 border-r-2 border-gray-100 pt-3">
      {/* Filtres Actifs */}
      {filtres.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              Filtres Actifs ({filtres.length})
            </h3>
            <button
              onClick={resetFilters}
              className="text-green-500 hover:underline"
            >
              Reset Filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedNiveau.map((niveau, index) => (
              <Chip
                key={index}
                label={niveau}
                onDelete={() => setSelectedNiveau((prev) => prev.filter((n) => n !== niveau))}
                deleteIcon={<CloseIcon />}
                color="success"
                variant="outlined"
              />
            ))}
            {selectedLieu && (
              <Chip
                label={selectedLieu}
                onDelete={() => setSelectedLieu("")}
                deleteIcon={<CloseIcon />}
                color="success"
                variant="outlined"
              />
            )}
            {selectedMin && selectedMax && (
              <Chip
                label={`Durée: ${selectedMin}h - ${selectedMax}h`}
                onDelete={() => {
                  setSelectedMin("");
                  setSelectedMax("");
                }}
                deleteIcon={<CloseIcon />}
                color="success"
                variant="outlined"
              />
            )}
          </div>
        </div>
      )}

      {/* Barre de recherche avec label */}
      <div className="pb-6 mt-4 pl-4 border-b ">
        <label htmlFor="searchPlace" className="block text-black mb-1 text-lg font-medium">
          Rechercher par lieu:
        </label>
        <div className="flex items-center border border-green-500 rounded ml-1 px-2 mt-5 py-1 w-56">
          <IoIosSearch className="text-green-500 mr-2" />
          <input
            id="searchPlace"
            type="text"
            placeholder="Lieu..."
            className="w-80 outline-none "
            value={searchPlace}
            onChange={handlePlaceInput}
            onBlur={handlePlaceSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Filtres par niveaux */}
      <div className="pl-4">
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              Par niveaux
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {["facile", "modéré", "difficile"].map((niveau) => (
                  <div key={niveau} className="mt-4 flex items-center space-x-2">
                    <Checkbox
                      id={niveau}
                      className="h-4 w-4 rounded border-gray-300 text-customGreen focus:ring-green-500"
                      checked={selectedNiveau.includes(niveau)}
                      onCheckedChange={() => {
                        setSelectedNiveau((prevSelected) =>
                          prevSelected.includes(niveau)
                            ? prevSelected.filter((n) => n !== niveau)
                            : [...prevSelected, niveau]
                        );
                      }}
                    />
                    <label htmlFor={niveau} className="text-sm text-gray-700">
                      {niveau}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Filtres par durée */}
      <div className="pl-4">
        <Accordion type="single" defaultValue="item-2" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Par Durée</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-around space-x-2">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={selectedMin}
                  onChange={(e) => setSelectedMin(e.target.value)}
                  className="w-16 p-1 border border-green-500 rounded text-center"
                />
                <span>à</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={selectedMax}
                  onChange={(e) => setSelectedMax(e.target.value)}
                  className="w-16 p-1 border border-green-500 rounded text-center"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Min: {selectedMin}h</span>
                <span>Max: {selectedMax}h</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FiltresBalade;
