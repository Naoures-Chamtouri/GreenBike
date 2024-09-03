import Bottombar from "@/components/shared/bottombar";
import Categories from "@/components/shared/categories";
import Filters from "@/components/veloVente/filters";
import TopCatalog from "@/components/shared/topCatalog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ContentBarData from "@/components/used/Catalogue/ContentBarData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Cart from "@/components/veloVente/Cart";

function CatalogueVeloVente() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: velosVente } = useQuery({
    queryKey: ["velos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/client/veloVentes");
      if (!response.ok) {
        throw new Error("Failed to fetch velos");
      }
      const result = await response.json();
      return result.data;
    },
  });

  return (
    <div>
      <div className="topCatalog relative ">
        <Breadcrumb className="mt-3 ml-7">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/velo-a-vendre" className="text-sm">
                Vélo à Vendre
              </BreadcrumbLink>
            </BreadcrumbItem>
            {selectedCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-sm">
                    {selectedCategory.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
       <Cart/>
      </div>
      <Categories
        titre={selectedCategory ? selectedCategory.name : "Vélos à Vendre"}
        onCategoryChange={setSelectedCategory}
      />
      <div className="mt-20 h-0.5 bg-customGreen"></div>
      <div className="flex">
        <Filters selectedCategory={selectedCategory} />
        <ContentBarData
          velos={velosVente}
          titre="Ajouter au Panier"
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}

export default CatalogueVeloVente;
