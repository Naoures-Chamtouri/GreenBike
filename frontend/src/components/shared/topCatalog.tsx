import { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";

function TopCatalog() {
    const [filtre, setFiltre] = useState("CACHER LES FILTRES");
  return (
    <div className="flex ">
      <BsFilterLeft className="mt-1 mr-1 ml-1"/>
      <button onClick={()=>{filtre=="CACHER LES FILTRES"?setFiltre("VOIR LES FILTRES"):setFiltre("CACHER LES FILTRES")}}>{filtre}</button>
    </div>
  );
}

export default TopCatalog;
