import Contact from "@/components/shared/Contact";
import ServiceCart from "@/components/ui/serviceCart";
import Slider3D from "@/components/ui/Slider3D";


function Home() {

  
  return (
    <div className="">
      <div className=" top-home relative">
        <div
          className=" flex justify-between absolute bg-gray-100 rounded-l-[200px]  w-1/2 h-[578px] right-0 z-10
       text-5xl"
        >
          <div className="mt-28 ml-24">
            <img
              src="/assets/images/GreenBike.png"
              alt="logo"
              className="h-40 ml-28"
            />
            <p className="text-xl font-mono ">
              Roulez vers un avenir durable :<br />{" "}
              <span className="text-customGreen">achetez</span>,
              <span className="text-customGreen">louez</span> et profitez de{" "}
              <span className="text-customGreen">balades à vélo</span> en
              Tunisie.
            </p>
          </div>
          <div className=" mt-72 mr-2 ">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <div className="w-3 h-3 rounded-full mt-1 mr- bg-customGreen"></div>
            <div className="w-3 h-3 rounded-full mt-1 bg-black"></div>
          </div>
        </div>

        <img
          src="../public/assets/images/veloHome.jpg"
          alt="veloHome"
          className="w-2/3  z-0 "
          style={{ height: "calc(100vh - 10rem)" }}
        />

        <div className=" absolute w-9 h-9 rounded-full bg-customGreen top-1/2 right-[742px] z-30"></div>
      </div>
      <div className="center-home  bg-gray-100 flex items-start justify-center">
        <div>
          <h1 className="  mt-4 w-52 py-8 text-4xl border-b-4 border-customGreen font-medium ">
            Nos Services
          </h1>
          <p className="text-lg mt-5 font-mono">Découvrez nos services</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-7 bg-gray-100">
        <ServiceCart
          image="/assets/images/money.png"
          titre="Service vente des Vélos "
          texte="Nous proposons des vélos recyclés et des équipements durables, alliant qualité et écologie pour une mobilité responsable à prix abordables"
          link="velo-a-vendre"
        />
        <ServiceCart
          image="/assets/images/rent.png"
          titre="Service location des Vélos "
          texte="Louez un vélo pour une solution pratique et flexible, parfaite pour vos déplacements quotidiens ou vos aventures."
          link="velo-a-louer"
        />
        <ServiceCart
          image="/assets/images/bicycling.png"
          titre="Service Organisation des Balades "
          texte="Participez à nos balades à vélo pour découvrir de nouveaux horizons tout en profitant d'une expérience agréable et conviviale."
          link="balades"
        />
      </div>
      <Contact />
    </div>
  );
}

export default Home;
