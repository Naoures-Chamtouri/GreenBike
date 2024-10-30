import Categories from "@/components/shared/categories";
import Filters from "@/components/VeloLouer/filtersLocation";

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
import VeloLocationContentData from "@/components/VeloLouer/VeloLocationContentData";

function CatalogueVeloVente() {
  const [selectedCategory, setSelectedCategory] = useState("");
 

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
         
        />
      </div>
    </div>
  );
}

export default CatalogueVeloVente;
