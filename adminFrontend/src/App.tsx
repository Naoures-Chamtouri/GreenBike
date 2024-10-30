import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';

import SigninForm from './pages/Authentication/SigninForm';
import SignupForm from './pages/Authentication/SignupForm';
import VeloProvider from './context/VeloContext';
import Velos from './pages/veloVentes/Velo';
import VeloForm from './pages/veloVentes/veloForm';
import VelosLocation from './pages/veloLocation/Velo';
import Commandes from './pages/veloVentes/Commande';
import PageVelo from './pages/veloVentes/PageVelo';
import PageVeloLocation from './pages/veloLocation/PageVeloLocation';
import Locations from './pages/veloLocation/Location';
import VeloLocationForm from './pages/veloLocation/veloLocationForm';
import Balade from './pages/UiElements/balades/Balade';
import BaladeForm from './pages/UiElements/balades/BaladeForm';
import PageBalade from './pages/UiElements/balades/PageBalade';
import PageParticipant from './pages/UiElements/balades/Participant';
import AuthProvider from './context/AuthContext';
import Logout from './pages/Authentication/Logout';
import ProtectedRoute from './pages/Authentication/ProtectedRoutes';
import PageCommande from './pages/veloVentes/PageCommande';
import ProfitChart from './components/Dashbord/ProfitChart';
import Profile from './pages/Profile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <VeloProvider>
        <Routes>
          {/* Auth Routes without layout */}
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/log-out" element={<Logout />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashbord" replace />} />
            <Route path="/" element={<DefaultLayoutWrapper />}>
              <Route path="/VenteVelos/Velos" element={<Velos />} />
              <Route path="/VenteVelos/Velos/ajouter" element={<VeloForm />} />
              <Route path="/VenteVelos/Velos/:id" element={<PageVelo />} />
              <Route path="/VenteVelos/Commandes" element={<Commandes />} />
              <Route
                path="/VenteVelos/Commandes/:idCommande"
                element={<PageCommande />}
              />

              <Route path="/LocationVelos/Velos" element={<VelosLocation />} />
              <Route
                path="/LocationVelos/Velos/:id"
                element={<PageVeloLocation />}
              />
              <Route path="/LocationVelos/Locations" element={<Locations />} />
              <Route
                path="/LocationVelos/Velos/ajouter"
                element={<VeloLocationForm />}
              />
              <Route path="/ReservationBalades/Balades" element={<Balade />} />
              <Route
                path="/ReservationBalades/Balades/ajouter"
                element={<BaladeForm />}
              />
              <Route
                path="/ReservationBalades/Balades/:id"
                element={<PageBalade />}
              />
              <Route
                path="/ReservationBalades/Balades/participants/:id"
                element={<PageParticipant />}
              />
              <Route index path="/dashbord" element={<ProfitChart />} />
              <Route index path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </VeloProvider>
    </AuthProvider>
  );
}

// Wrapper for DefaultLayout
const DefaultLayoutWrapper = () => {
  return (
    <DefaultLayout>
      <Routes>
        {/* All routes under DefaultLayout */}
        <Route path="/VenteVelos/Velos" element={<Velos />} />
        <Route path="/VenteVelos/Velos/ajouter" element={<VeloForm />} />
        <Route path="/VenteVelos/Velos/:id" element={<PageVelo />} />
        <Route path="/VenteVelos/Commandes" element={<Commandes />} />
        <Route path="/LocationVelos/Velos" element={<VelosLocation />} />
        <Route path="/LocationVelos/Velos/:id" element={<PageVeloLocation />} />
        <Route path="/LocationVelos/Locations" element={<Locations />} />
        <Route index path="/dashbord" element={<ProfitChart />} />
        <Route index path="/profile" element={<Profile />} />

        <Route
          path="/VenteVelos/Commandes/:idCommande"
          element={<PageCommande />}
        />
        <Route
          path="/LocationVelos/Velos/ajouter"
          element={<VeloLocationForm />}
        />
        <Route path="/ReservationBalades/Balades" element={<Balade />} />
        <Route
          path="/ReservationBalades/Balades/ajouter"
          element={<BaladeForm />}
        />
        <Route
          path="/ReservationBalades/Balades/:id"
          element={<PageBalade />}
        />
        <Route
          path="/ReservationBalades/Balades/participants/:id"
          element={<PageParticipant />}
        />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
