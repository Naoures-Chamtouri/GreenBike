import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; 

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();


   return user ? (
     <Outlet />
   ) : (
     <Navigate to="/sign-in" state={{ from: location }} replace />
   );
};

export default ProtectedRoute;
