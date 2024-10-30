import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext([]);

const AuthProvider=({ children })=> {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

 const getLoggedIn=async()=> {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:4000/client/auth",
        {
          withCredentials: true
        }
      );
      setUser(loggedInRes.data.data);
    
    } catch (error) {
      console.error("Error fetching logged in status:", error);
    } finally {
      setLoading(false);
    }
  }

     const updateUser = async (updatedData) => {
       try {
         const response = await axios.put(
           "http://localhost:4000/client/profile",
           updatedData,
           {
             withCredentials: true,
           }
         );
         setUser(response.data.data); // Mise à jour de l'état local

        
       } catch (error) {
         console.error("Erreur de mise à jour :", error);
         alert("Erreur lors de la mise à jour des informations.");
       }
     };

      const updatemdp = async (updatedData) => {
        try {
          const response = await axios.put(
            "http://localhost:4000/client/profile/mdp",
            updatedData,
            {
              withCredentials: true,
            }
          );
          setUser(response.data.data); // Mise à jour de l'état local
          
        } catch (error) {
          console.error("Erreur de mise à jour :", error);
          alert("Erreur lors de la mise à jour des informations.");
        }
      };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user,setUser, loading,updateUser,updatemdp}}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
