import ReservationCart from "@/components/balade/reservationCart";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import trajet from "../../../public/assets/images/trajet.png";
import LeftSide from "@/components/balade/LeftSide";
import Carousel from "@/components/ui/carousel";
import RightSide from "@/components/balade/RightSide";
function PageBalade (){
const location = useLocation();
const { balade } = location.state || {};


    
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/balades" className="text-sm">
                  {balade.nom},{balade.adresseDepart.location}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ReservationCart />
        </div>
        <div className="content  mt-24 mb-10">
          <div className="flex justify-around ">
            <Carousel images={balade.images} />
            <img alt="trajet" src={trajet} className="w-3/5 h-96 mr-3 " />
          </div>
          <div className="flex">
            <LeftSide balade={balade} />
            <RightSide balade={balade}  />
          </div>
        </div>
      </div>
    );
}

export default PageBalade;