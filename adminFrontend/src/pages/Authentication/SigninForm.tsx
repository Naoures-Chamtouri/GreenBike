import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SigninValidation = z.object({
  email: z.string().email('Adresse email invalide'),
  motDePasse: z
    .string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
});

function SigninForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth(); 

  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      motDePasse: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: any) {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:4000/admin/login',
        {
          email: values.email,
          motDePasse: values.motDePasse,
        },
        { withCredentials: true },
      );

     
      setUser(response.data.data)
      navigate('/');
    } catch (error) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
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
            Connection Admin
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register('email')}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Votre email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
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
              {...register('motDePasse')}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Votre mot de passe"
            />
            {errors.motDePasse && (
              <p className="text-red-500 text-sm mt-1">
                {errors.motDePasse.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Pas de compte ?
              <Link
                to="/sign-up"
                className="text-green-600 font-medium ml-1 underline hover:text-green-700"
              >
                Créez un compte
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
