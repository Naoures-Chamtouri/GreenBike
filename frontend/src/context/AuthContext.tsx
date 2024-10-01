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

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user,setUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;


export const useAuth = () => {
  return useContext(AuthContext);
};
