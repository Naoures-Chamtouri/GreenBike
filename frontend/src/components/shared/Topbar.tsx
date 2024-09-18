import { Input } from "../ui/input";
import { FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function Topbar() {
  return (
    <div className="topbar ">
      <div className="w-full flex items-center justify-between px-4  bg-white shadow-black  shadow-sm">
        <img src="/assets/images/logo.png" alt="logo" className="h-24" />

        <div className="relative w-full max-w-md mx-auto">
          <Input
            type="text"
            className="w-full max-w-xl pr-10 py-2 border rounded"
            placeholder="Recherche..."
          />
          <img
            src="/assets/icons/search-svgrepo-com.svg"
            className="w-6 absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
            alt="search"
          />
        </div>

        <div className="flex space-x-3 mr-12">
          <div className="p-2 border-2 border-customGreen rounded-full">
            <FaInstagram className="w-6 h-6" />
          </div>
          <div className="p-2 border-2 border-customGreen rounded-full">
            <TbBrandFacebook className="w-6 h-6" />
          </div>
          <div className="p-2 border-2 border-customGreen rounded-full">
            <MdOutlineEmail className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-4">
         
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="mx-auto w-full px-4 z-20 shadow-customGreen shadow-sm sm:px-6 lg:px-8">
        <div className="flex justify-center  items-center h-16">
          <div className="flex space-x-28">
            <a href="/" className="text-black hover:text-gray-500">
              Accueil
            </a>
            {/*  <div className="relative group">
              <a
                href="#"
                className="text-black hover:text-gray-900 flex items-center"
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <ul className="absolute left-0 hidden mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg group-hover:block">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Location des Vélos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Vente des Vélos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Balades à Vélo
                  </a>
                </li>
              </ul>
            </div> */}
            <a href="/velo-a-louer" className="text-black hover:text-gray-500">
              Location des Vélos
            </a>
            <a href="/velo-a-vendre" className="text-black hover:text-gray-500">
              Vente des Vélos
            </a>
            <a href="/balades" className="text-black hover:text-gray-500">
              Balades
            </a>
           
            <a href="#" className="text-black hover:text-gray-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar
