import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Velos from './pages/veloVentes/Velo';
import VeloForm from './pages/veloVentes/veloForm';
import VelosLocation from './pages/veloLocation/Velo';
import VeloProvider from './context/VeloContext';
import VeloLocationForm from './pages/veloLocation/veloLocationForm';
import Commandes from "./pages/veloVentes/Commande"
import PageVelo from './pages/veloVentes/PageVelo';
import PageVeloLocation from './pages/veloLocation/PageVeloLocation';
import Balade from './pages/UiElements/balades/Balade';
import BaladeForm from './pages/UiElements/balades/BaladeForm';
import PageBalade from './pages/UiElements/balades/PageBalade';
import PageParticipant from './pages/UiElements/balades/Participant';
import Locations from './pages/veloLocation/Location';

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
    <DefaultLayout>
      <VeloProvider>
        <Routes>
          <Route
            index
            path="/VenteVelos/Velos"
            element={
              <>
                <Velos />
              </>
            }
          />
          <Route
            path="/VenteVelos/Velos/ajouter"
            element={
              <>
                <VeloForm />
              </>
            }
          />
          <Route
            path="/VenteVelos/Velos/:id"
            element={
              <>
                <PageVelo />
              </>
            }
          />
          <Route
            path="/VenteVelos/Commandes"
            element={
              <>
                <Commandes />
              </>
            }
          />
          <Route
            path="/LocationVelos/Velos"
            element={
              <>
                <VelosLocation />
              </>
            }
          />
          <Route
            path="/LocationVelos/Velos/:id"
            element={
              <>
                <PageVeloLocation />
              </>
            }
          />
          <Route
            path="/LocationVelos/Locations"
            element={
              <>
                <Locations />
              </>
            }
          />
          <Route
            path="/LocationVelos/Velos/ajouter"
            element={
              <>
                <VeloLocationForm />
              </>
            }
          />

          <Route
            path="/ReservationBalades/Balades"
            element={
              <>
                <Balade />
              </>
            }
          />
          <Route
            path="/ReservationBalades/Balades/ajouter"
            element={
              <>
                <BaladeForm />
              </>
            }
          />
          <Route
            path="/ReservationBalades/Balades/:id"
            element={
              <>
                <PageBalade />
              </>
            }
          />
          <Route
            path="/ReservationBalades/Balades/participants/:id"
            element={
              <>
                <PageParticipant />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
        </Routes>
      </VeloProvider>
    </DefaultLayout>
  );
}

export default App;
