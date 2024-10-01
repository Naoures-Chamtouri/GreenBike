import { useFilterLocationContext } from "@/context/FiltersLocationContext";
import VeloLocationCard from "./VeloLocationCard";

function VeloLocationContentData({ velos, selectedCategory }) {
  const { filteredVelos } = useFilterLocationContext();
  /* const velosToDisplay = selectedCategory
    ? velos.filter((velo) => {
        console.log(velo.velo.type.categorie.nom);
        console.log(selectedCategory);
        return velo.velo.type.categorie.nom == selectedCategory.name;
      })
    : velos; */

  return (
    <div className="mr-3 mt-8 ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {filteredVelos?.map((velo) => (
        <VeloLocationCard key={velo._id} velo={velo} />
      ))}
    </div>
  );
}

export default VeloLocationContentData;
