import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";
import ResumePanier from "@/components/veloVente/ResumePanier";
import { z } from "zod";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
/* import StripeCheckout from "@/components/payement/StripeCheckout"; */



// Définir le schéma de validation avec Zod
const personInfoSchema = z.object({
  nom: z.string().nonempty("Le nom est requis"),
  telephone: z
    .string()
    .nonempty("Le numéro de téléphone est requis")
    .regex(/^(\+216|00216)?[2459]\d{7}$/, "Numéro de téléphone invalide"),
});

const addressSchema = z.object({
  ville: z.string().nonempty("La ville est requise"),
  delegation: z.string().nonempty("La délégation est requise"),
  district: z.string().nonempty("Le district est requis"),
  adresse: z.string().nonempty("L'adresse est requise"),
});

const PageCommande = () => {
   
  const navigate=useNavigate()
  const { VeloVenteCartItems, clearCart, syncCartWithBackend } =
    useVeloVenteCart();
  const { user } = useAuth();
  const [villes, setVilles] = useState([]);
  const [delegations, setDelegations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [personInfo, setPersonInfo] = useState({ nom: "", telephone: "" });
  const [address, setAddress] = useState({
    ville: "",
    delegation: "",
    district: "",
    adresse: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState({ date: "" });
  const [errors, setErrors] = useState({});
    const [showPopover, setShowPopover] = useState(false);
    const articles =VeloVenteCartItems.map(item => item.id);
  useEffect(() => {
    
    const fetchVilles = async () => {
      const response = await axios.get(
        "http://localhost:4000/client/adresses/villes",
        {
          withCredentials: true,
        }
      );
      setVilles(response.data.data);
    };

    fetchVilles();

     if (user) {
    setPersonInfo({
      nom: user.utilisateur.nomUtilisateur || "",
      telephone: user.utilisateur.numTelephone || "",
    });
  }

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    setDeliveryInfo((prev) => ({
      ...prev,
      date: format(defaultDate, "yyyy-MM-dd"),
    }));
  }, [user]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "personInfo") {
      setPersonInfo((prev) => ({ ...prev, [name]: value }));
    } else if (section === "address") {
      setAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    // Valider les informations personnelles
    const personValidation = personInfoSchema.safeParse(personInfo);
    // Valider l'adresse
    const addressValidation = addressSchema.safeParse(address);

    if (!personValidation.success || !addressValidation.success) {
      const newErrors = {};

      if (!personValidation.success) {
        personValidation.error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
      }

      if (!addressValidation.success) {
        addressValidation.error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
      }

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  useEffect(() => {
    if (address.ville) {
      const fetchDelegations = async () => {
        const response = await axios.get(
          `http://localhost:4000/client/adresses/delegations/${address.ville}`
        );
        setDelegations(response.data.data);
        setDistricts([]);
      };
      fetchDelegations();
    }

    
  }, [address.ville]);

  // Fetch districts when a delegation is selected
  useEffect(() => {
    if (address.delegation) {
      const fetchDistricts = async () => {
        const response = await axios.get(
          `http://localhost:4000/client/adresses/districts/${address.delegation}`
        );
        setDistricts(response.data.data);
      };
      fetchDistricts();
    }
  }, [address.delegation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
       
        const commandeData = {
  
          adresseLivraison: address,
          dateLivraison: deliveryInfo.date,
          numTelephone: personInfo.telephone || user.utilisateur.numTelephone, 
        };

       
        const response = await axios.post(
          "http://localhost:4000/client/commandes",
          commandeData,
          {
            withCredentials: true,
          }
        );
        
         setShowPopover(true);
         setTimeout(() => {
           navigate("/velo-a-vendre");
         }, 2000);
         clearCart()

        

       
      } catch (error) {
        console.error("Erreur lors du passage de la commande:", error);
      }
    }
  };

  return (
    <div className="flex justify-around mt-10 ">
      <form className="p-4 ml-10 max-w-2xl  bg-white rounded-lg shadow-sm mb-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Informations Personnelles</h2>
          <input
            type="text"
            name="nom"
            value={personInfo.nom}
            onChange={(e) => handleChange(e, "personInfo")}
            placeholder="Nom"
            className="w-full p-2 border border-green-600 bg-slate-100 rounded mb-4"
            disabled
          />
          {errors.nom && <p className="text-red-500">{errors.nom}</p>}

          <input
            type="text"
            name="telephone"
            value={personInfo.telephone}
            onChange={(e) => handleChange(e, "personInfo")}
            placeholder="Numéro de téléphone"
            className="w-full p-2 border border-green-600 rounded"
            disabled={!!user.utilisateur.numTelephone}
          />
          {errors.telephone && (
            <p className="text-red-500">{errors.telephone}</p>
          )}
        </div>

        {/* Adresse */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Adresse</h2>
          <select
            name="ville"
            value={address.ville}
            onChange={(e) => handleChange(e, "address")}
            className="w-full p-2 border border-green-600 rounded mb-4"
          >
            <option value="">Sélectionnez une ville</option>
            {villes.map((ville) => (
              <option key={ville._id} value={ville._id}>
                {ville.nom}
              </option>
            ))}
          </select>
          {errors.ville && <p className="text-red-500">{errors.ville}</p>}

          <select
            name="delegation"
            value={address.delegation}
            onChange={(e) => handleChange(e, "address")}
            className="w-full p-2 border border-green-600 rounded mb-4"
            disabled={!address.ville}
          >
            <option value="">Sélectionnez une délégation</option>
            {delegations.map((delegation) => (
              <option key={delegation._id} value={delegation._id}>
                {delegation.nom}
              </option>
            ))}
          </select>
          {errors.delegation && (
            <p className="text-red-500">{errors.delegation}</p>
          )}

          <select
            name="district"
            value={address.district}
            onChange={(e) => handleChange(e, "address")}
            className="w-full p-2 border border-green-600 rounded"
            disabled={!address.delegation}
          >
            <option value="">Sélectionnez un district</option>
            {districts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.nom}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-red-500">{errors.district}</p>}

          <input
            type="text"
            name="adresse"
            value={address.adresse}
            onChange={(e) => handleChange(e, "address")}
            placeholder="Adresse complète"
            className="w-full p-2 border border-green-600 rounded mb-4 mt-5"
          />
          {errors.adresse && <p className="text-red-500">{errors.adresse}</p>}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            Informations sur la Livraison
          </h2>
          <input
            type="date"
            name="date"
            value={deliveryInfo.date}
            className="w-full p-2 border border-green-600 rounded mb-4"
            disabled
          />
          <div className="p-8 border border-green-600">
            <p className="text-base font-semibold">
              -La livraison sera effectuée par{" "}
              <span className="text-green-600">Aramex</span> à la date indiquée
              ci-dessus.
            </p>
          </div>
        </div>
      </form>

      <div>
        <ResumePanier items={VeloVenteCartItems} />
        <div className="mt-6">
          <Button
            variant="contained"
            color="success"
            className="w-full"
            onClick={handleSubmit}
          >
            Finaliser la commande
          </Button>
        {/*   <StripeCheckout amount={10} /> */}
        </div>
      </div>
      {showPopover && (
        <div className="fixed top-16 right-4 p-4 bg-green-400 text-white rounded shadow-lg">
          Commande ajoutée avec succès !
        </div>
      )}
    </div>
  );
};

export default PageCommande;
