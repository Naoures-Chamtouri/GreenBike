import ReservationCart from "@/components/balade/reservationCart";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import LeftSide from "@/components/balade/LeftSide";
import Carousel from "@/components/ui/carousel";
import RightSide from "@/components/balade/RightSide";

import SimpleMap from "@/components/ui/mapComponent";
function PageBalade (){
const location = useLocation();
const { balade } = location.state || {};


const images = balade.images.map((image) => image.path);


    





    
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
                  {balade.nom},{balade.adresseDepart.nom}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="content  mt-24 mb-10">
          <div className="flex justify-around ">
            <Carousel images={images} />
            <div className="mr-2">
              
              <SimpleMap trajet={balade.trajet} />
            </div>
          </div>
          <div className="flex">
            <LeftSide balade={balade} />
            <RightSide
              balade={balade}
             
            />
          </div>
        </div>
      </div>
    );
}

export default PageBalade;