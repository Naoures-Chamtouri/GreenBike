import Categories from "@/components/shared/categories";
import Filters from "@/components/veloVente/filtersVente";

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

import ShoppingCart from "@/components/veloVente/ShoppingCart";
import VeloVenteContentData from "@/components/veloVente/VeloVenteContentData";

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
      console.log(result.data)
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes avant le refetch
    placeholderData: keepPreviousData, // Garde les anciennes données visibles
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
        <ShoppingCart />
      </div>
      <Categories
        titre={selectedCategory ? selectedCategory.name : "Vélos à Vendre"}
        onCategoryChange={setSelectedCategory}
      />
      <div className="mt-20 h-0.5 bg-customGreen"></div>
      <div className="flex min-h-lvh ">
        <Filters selectedCategory={selectedCategory} />
        <VeloVenteContentData
          velos={velosVente}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}

export default CatalogueVeloVente;
