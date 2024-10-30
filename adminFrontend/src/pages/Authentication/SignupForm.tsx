import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SignupValidation = z.object({
  nomUtilisateur: z.string().min(2).max(50),
  email: z.string().email(),
  motDePasse: z
    .string()
    .min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
});

function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth(); 

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      nomUtilisateur: '',
      email: '',
      motDePasse: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:4000/admin/register',
        {
          nomUtilisateur: values.nomUtilisateur,
          email: values.email,
          motDePasse: values.motDePasse,
        },
        { withCredentials: true },
      );

      console.log(response.data.data);
      setUser(response.data.data);
      navigate('/');
    } catch (error) {
      setError("Échec de l'inscription. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img src="/assets/images/logo.png" alt="logo" className="h-16 mb-6" />
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Créer un nouveau compte Admin
          </h2>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              {...form.register('nomUtilisateur')}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Votre nom d'utilisateur"
            />
            {form.formState.errors.nomUtilisateur && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.nomUtilisateur.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register('email')}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Votre email"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de Passe
            </label>
            <input
              id="password"
              type="password"
              {...form.register('motDePasse')}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Votre mot de passe"
            />
            {form.formState.errors.motDePasse && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.motDePasse.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            {loading ? 'Chargement...' : 'Soumettre'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Vous avez déjà un compte ?
              <Link
                to="/sign-in"
                className="text-green-600 font-medium ml-1 underline hover:text-green-700"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
