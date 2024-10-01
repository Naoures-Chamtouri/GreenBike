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
  const { data: balades } = useQuery({
    queryKey: ["balades"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/client/balades");
      if (!response.ok) {
        throw new Error("Failed to fetch velos");
      }
      const result = await response.json();
      console.log(result.data);
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
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
       <ContentBarBalade  balades={balades}/> 
      </div>
    </div>
  );
}

export default CatalogueBalade
