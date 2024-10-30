import ContentBarBalade from "@/components/balade/ContentBarBalade";
import FiltresBalade from "@/components/balade/filtresBalade";
import ReservationCart from "@/components/balade/reservationCart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function CatalogueBalade() {
 
  return (
    <div>
      <div className="topCatalog relative">
        <Breadcrumb className=" mt-3 ml-7">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/balades" className="text-sm">
                Balades
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="text-center mt-16 mb-8">
        <h1 className="text-3xl font-bold">Les Balades</h1>
      </div>

      <div className=" mt-20 h-0.5 bg-customGreen"></div>
      <div className="catalogue min-h-lvh  flex ">
        <FiltresBalade />
       <ContentBarBalade  /> 
      </div>
    </div>
  );
}

export default CatalogueBalade
