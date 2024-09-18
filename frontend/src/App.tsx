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

function App() {
  return (
    <FilterVenteProvider>
      <VeloVenteProvider>
        <main className="flex h-screen ">
          <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm />} />
              <Route path="/sign-up" element={<SignupForm />} />
            </Route>
            {/* private routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              //index mean the starting page
              <Route path="/velo-a-vendre" element={<CatalogueVeloVente />} />
              <Route path="/velo-a-vendre/:ref" element={<PageVeloVente />} />
              <Route path="/velo-a-louer" element={<CatalogueVeloLocation />} />
              <Route path="/velo-a-louer/:ref" element={<PageVeloLocation />} />
              <Route path="/balades" element={<CatalogueBalade />} />
              <Route path="/balades/:ref" element={<PageBalade />} />
            </Route>
          </Routes>
        </main>
      </VeloVenteProvider>
    </FilterVenteProvider>
  );
}

export default App;
