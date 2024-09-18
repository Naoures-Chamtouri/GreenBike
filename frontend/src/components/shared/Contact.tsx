
function Contact() {
  return (
    <div className="bg-gray-100 ">
      <div className="center-home   flex items-start justify-center">
        <h1 className=" mt-4 w-42 py-8 text-4xl border-b-4 border-customGreen font-medium ">
          Contact
        </h1>
      </div>
      <div className="container mx-auto mt-14 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section Nous contacter */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Nous contacter</h2>
            <ul>
              <li className="mb-2">
                <i className="fas fa-map-marker-alt"></i>
                123 Avenue Habib Bourguiba, Tunis, Tunisie
              </li>
              <li className="mb-2">
                <i className="fas fa-map-marker-alt"></i>
                45 Rue de la République, Sousse, Tunisie
              </li>
              <li className="mb-2">
                <i className="fas fa-phone"></i>
                +216 71 234 567
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope"></i>
                contact@greenbike.tn
              </li>
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-4 font-mono">Nos bureaux</h3>
            {/* Image pour l'emplacement */}
            <img
              src="/assets/images/map.jfif"
              alt="Emplacement des bureaux"
              className="w-full h-1/2 object-cover"
            />
          </div>

          {/* Section Envoyez-nous un message */}
          <div>
            <h2 className="text-2xl font-bold mb-8 font-mono">Envoyez-nous un message</h2>
            <p className="mb-8 font-mono">
              Si vous avez des questions ou des suggestions, n'hésitez pas à
              nous contacter en utilisant le formulaire ci-dessous. Nous vous
              répondrons dans les plus brefs délais.
            </p>
            <form>
              <div className="mb-8">
                <input
                  className="border w-full p-2"
                  type="text"
                  placeholder="Nom"
                />
              </div>
              <div className="mb-8">
                <input
                  className="border w-full p-2"
                  type="email"
                  placeholder="E-mail"
                />
              </div>
              <div className="mb-8">
                <input
                  className="border w-full p-2"
                  type="text"
                  placeholder="Sujet"
                />
              </div>
              <div className="mb-8">
                <textarea
                  className="border w-full p-2"
                  placeholder="Tapez votre message ici"
                ></textarea>
              </div>
              <button
                className="bg-green-600 text-white px-6 py-2"
                type="submit"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>

      {/*  <div> <p>numero</p>
        <p>adresse</p>
        </div> */}

      {/*  <img src="/assets/images/map.jfif" alt="contact-map"  className="m-10"/> */}
    </div>
  );
}

export default Contact
