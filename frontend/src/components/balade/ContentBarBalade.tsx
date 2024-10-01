import { useFilterBaladeContext } from "@/context/FiltersBaladeContext";
import CardBalade from "./CardBalade";


function ContentBarBalade({balades}) {
  const {filteredBalades}=useFilterBaladeContext()
  return (
    <div className="mr-3 mt-8 ml-5 grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
      {filteredBalades?.map((balade) => (
        <CardBalade key={balade._id} balade={balade}  />
      ))}
    </div>
  );
}

export default ContentBarBalade
