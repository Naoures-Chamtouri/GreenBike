import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; 
import axios from "axios";
import {useVeloVenteCart} from "@/context/VeloVenteCartContext";

const SigninValidation = z.object({
  email: z.string().email("Adresse email invalide"),
  motDePasse: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

function SigninForm() {
  const {syncCartWithBackend}=useVeloVenteCart()
  const { setUser } = useAuth(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const location = useLocation();
const from = location.state?.from?.pathname || "/";
  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      motDePasse: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values) {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.post(
        "http://localhost:4000/client/login",
        {
          email: values.email,
          motDePasse: values.motDePasse,
        },
        { withCredentials: true } 
      );

     
      setUser(response.data.data); 
      
     
await syncCartWithBackend(); 
       navigate(from, { replace: true });
         
    } catch (error) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      setUser(null); 
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sm:w-400 flex-center flex-col">
      <img src="/assets/images/logo.png" alt="logo" className="h-40" />
      <h2 className="text-lg md:h2-bold sm:pt-1">
        Connectez-vous à votre compte
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mt-3 gap-2"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de Passe
          </label>
          <input
            id="password"
            type="password"
            {...register("motDePasse")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.motDePasse && (
            <p className="text-red-500 text-sm">{errors.motDePasse.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-customGreen  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <p className="text-small-regular text-center mt-2">
          Pas de compte ?
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1 underline"
          >
            Créez un compte
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SigninForm;
