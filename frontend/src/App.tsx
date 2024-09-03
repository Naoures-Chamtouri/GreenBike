import SigninForm from "./_auth/forms/SigninFrom";
import Home from "./_root/pages/Home";
import SignupForm from "./_auth/forms/SignupForm";
import "./globals.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/forms/AuthLayout";
import RootLayout from "./_root/RootLayout";
 import CatalogueVeloVente from "./_root/pages/CatalogueVeloVente";
 import CatalogueVeloLocation from "./_root/pages/CatalogueVeloLocation"
import PageVelo from "./_root/pages/PageVelo";

function App() {
  return (
    <main className="flex h-screen">
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
          <Route path="/velo-a-vendre/:ref" element={<PageVelo />} />
          <Route path="/velo-a-louer" element={<CatalogueVeloLocation />} />
          <Route path="/velo-a-louer/:ref" element={<PageVelo />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
