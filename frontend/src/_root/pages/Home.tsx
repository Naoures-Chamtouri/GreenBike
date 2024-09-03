

function Home() {

  
  return (
    <div className="">
      <div className="relative">
        <div
          className="absolute text-customGreen   top-60 right-8
       text-5xl"
        >
          Écologique, pratique, et agréable!
        </div>

        <img
          src="../public/assets/images/veloHome.jpg"
          alt="veloHome"
          className="w-full  z-0 "
          style={{ height: "calc(100vh - 10rem)" }}
        />
      </div>
      <div className="">
        <div className="">
          <h1 className="text-4xl font-serif text-black text-center pt-9  ">
            Les Services
          </h1>
        </div>
        <div>
          <div className="flex w-1/2 bg-customBlue p-4  rounded-3xl">
            <div>
              <h1 className="text-2xl">
                Service vente des Vélos et Equipements
              </h1>
              <p>
                Nous proposons des vélos recyclés et des équipements durables,
                alliant qualité et écologie pour une mobilité responsable à prix
                abordables
              </p>

              <button>consulter Catalogue</button>
            </div>
            <img
              src="../public/assets/images/veloService1.jpg"
              alt="service1"
              className="w-80"
            />
          </div>
          <div className="flex w-1/2  bg-customBlue p-4  rounded-3xl">
            <div>
              <h1 className="text-2xl">Service location des Vélos</h1>
              <p>
                Louez un vélo pour une solution pratique et flexible, parfaite
                pour vos déplacements quotidiens ou vos aventures.
              </p>
              <button>consulter Catalogue</button>
            </div>
            <img
              src="../public/assets/images/veloService1.jpg"
              alt="service1"
              className="w-80"
            />
          </div>
          <div className="flex  w-1/2  bg-customBlue p-4  rounded-3xl">
            <div>
              <h1 className="text-2xl">Service Organisation des Balades</h1>
              <p>
                Participez à nos balades à vélo pour découvrir de nouveaux
                horizons tout en profitant d'une expérience agréable et
                conviviale.
              </p>
              <button>consulter Catalogue</button>
            </div>
            <img
              src="../public/assets/images/veloService3.jfif"
              alt="service3"
              className="w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
