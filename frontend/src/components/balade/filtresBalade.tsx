import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Checkbox } from "@/components/ui/checkbox";

function FiltresBalade() {
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [searchPlace, setSearchPlace] = useState(""); // État temporaire pour la saisie
  const [selectedPlace, setSelectedPlace] = useState(""); // État pour le filtre actif
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  // Mettre à jour les cases à cocher
  const handleDifficultyChange = (diff) => {
    setSelectedDifficulties((prevSelected) =>
      prevSelected.includes(diff)
        ? prevSelected.filter((id) => id !== diff)
        : [...prevSelected, diff]
    );
  };

  const handleResetFilters = () => {
    setSelectedDifficulties([]);
    setSelectedPlace("");
    setMinDuration("");
    setMaxDuration("");
  };

  const handlePlaceInput = (e) => {
    setSearchPlace(e.target.value);
  };

  const handlePlaceSearch = () => {
    setSelectedPlace(searchPlace);
    console.log(`Rechercher par lieu: ${searchPlace}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePlaceSearch();
    }
  };

  // Mise à jour des filtres
  const filtres = [
    ...selectedDifficulties,
    selectedPlace,
    minDuration && maxDuration && `Durée: ${minDuration}h - ${maxDuration}h`,
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
              onClick={handleResetFilters}
              className="text-green-500 hover:underline"
            >
              Reset Filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDifficulties.map((diff, index) => (
              <Chip
                key={index}
                label={diff}
                onDelete={() => handleDifficultyChange(diff)}
                deleteIcon={<CloseIcon />}
                color="success"
                variant="outlined"
              />
            ))}
            {selectedPlace && (
              <Chip
                label={selectedPlace}
                onDelete={() => setSelectedPlace("")}
                deleteIcon={<CloseIcon />}
                color="success"
                variant="outlined"
              />
            )}
            {minDuration && maxDuration && (
              <Chip
                label={`Durée: ${minDuration}h - ${maxDuration}h`}
                onDelete={() => {
                  setMinDuration("");
                  setMaxDuration("");
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
            className="w-full outline-none"
            value={searchPlace}
            onChange={handlePlaceInput}
            onBlur={handlePlaceSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Filtres par difficultés */}
      <div className="pl-4">
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              Par niveaux
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {["facile", "modéré", "difficile"].map((diff) => (
                  <div key={diff} className=" mt-4 flex items-center space-x-2">
                    <Checkbox
                      id={diff}
                      className="h-4 w-4 rounded border-gray-300 text-customGreen focus:ring-green-500"
                      checked={selectedDifficulties.includes(diff)}
                      onCheckedChange={() => handleDifficultyChange(diff)}
                    />
                    <label htmlFor={diff} className=" text-sm text-gray-700">
                      {diff}
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
                  value={minDuration}
                  onChange={(e) => setMinDuration(e.target.value)}
                  className="w-16 p-1 border border-green-500 rounded text-center"
                />
                <span>à</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(e.target.value)}
                  className="w-16 p-1 border border-green-500 rounded text-center"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Min: {minDuration}h</span>
                <span>Max: {maxDuration}h</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FiltresBalade;
