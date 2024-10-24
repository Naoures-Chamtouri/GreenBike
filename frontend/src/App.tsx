import SigninForm from "./_auth/forms/SigninFrom";
import Home from "./_root/pages/Home";
import SignupForm from "./_auth/forms/SignupForm";
import "./globals.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/forms/AuthLayout";
import RootLayout from "./_root/RootLayout";
 import CatalogueVeloVente from "./_root/pages/CatalogueVeloVente";
 import CatalogueVeloLocation from "./_root/pages/CatalogueVeloLocation"
 import CatalogueBalade from "./_root/pages/CatalogueBalade";
import PageVeloVente from "./_root/pages/PageVeloVente";
import PageVeloLocation from "./_root/pages/PageVeloLocation";
import PageBalade from "./_root/pages/PageBalade";
import VeloVenteProvider from "./context/VeloVenteCartContext";
import FilterVenteProvider from "./context/FiltersVenteContext"
import AuthProvider from "./context/AuthContext";
import PageCommande from "./_root/pages/PageCommande";
import FilterLocationProvider from "./context/FiltersLocationContext";
import PageLocation from "./_root/pages/PageLocation";
import FilterBaladeProvider from "./context/FiltersBaladeContext";
import MesCommandes from "./_root/pages/MesCommandes";
import MesLocations from "./_root/pages/MesLocations";
import MesReservations from "./_root/pages/MesReservations";
import ProtectedRoute from "./_auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <FilterVenteProvider>
        <FilterLocationProvider>
          <FilterBaladeProvider>
            <VeloVenteProvider>
              <main className="flex h-screen ">
                <Routes>
                  {/* public routes */}
                  <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/sign-up" element={<SignupForm />} />
                  </Route>

                  <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    //index mean the starting page
                    <Route
                      path="/velo-a-vendre"
                      element={<CatalogueVeloVente />}
                    />
                    <Route
                      path="/velo-a-vendre/:ref"
                      element={<PageVeloVente />}
                    />
                    <Route
                      path="/velo-a-louer"
                      element={<CatalogueVeloLocation />}
                    />
                    <Route
                      path="/velo-a-louer/:ref"
                      element={<PageVeloLocation />}
                    />
                    <Route path="/balades" element={<CatalogueBalade />} />
                    <Route path="/balades/:ref" element={<PageBalade />} />
                    {/* private routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/commande" element={<PageCommande />} />
                      <Route path="/location" element={<PageLocation />} />
                      <Route path="/mes-commandes" element={<MesCommandes />} />
                      <Route path="/mes-locations" element={<MesLocations />} />
                      <Route
                        path="mes-reservations"
                        element={<MesReservations />}
                      />
                    </Route>
                  </Route>
                </Routes>
              </main>
            </VeloVenteProvider>
          </FilterBaladeProvider>
        </FilterLocationProvider>
      </FilterVenteProvider>
    </AuthProvider>
  );
}

export default App;
