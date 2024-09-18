import Categories from "@/components/shared/categories";
import Filters from "@/components/veloVente/filters";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VeloLocationContentData from "@/components/used/VeloLouer/VeloLocationContentData";

function CatalogueVeloVente() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: velosLouer } = useQuery({
    queryKey: ["velos"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:4000/client/veloLocations"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch velos");
      }

      const result = await response.json();
      console.log(result);
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="topCatalog">
        <Breadcrumb className=" mt-3 ml-7">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/velo-a-louer" className="text-sm">
                Vélo à Louer
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
      </div>
      <Categories
        titre={selectedCategory ? selectedCategory.name : "Vélos à Louer"}
        onCategoryChange={setSelectedCategory}
      />
      <div className=" mt-20 h-0.5 bg-customGreen"></div>
      <div className="flex min-h-lvh  ">
        <Filters selectedCategory={selectedCategory} />
        <VeloLocationContentData
          velos={velosLouer}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}

export default CatalogueVeloVente;
