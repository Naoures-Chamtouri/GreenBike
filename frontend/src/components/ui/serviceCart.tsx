import { AiOutlineArrowRight } from "react-icons/ai"; 

function ServiceCart({ image, titre, texte ,link}) {
  return (
    <div className="bg-gray-100 text-black p-6 rounded-lg flex flex-col justify-center h-full relative hover:bg-white hover:shadow-2xl shadow-gray-950 sh transition-all duration-300 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-12 before:h-1 before:bg-transparent hover:before:bg-customGreen">
      <img
        alt="service"
        src={image}
        className="w-36 h-36 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-bold mb-2 font-mono">{titre}</h2>
      <p className="mb-4 font-mono">{texte}</p>
      <a
        href={`/${link}`}
        className="bg-gray-100 font-mono text-black text-center font-medium text-lg px-4 py-2 rounded group hover:bg-gray-200  transition-all duration-400 relative overflow-hidden"
      >
        Consulter Catalogue
          <AiOutlineArrowRight className=" inline-block ml-2  group-hover:translate-x-1 transition-transform duration-700" />
       
      </a>
    </div>
  );
}

export default ServiceCart;
