import Bottombar from "@/components/shared/bottombar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="w-full">
      <Topbar />
      <div className="">
        <Outlet  />
      </div>
      <Bottombar/>
    </div>
  );
}

export default RootLayout;
