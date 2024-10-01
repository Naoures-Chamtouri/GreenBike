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
import { Alert, Box, Popover, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
function PageBalade (){
const location = useLocation();
const { balade } = location.state || {};

const [anchorEl, setAnchorEl] = useState(null);
const [successMessage, setSuccessMessage] = useState("");

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;


const handlePopoverClose = () => {
  setAnchorEl(null);
  setSuccessMessage("");
};


    
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
        </div>
        <div className="content  mt-24 mb-10">
          <div className="flex justify-around ">
            <Carousel images={balade.images} />
            <img alt="trajet" src={trajet} className="w-3/5 h-96 mr-3 " />
          </div>
          <div className="flex">
            <LeftSide balade={balade} />
            <RightSide
              balade={balade}
              setAnchorElPopOver={setAnchorEl}
              setSuccessMessage={setSuccessMessage}
              handlePopoverClose={handlePopoverClose}
            />
          </div>
         
          <Snackbar
            open={Boolean(anchorEl)}
            autoHideDuration={2000}
            onClose={handlePopoverClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handlePopoverClose}
              severity="success"
              sx={{ width: "100%" }}
            >
             {successMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
}

export default PageBalade;