import { useFilterBaladeContext } from "@/context/FiltersBaladeContext";
import CardBalade from "./CardBalade";


function ContentBarBalade() {
  const {filteredBalades}=useFilterBaladeContext()
  return (
    <div className="mr-3 mt-8 ml-8 grid grid-cols-1 sm:grid-cols-3 gap-7 p-4">
      {filteredBalades?.map((balade) => (
        <CardBalade key={balade._id} balade={balade}  />
      ))}
    </div>
  );
}

export default ContentBarBalade
