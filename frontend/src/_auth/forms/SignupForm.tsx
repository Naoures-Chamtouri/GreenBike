import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";


import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";

function SignupForm() {
  const { setUser } = useAuth();
   const { syncCartWithBackend } = useVeloVenteCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      nomUtilisateur: "",
      email: "",
      motDePasse: ""
    
    },
  });

async function onSubmit(values: z.infer<typeof SignupValidation>) {
 
  setLoading(true);
  setError("");
  try {
    const response = await axios.post(
      "http://localhost:4000/client/register",
      {
        nomUtilisateur:values.nomUtilisateur,
        email: values.email,
        motDePasse: values.motDePasse,
      },
      { withCredentials: true }
    );

    setUser(response.data.data);
    
    syncCartWithBackend();
  
    navigate("/");
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
      <h2 className="text-lg md:h2-bold sm:pt-1">Créer un nouveau compte</h2>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full mt-3 gap-2"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            {...form.register("nomUtilisateur")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.nomUtilisateur && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.nomUtilisateur.message}
            </p>
          )}
        </div>

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
            {...form.register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            {...form.register("motDePasse")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.motDePasse && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.motDePasse.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white  bg-customGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          
          {loading ? "Chargement..." : "Soumettre"}
        </button>

        <p className="text-small-regular text-center mt-2">
          Vous avez déjà un compte ?
          <Link
            to="/sign-in"
            className="text-primary-500 text-small-semibold ml-1 underline"

          >
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
